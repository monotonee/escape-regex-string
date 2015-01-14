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

var dependencies = {
  is: require('is')
};

var defaultEscapeCharsRegex =  /[-|\\{}()[\]^$+*?.]/g;

/**
 * @param patternString The string containing a regex pattern that needs to be escaped.
 * @param charactersToEscapeRegexPattern An optional RegEx pattern containing a set 
 *   of characters to escape. If not passed, will be set to default.
 * @return string The escaped regex pattern string.
 */
var escapeRegexString = function(unescapedString, escapeCharsRegex) {
  // Validate unescaped pattern string.
  var unescapedStringType = (typeof unescapedString).toLowerCase();
  if (unescapedStringType !== 'string') {
    throw new TypeError('Argument 1: expected string. Received ' + unescapedStringType);
  }
  
  // Validate optional RegEx object. This tequnique is debatable.
  var escapeCharsRegexTypeescapeCharsRegexType = (typeof escapeCharsRegex).toLowerCase();
  if (escapeCharsRegexType === 'undefined' || escapeCharsRegex === null) {
    escapeCharsRegex = defaultEscapeCharsRegex;
  }
  else if (escapeCharsRegex.constructor.name !== 'RegExp') {
    throw new TypeError('Argument 2: expected RegEx object . Received ' + escapeCharsRegexType);
  }
  
}
