/**
 * @file Exports a simple function that will escape a string literal for use as
 * an argument in the standard JS RegExp constructor.
 * @module escape-regex-string
 * @author monotonee <monotonee@tuta.io>
 * @license MIT
 */

'use strict';

var defaultEscapeCharsRegex =  /[-|\\{}()[\]^$+*?.]/g;

/**
 * Escapes a string literal for use as an argument in the standard RegExp constructor.
 * @alias module:escape-regex-string
 * @param {string} patternString The string containing a regex pattern to be escaped.
 * @param {RegExp} [escapeCharsRegex] An optional RegEx pattern containing a set
 * of characters to escape. If not passed, value will be set to default.
 * @return {string} The escaped regex pattern string.
 * @throws {TypeError} Arguments must be correct type.
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
 * is omitted in a call to {@link module:escape-regex-string}. JSDoc fails to
 * parse this properly due to the use of Object.defineProperty.
 * @readonly
 * @static
 * @type {RegExp}
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
