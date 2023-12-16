# Simple image processing

The goal of this small application is to process \*.png images into black-base with transparent background.
The main usage idea: convert simple images (drawn or generated with AI model) to format that is easy for vectoring.
E.g. Prepare png icons for vectoring with online tool.

## Installation

Run `npm install` to install all dependencies

## Usage

To build the application, you can use the following command:

```sh
  npm run build
```

After installation and building, you can use the CLI application with the following command:

```sh
  node dist/src/index.js [flags and parameters]
```

Enjoy your black-transparent \*.png-s

## Flags and Parameters

- `--input`: specify input folder with png files
- `--output`: Specify output folder
- `--threshold`: this value will be subtracted from each color of RGB
