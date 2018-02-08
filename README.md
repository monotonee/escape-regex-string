# escape-regex-string [![Build Status](https://travis-ci.org/monotonee/escape-regex-string.svg?branch=master)](https://travis-ci.org/monotonee/escape-regex-string) [![npm version](https://badge.fury.io/js/escape-regex-string.svg)](https://www.npmjs.com/package/escape-regex-string)
Escapes a string literal for use as an argument in the standard RegExp constructor.

## Interface

#### escape-regex-string
```javascript
(require('escape-regex-string'))(unescapedString[, escapeCharsRegex])
```
* unescapedString String
* escapeCharsRegex RegExp
  * Defaults to value of member escape-regex-string.defaultEscapeCharsRegex (see below)

Returns the passed unescapedString with all RegExp special characters escaped.

#### escape-regex-string.defaultEscapeCharsRegex
```javascript
(require('escape-regex-string')).defaultEscapeCharsRegex
```
A read-only RegExp instance containing the default pattern used to escape passed strings. If a RegExp instance is manually passed into a function call to this module, the passed RegExp value will be used instead of this default value.

## Example Usage
```javascript
var escapeRegexString = require('escape-regex-string');
var regexString = '$&*()awsd';
var escapedRegexString = escapeRegexString(regexString); // '\\$&\\*\\(\\)awsd'
var regExpObject = new RegExp(escapedRegexString);
console.log(regExpObject); // /\$&\*\(\)awsd/
```

## Development
To set up an optional development environment, a Vagrantfile is included. Install [Vagrant](https://www.vagrantup.com)
and run:
```sh
vagrant up
 ```
Once Vagrant has completed provisioning, `vagrant ssh` into the box and run the tests with:
```sh
make
```

## Feedback
I wrote this miniature module to practice with a few of the tools, libraries, and workflows available to JS developers. I welcome constructive criticism and advice.
