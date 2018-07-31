# Validate Git Commit Msg

[![CircleCI](https://circleci.com/gh/Joaquin6/validate-git-commit-msg/tree/master.svg?style=svg)](https://circleci.com/gh/Joaquin6/validate-git-commit-msg/tree/master)
[![NPM version][npm-image]][npm-url]
[![Downloads][download-badge]][npm-url]

> Validate commit messages according to various presets

<p align="center">
  <img src="./example.gif">
</p>

## Install

```sh
npm install validate-commit --save-dev
```

## Features

Even though there are a couple of other packages that do this, this one has a few quality of life changes.

- **Lets you decide how to validate** the commit messages (see [here](#usage))
- It validate commit files coming from both strings and files
- Supports the following **presets**:
  + [angular](./conventions/angular.md)
  + [atom](./conventions/atom.md)
  + [eslint](./conventions/eslint.md)
  + [ember](./conventions/ember.md)
  + [jquery](./conventions/jquery.md)
  + [jshint](./conventions/jshint.md)
- Supports **ignore patterns**
- Uses [chalk][chalk-url] module to color messages
- Logging can be muted via **SILENT** environment variable

## Usage

### With Husky

E.g., using [Husky][husky-url].

```json
"scripts": {
  "commitmsg": "validate-commit-msg"
}
```

### From CLI

```bash
$ validate-commit-msg 'chore(package): some message'
$ validate-commit-msg -p eslint 'New: Awesome feature'
$ validate-commit-msg -p ember '[DOC beta] Update CONTRIBUTING.md'
$ validate-commit-msg -p jshint '[[DOCS]] Awesome JS docs'
$ ...
```

When a wrong commit message is given it outputs an explaination.

```bash
$ validate-commit-msg 'unknown(something): wrong'
# 'unknown' is not an allowed type!
# Valid types are: feat, fix, docs, style, refactor, perf, test, chore, revert
```

However you can mute it:

```bash
$ validate-commit-msg -s 'unknown(something): wrong'
```


Validate a commit with .git directory in another location

```bash
$ validate-commit-msg --mf ../../some/.git/module/COMMIT_EDITMSG
```


### Within node

```javascript
var validateCommit = require('validate-commit').validateMessage;
validateCommit('chore(package): some message'); // > true
validateCommit('New: Awesome', { preset: 'eslint' }); // > true
validateCommit('Unk: Awesome', { preset: 'eslint' }); // > false
// > The word "Unk" is not an allowed tag.
// > Valid types are: Fix, Update, Breaking, Docs, Build, New, Upgrade.
process.env.SILENT = true;
validateCommit('Unk: Awesome', { preset: 'eslint' }); // > false
```


## API

### JavaScript

```
validateMessage(message: string, ?options: object)
```

```
validateMessageFromFile(file: string, ?options: object)
```

### CLI

This module, like many others, installs an executable in **./node_modules/.bin**.

```bash
~./node_modules/.bin$ ./validate-commit-msg
```

```
  Usage: validate-commit-msg [options] [command]


  Commands:

    validate-commit-msg <message>  validate a message
    help [cmd]                     display help for [cmd]

  Validate commit messages according to various presets

  Options:

    -h, --help             output usage information
    -V, --version          output the version number
    -p, --preset <preset>  specify a preset (angular|atom|eslint|ember|jquery|jshint) [angular]
    -s, --silent           mute log messages [false]
    --mf --msgfile         relative path to COMMIT_EDITMSG file
```

### Development

`npm i`

## License

Apache-2.0 © [Joaquin Briceno](http://github.com/joaquin6)

[npm-url]: https://npmjs.org/package/validate-commit
[npm-image]: https://img.shields.io/npm/v/validate-commit.svg?style=flat-square

[download-badge]: http://img.shields.io/npm/dm/validate-commit.svg?style=flat-square

[chalk-url]: https://www.npmjs.com/package/chalk
[husky-url]: https://www.npmjs.com/package/husky
