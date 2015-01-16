/**
 * @file Exports a simple function that will escape a string literal for use as an
 * argument in the standard JS RegExp object constructor.
 * @module escape-regex-string
 * @author monotonee <monotonee@users.noreply.github.com>
 * @version 0.0.0
 * @license MIT
 */

'use strict';

var defaultEscapeCharsRegex =  /[\-|\\{}()\[\]\^$+*?.]/g;

/**
 * Escapes a string literal for use as an argument in the standard JS RegExp object constructor
 * @alias module:escape-regex-string
 * @param {string} patternString The string containing a regex pattern that needs to be escaped.
 * @param {RegExp} [escapeCharsRegex] An optional RegEx pattern containing a set of characters
 * to escape. If not passed, value will be set to default.
 * @return {string} The escaped regex pattern string.
 * @see {@link https://github.com/jscs-dev/node-jscs/issues/778}
 */
function escapeRegexString(unescapedString, escapeCharsRegex) {
  // Validate arguments.
  if (Object.prototype.toString.call(unescapedString) !== '[object String]') {
    throw new TypeError('Argument 1 should be a string.');
  }
  if (escapeCharsRegex === undefined) {
    escapeCharsRegex = defaultEscapeCharsRegex;
  } else if (Object.prototype.toString.call(escapeCharsRegex) !== '[object RegExp]') {
    throw new TypeError('Argument 2 should be a RegExp object.');
  }

  // Escape the string.
  return unescapedString.replace(escapeCharsRegex, '\\$&');
}

/**
 * @name escapeRegexString.defaultEscapeCharsRegex
 * A read-only property that contains the default escape character RegExp instance.
 * The value of this property is the value used when the optional second argument
 * is omitted in a call to {@link module:escape-regex-string}.
 * @readonly
 * @static
 */
Object.defineProperty(
  escapeRegexString,
  'defaultEscapeCharsRegex',
  {
    configurable: false,
    enumerable: true,
    value: defaultEscapeCharsRegex,
    writable: false
  }
);

module.exports = escapeRegexString;
