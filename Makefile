# I'm new at this. Suggestions welcome.
# https://github.com/monotonee/escape-regex-string/issues

BIN=$(shell npm bin)
DOC_DEST=./docs
MODULE=./index.js
TESTS=$(wildcard ./test/*.js)
ALL_SRC=$(MODULE) $(TESTS)

.PHONY: all clean docs lint style test

all: lint style test

clean:
	rm -Rf $(DOC_DEST)

docs: $(BIN)/jsdoc $(ALL_SRC)
	$< $(ALL_SRC) --verbose --destination $(DOC_DEST)

lint: $(BIN)/eslint $(ALL_SRC)
	$< $(ALL_SRC) --no-color

style: $(BIN)/jscs $(ALL_SRC)
	$< $(ALL_SRC) --verbose --no-color

test: $(BIN)/mocha
	$< $(TESTS) --no-colors --check-leaks
