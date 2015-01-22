# I'm new at this. Suggestions welcome.
# https://github.com/monotonee/escape-regex-string/issues

BIN=./node_modules/.bin
MODULE=./index.js
TESTS=$(wildcard ./test/*.js)
ALL_SRC=$(MODULE) $(TESTS)

DOC_DEST=./docs

.PHONY: test

all: lint style test npm-check-updates

clean:
	rm -R $(DOC_DEST)

docs: $(BIN)/jsdoc $(ALL_SRC)
	$< $(ALL_SRC) --verbose --destination $(DOC_DEST)

lint: $(BIN)/jshint $(ALL_SRC)
	$< $(ALL_SRC) --verbose

npm-check-updates: $(BIN)/npm-check-updates
	$<

style: $(BIN)/jscs $(ALL_SRC)
	$< $(ALL_SRC) --verbose --no-color

test: $(BIN)/mocha
	$< $(TESTS) --no-colors --check-leaks
