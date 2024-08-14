import * as vscode from "vscode"
import * as fs from "fs"
import * as path from "path"
import * as glob from "glob"

let classNames: Map<string, { content: string; source: string }> = new Map()

export function activate(context: vscode.ExtensionContext) {
  console.log("CSS Class Name Completer is now active")

  const config = vscode.workspace.getConfiguration("cssClassCompleter")
  const enableGlobalScan = config.get("enableGlobalScan", true)
  const scanPaths = config.get("scanPaths", []) as string[]

  function getStyleFiles(): Thenable<vscode.Uri[]> {
    if (enableGlobalScan) {
      return vscode.workspace.findFiles("**/*.{css,less,scss}")
    } else {
      return new Promise((resolve) => {
        const files: vscode.Uri[] = []
        scanPaths.forEach((scanPath) => {
          const workspaceFolder = vscode.workspace.workspaceFolders?.[0]
          if (workspaceFolder) {
            const fullPath = path.join(workspaceFolder.uri.fsPath, scanPath)
            glob.sync(`${fullPath}/**/*.{css,less,scss}`).forEach((file) => {
              files.push(vscode.Uri.file(file))
            })
          }
        })
        resolve(files)
      })
    }
  }

  function parseStyleFile(filePath: string) {
    try {
      console.log(`Parsing file: ${filePath}`)
      const content = fs.readFileSync(filePath, "utf-8")
      const regex = /\.([a-zA-Z][a-zA-Z0-9_-]*)\s*\{([^}]*)\}/g
      let match
      while ((match = regex.exec(content)) !== null) {
        const className = match[1]
        const cssContent = match[2].trim()
        const source = path.basename(filePath)
        classNames.set(className, { content: cssContent, source: source })
      }
      console.log(`Total unique class names: ${classNames.size}`)
    } catch (error) {
      console.error(`Error parsing file ${filePath}: ${error}`)
    }
  }

  const watcher = vscode.workspace.createFileSystemWatcher(
    enableGlobalScan
      ? "**/*.{css,less,scss}"
      : `{${scanPaths.join(",")}}/**/*.{css,less,scss}`
  )
  watcher.onDidChange((uri) => parseStyleFile(uri.fsPath))
  watcher.onDidCreate((uri) => parseStyleFile(uri.fsPath))
  watcher.onDidDelete(() => {
    classNames.clear()
    getStyleFiles().then((files) => {
      files.forEach((file) => parseStyleFile(file.fsPath))
    })
  })
  context.subscriptions.push(watcher)

  getStyleFiles().then((files) => {
    console.log(`Initial scan: Found ${files.length} style files.`)
    files.forEach((file) => parseStyleFile(file.fsPath))
  })

  const provider = vscode.languages.registerCompletionItemProvider(
    ["html", "javascriptreact", "typescriptreact"],
    {
      provideCompletionItems(
        document: vscode.TextDocument,
        position: vscode.Position
      ) {
        const linePrefix = document
          .lineAt(position)
          .text.substr(0, position.character)
        if (!linePrefix.match(/class(Name)?=["'][^"']*$/)) {
          return undefined
        }

        return Array.from(classNames.entries()).map(
          ([className, { content, source }]) => {
            const item = new vscode.CompletionItem(
              className,
              vscode.CompletionItemKind.Value
            )
            item.detail = `${content} (from ${source})`
            item.documentation = new vscode.MarkdownString(
              `Source: ${source}\n\n\`\`\`css\n.${className} {\n  ${content}\n}\n\`\`\``
            )
            return item
          }
        )
      },
    }
  )

  context.subscriptions.push(provider)
}

export function deactivate() {}
