var dependencies = {
    assert: require('assert'),
    escapeRegexString: require('../index')
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
        // Remove the hyphen character from the default regex pattern.
        dependencies.assert.strictEqual(
            dependencies.escapeRegexString('- | \\ { } ( ) [ ] ^ $ + * ? .', /[|\\{}()[\]^$+*?.]/g),
            '- \\| \\\\ \\{ \\} \\( \\) \\[ \\] \\^ \\$ \\+ \\* \\? \\.'
        );
    });

    it('should not accept invalid arguments', function() {
        dependencies.assert.throws(dependencies.escapeRegexString.bind(42), TypeError);
        dependencies.assert.throws(dependencies.escapeRegexString.bind('VFA-103', 42), TypeError);
    });

    describe('.defaultEscapeCharsRegex', function() {

        it('should be a non-configurable property', function() {
            dependencies.escapeRegexString.defaultEscapeCharsRegex = 3.14;
            dependencies.assert.notStrictEqual(dependencies.escapeRegexString.defaultEscapeCharsRegex, 3.14);
        });

        it('should contain a readable RegExp object', function() {
            dependencies.assert.strictEqual(
                Object.prototype.toString.call(dependencies.escapeRegexString.defaultEscapeCharsRegex),
                '[object RegExp]'
            );
        });

    });

});
