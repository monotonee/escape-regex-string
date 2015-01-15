var dependencies = {
  assert: require('assert'),
  escapeRegexString: require('../index'),
};

describe('escape-regex-string', function() {
  
  it('should escape regular expression tokens within a string literal'), function() {
    dependencies.assert.strictEqual(
      escapeRegexString('- | \\ { } ( ) [ ] ^ $ + * ? .'), 
      '\\- \\| \\\ \\{ \\} \\( \\) \\[ \\] \\^ \\$ \\+ \\* \\? \\.'
    );
    dependencies.assert.strictEqual(
      escapeRegexString('(Phobetron pithecium)'), 
      '\\(Phobetron pithecium\\)'
    );
  });
  
  it('should use optional RegExp argument when passed instead of default'), function() {
    // Remove the hyphen character from the regex pattern.
    dependencies.assert.strictEqual(
      escapeRegexString('- | \\ { } ( ) [ ] ^ $ + * ? .', /[|\\{}()[\]^$+*?.]/g), 
      '- \\| \\\ \\{ \\} \\( \\) \\[ \\] \\^ \\$ \\+ \\* \\? \\.'
    );
  });
  
  it('should not accept invalid arguments'), function() {
    try {
      escapeRegexString(42);
      throw new Error('Invalid first (string) argument passed but no exception thrown.');
    }
    catch (exceptionObject) {}
    try {
      escapeRegexString('dik-dik', 42);
      throw new Error('Invalid second (RegExp) argument passed but no exception thrown.');
    }
    catch (exceptionObject) {}
  });
  
  describe('#defaultEscapeCharsRegex' function() {
    
    it('should be a non-configurable property'), function() {
      try {
        escapeRegexString.defaultEscapeCharsRegex = 3.14;
        throw new Error('Property value was changed during runtime.');
      }
      catch (exceptionObject) {}
    });
    
    it('should contain a readable RegExp object'), function() {
      dependencies.assert.strictEqual(
        Object.prototype.toString.call(escapeRegexString.defaultEscapeCharsRegex),
        '[object RegExp]'
      );
    });
    
  });
  
});
