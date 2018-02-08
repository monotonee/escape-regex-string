# escape-regex-string [![Build Status](https://travis-ci.org/monotonee/escape-regex-string.svg?branch=master)](https://travis-ci.org/monotonee/escape-regex-string) [![npm version](https://badge.fury.io/js/escape-regex-string.svg)](https://www.npmjs.com/package/escape-regex-string)

Escapes a string literal for use as an argument in the standard RegExp constructor.

## Interface

#### escape-regex-string

```javascript
(require('escape-regex-string'))(unescapedString[, escapeCharsRegex])
```
* unescapedString [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)
  * The regular expression pattern string in which all special characters need to be escaped.
* escapeCharsRegex [RegExp](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp)
  * Defaults to value of member escape-regex-string.defaultEscapeCharsRegex (see below)

Returns the passed unescapedString with all RegExp special characters escaped.

#### escape-regex-string.defaultEscapeCharsRegex

```javascript
(require('escape-regex-string')).defaultEscapeCharsRegex
```
A read-only RegExp instance containing the default pattern used to escape passed strings. If a RegExp instance is
manually passed into a function call to this module, the passed RegExp value will be used instead of this default value.

## Example Usage
```javascript
let escapeRegexString = require('escape-regex-string');
let regexPatternString = '$&*()awsd';
let escapedRegexPatternString = escapeRegexString(regexPatternString);
console.log(escapedRegexPatternString); // '\\$&\\*\\(\\)awsd'
let regExpObject = new RegExp(escapedRegexPatternString);
console.log(regExpObject); // /\$&\*\(\)awsd/
```

## Explanation
The built-in JavaScript [RegExp](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp)
object's constructor accepts a regular expression pattern in the form of another RegExp instance **or a string.** And,
as we know, the JavaScript regular expression syntax includes a set of characters with special meaning when interpreted
by the regex engine, such as the caret (^) and the asterisk (*). A problem is introduced when one attempts to create a
regular expression pattern in a *string* (*not* a
[RegExp literal](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp#Description)),
for use in the RegExp constructor, that contains special regular expression characters *to be matched literally.*
Consider the following extra-verbose example:

A developer wants to use a RegExp to match caret characters in a given string:
```javascript
let inputStr = 'a^2';
```
For whatever reason, the dev is unwilling or unable to use the RegExp literal syntax and therefore attempts to define a
regular expression pattern *in a string* to be passed to the RegExp constructor:
```javascript
let firstPattern = '^';
let firstRegExp = new RegExp(firstPattern);
```
When the expression is evaluated, the results are incorrect because the caret is a regular expression special character
representing the [beginning of the input](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions#special-caret).
The beginning of the subject string will therefore be the only match:
```javascript
let firstResult = firstRegExp.exec(inputStr);
console.log(firstResult); // [ '', index: 0, input: 'a^2' ]
```
The developer realizes he needs to escape the special caret character and therefore redefines his pattern with the
standard backslash escape character:
```javascript
let secondPattern = '\^';
let secondRegExp = new RegExp(secondPattern);
let secondResult = secondRegExp.exec(inputStr);
console.log(secondResult); // [ '', index: 0, input: 'a^2' ]
```
When the developer evaluates the second expression, however, the results are the same. This is because JavaScript *will
first evaluate the backslash escape character in the pattern string,* before it ever reaches the RegExp constructor.
When the developer eexamines the second pattern string, it is identical to the first despite the added backslash.
```javascript
console.log(firstPattern === secondPattern); // true
```
Finally, the developer adds a second backslash to the pattern string, causing the JavaScript interpreter to preserve a
single backslash character in the string stored in memory. This single backslash is successfully passed to the RegExp
constructor, the expression therefore interprets the caret character literally, and the caret is correctly matched
inside the input string:
```javascript
let finalPattern = '\\^';
let finalRegExp = new RegExp(finalPattern);
let finalResult = finalRegExp.exec(inputStr);
console.log(finalResult); // [ '^', index: 1, input: 'a^2' ]
```
This is essentially a simple case of double-escaping. This module simply saves developers the trouble of determining the
set of JavaScript's regular expression special characters and writing a function to escape them.

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

I wrote this miniature module to practice with a few of the tools, libraries, and workflows available to JS developers.
I welcome constructive criticism and advice.
