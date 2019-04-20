# vscode-json README

[![Build Status](https://travis-ci.org/adharmawan/vscode-json.svg?branch=master)](https://travis-ci.org/adharmawan/vscode-json)
[![downloads](https://img.shields.io/vscode-marketplace/d/andyyaldoo.vscode-json.svg)](https://marketplace.visualstudio.com/items?itemName=andyyaldoo.vscode-json)
![Visual Studio Marketplace](https://img.shields.io/vscode-marketplace/r/andyyaldoo.vscode-json.svg)
[![Known Vulnerabilities](https://snyk.io/test/github/andyyaldoo/vscode-json/badge.svg?targetFile=package.json)](https://snyk.io/test/github/andyyaldoo/vscode-json?targetFile=package.json)

This vscode extension beautify/uglify/escape/unescape JSON.

## Features

There are plenty of existing JSON prettifier/beautifier extensions but for some reason, Escape/Unescape JSON features are not included. I made yet another JSON tools because I use the escape/unescape feature a lot.

## Install

- Install via vscode extensions marketplace

or

- Download .vsix [here](https://github.com/andyyaldoo/vscode-json/releases)

## Usage

- Validate: `cmd+alt+v`
- Beautify: `cmd+alt+b`
- Uglify: `cmd+alt+u`
- Escape: `cmd+alt+'`
- Unescape: `cmd+alt+;`

![Demo GIF](https://raw.githubusercontent.com/andyyaldoo/vscode-json/master/images/vscode-json.gif)

## Requirements

None

## Known Issues

So far none

## Release Notes

### 1.0.0

Initial release of vscode-json. Covers the 4 basic functionalities (Beautify/Uglify/Escape/Unescape)

### 1.2.0

Improve Unescape functionality. JSON string does not have to be wrapped in quotes.

### 1.3.0

Improve funcitonality. trim trailing and leading spaces before process text. Minor refactoring.

### 1.4.0

Format Selected text

![Demo GIF](https://raw.githubusercontent.com/andyyaldoo/vscode-json/master/images/format-selected-text.gif)

---
