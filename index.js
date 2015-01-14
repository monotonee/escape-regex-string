/**
 * @file
 * Defines and exports a simple function that will escape a string literal for use
 * as an argument in the standard JS RegExp object constructor function.
 * 
 * @note
 * These documentation blocks can be parsed by the "Doxygen" documentation generator.
 * @see http://stack.nl/~dmitri/doxygen
 */

'use strict'

var defaultEscapeCharsRegex =  /[-|\\{}()[\]^$+*?.]/g;

/**
 * @param patternString The string containing a regex pattern that needs to be escaped.
 * @param charactersToEscapeRegexPattern An optional RegEx pattern containing a set 
 *   of characters to escape. If not passed, will be set to default.
 * @return string The escaped regex pattern string.
 */
var escapeRegexString = function(unescapedString, escapeCharsRegex) {
  // Validate arguments.
  if (Object.prototype.toString.call(unescapedString) !== '[object String]') {
    throw new TypeError('Argument 1 should be a string.');
  }
  if (escapeCharsRegex === undefined) {
    escapeCharsRegex = defaultEscapeCharsRegex;
  }
  else if (Object.prototype.toString.call(escapeCharsRegex) !== '[object RegExp]') {
    throw new TypeError('Argument 2 should be a RegExp object.');
  }
  
  // Escape the string.
  return unescapedString.replace(escapeCharsRegex, '\\$&');
}

