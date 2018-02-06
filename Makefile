BIN=$(shell npm bin)
DOC_DEST=./docs
MODULE=./index.js
TESTS=$(wildcard ./test/*.js)
ALL_SRC=$(MODULE) $(TESTS)

.PHONY: all clean docs lint tests

all: lint tests

clean:
	rm -Rf $(DOC_DEST)

docs: $(BIN)/jsdoc $(ALL_SRC)
	$< $(ALL_SRC) --verbose --destination $(DOC_DEST)

lint: $(BIN)/eslint $(ALL_SRC)
	$< $(ALL_SRC) --no-color

tests: $(BIN)/mocha $(TESTS)
	$< $(TESTS) --no-colors --check-leaks
