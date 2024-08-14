# CSS 类名自动补全

CSS 类名自动补全是一个 Visual Studio Code 扩展，为 HTML、JSX 和 TSX 文件提供 CSS 类名的自动补全功能。它会扫描您项目中的 CSS 和 LESS 文件，在您输入时提供智能建议。

![CSS Class Completer](./css-class-completer.gif)

## 功能特性

- 在 HTML、JSX 和 TSX 文件中自动补全 CSS 类名
- 扫描项目中的 CSS 和 LESS 文件
- 样式文件更改时实时更新
- 基于您项目样式的智能建议

## 安装

1. 打开 Visual Studio Code
2. 进入扩展视图（Windows/Linux 按 Ctrl+Shift+X，Mac 按 Cmd+Shift+X）
3. 搜索 "CSS Class Completer"
4. 点击安装

## 使用方法

安装后，扩展将自动开始扫描您的样式文件，并为 CSS 类名提供自动补全。只需在 HTML、JSX 或 TSX 文件中开始输入类名，您就会看到出现建议。

## 配置

您可以在 VS Code 设置中配置此扩展：

- `cssClassCompleter.enableGlobalScan`：启用或禁用工作区内所有样式文件的全局扫描（默认：true）
- `cssClassCompleter.scanPaths`：当禁用全局扫描时，指定要扫描样式文件的路径（默认：[]）

## 贡献

欢迎贡献！请随时提交 Pull Request。

## 许可证

本项目采用 MIT 许可证。详情请参阅 [LICENSE](LICENSE) 文件。

---

💡 如果您觉得这个项目有用,请给它一个星标 ⭐️
