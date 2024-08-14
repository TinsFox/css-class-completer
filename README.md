# CSS Class Completer

CSS Class Completer is a Visual Studio Code extension that provides autocompletion for CSS class names in HTML, JSX, and TSX files. It scans your project's CSS and LESS files to offer intelligent suggestions as you type.

![CSS Class Completer](./css-class-completer.gif)

## Features

- Autocomplete CSS class names in HTML, JSX, and TSX files
- Scan CSS and LESS files in your project
- Real-time updates when style files change
- Intelligent suggestions based on your project's styles

## Installation

1. Open Visual Studio Code
2. Go to the Extensions view (Ctrl+Shift+X or Cmd+Shift+X on Mac)
3. Search for "CSS Class Completer"
4. Click Install

## Usage

Once installed, the extension will automatically start scanning your style files and provide autocompletion for CSS class names. Just start typing a class name in your HTML, JSX, or TSX file, and you'll see suggestions appear.

## Configuration

You can configure the extension in your VS Code settings:

- `cssClassCompleter.enableGlobalScan`: Enable or disable global scanning of all style files in the workspace (default: true)
- `cssClassCompleter.scanPaths`: Specify paths to scan for style files when global scan is disabled (default: [])

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
