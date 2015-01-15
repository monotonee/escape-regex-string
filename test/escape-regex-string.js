var dependencies = {
  assert: require('assert'),
  escapeRegexString: require('../index'),
};

describe('escape-regex-string', function() {
  
  it('should escape regular expression tokens within a string literal', function() {
    dependencies.assert.strictEqual(
      dependencies.escapeRegexString('- | \\ { } ( ) [ ] ^ $ + * ? .'), 
      '\\- \\| \\\\ \\{ \\} \\( \\) \\[ \\] \\^ \\$ \\+ \\* \\? \\.'
    );
    dependencies.assert.strictEqual(
      dependencies.escapeRegexString('(Phobetron pithecium)'), 
      '\\(Phobetron pithecium\\)'
    );
  });
  
  it('should use optional RegExp argument when passed instead of default', function() {
    // Remove the hyphen character from the regex pattern.
    dependencies.assert.strictEqual(
      dependencies.escapeRegexString('- | \\ { } ( ) [ ] ^ $ + * ? .', /[|\\{}()[\]^$+*?.]/g), 
      '- \\| \\\\ \\{ \\} \\( \\) \\[ \\] \\^ \\$ \\+ \\* \\? \\.'
    );
  });
  
  it('should not accept invalid arguments', function() {
    /**
     * Define locally-scoped function to catch TypeError exceptions in the following tests.
     * @param exceptionObject Object constructed by Error or a descendant.
     * @return undefined
     */
    function rethrowExceptionIfNotTypeError(exceptionObject) {
      // Depending on short-circuit evaluation in condition.
      if (Object.prototype.toString.call(exceptionObject) !== '[object Error]'
        || exceptionObject instanceof TypeError === false
      ) {
        throw exceptionObject;
      }
    }
    
    // Attempt to pass invalid first argument.
    try {
      dependencies.escapeRegexString(42);
      throw new Error('Invalid first (string) argument passed but no exception thrown.');
    }
    catch (exceptionObject) {
      rethrowExceptionIfNotTypeError(exceptionObject);
    }
    // Attempt to pass invalid second argument.
    try {
      dependencies.escapeRegexString('dik-dik', 42);
      throw new Error('Invalid second (RegExp) argument passed but no exception thrown.');
    }
    catch (exceptionObject) {
      rethrowExceptionIfNotTypeError(exceptionObject);
    }
  });
  
  describe('.defaultEscapeCharsRegex', function() {
    
    it('should be a non-configurable property', function() {
      dependencies.escapeRegexString.defaultEscapeCharsRegex = 3.14;
      dependencies.assert.notStrictEqual(
        dependencies.escapeRegexString.defaultEscapeCharsRegex,
        3.14
      );
    });
    
    it('should contain a readable RegExp object', function() {
      dependencies.assert.strictEqual(
        Object.prototype.toString.call(dependencies.escapeRegexString.defaultEscapeCharsRegex),
        '[object RegExp]'
      );
    });
    
  });
  
});
