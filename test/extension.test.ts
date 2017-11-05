//
// Note: This example test is leveraging the Mocha test framework.
// Please refer to their documentation on https://mochajs.org/ for help.
//

// The module 'assert' provides assertion methods from node
import * as assert from 'assert';

// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
import * as vscode from 'vscode';
import * as myExtension from '../src/extension';
import {JsonHelper} from '../src/extension';

suite("Unit tests", () => {
  let validUglifiedUnescapedJson = '{"name":"Andy","age":21}'
  let validUglifiedEscapedJson = '{\\"name\\":\\"Andy\\",\\"age\\":21}'
  let validUglifiedEscapedJsonString = '"{\\"name\\":\\"Andy\\",\\"age\\":21}"'
  let validUglifiedEscapedJsonStringWithEndingQuote = '{\\"name\\":\\"Andy\\",\\"age\\":21}"'
  let validUglifiedEscapedJsonStringWithStartingQuote = '"{\\"name\\":\\"Andy\\",\\"age\\":21}'
  let validBeautifiedJson4 = '{\n    "name": "Andy",\n    "age": 21\n}'
  let validBeautifiedJson2 = '{\n  "name": "Andy",\n  "age": 21\n}'
  let invalidJson = '{"name": "andy}'



  let jsonHelper = new JsonHelper()
  test("Validate JSON", () => {
    assert.equal(jsonHelper.isValid(validUglifiedUnescapedJson), true, "Valid Json should return true")
    assert.equal(jsonHelper.isValid(invalidJson), false, "Invalid Json should return false")
  })

  test("Beautify JSON", () => {
    assert.equal(jsonHelper.beautify(validUglifiedUnescapedJson, 4), validBeautifiedJson4)
    assert.equal(jsonHelper.beautify(validUglifiedUnescapedJson, 2), validBeautifiedJson2)
    assert.equal(jsonHelper.beautify(invalidJson), invalidJson, "Invalid Json should return itself")
  })

  test("Uglify JSON", () => {
    assert.equal(jsonHelper.uglify(validBeautifiedJson4), validUglifiedUnescapedJson)
    assert.equal(jsonHelper.uglify(invalidJson), invalidJson, "Invalid Json should return itself")
  })

  test("Escape JSON", () => {
    assert.equal(jsonHelper.escape(validUglifiedUnescapedJson), validUglifiedEscapedJson)
    assert.equal(jsonHelper.escape(invalidJson), invalidJson, "Invalid Json should return itself")
  })

  test("Unescape JSON", () => {
    assert.equal(jsonHelper.unescape(validUglifiedEscapedJson), validUglifiedUnescapedJson)
    assert.equal(jsonHelper.unescape(validUglifiedEscapedJsonString), validUglifiedUnescapedJson)
    assert.equal(jsonHelper.unescape(validUglifiedEscapedJsonStringWithEndingQuote), validUglifiedUnescapedJson)
    assert.equal(jsonHelper.unescape(validUglifiedEscapedJsonStringWithStartingQuote), validUglifiedUnescapedJson)
    assert.equal(jsonHelper.unescape(invalidJson), invalidJson, "Invalid Json should return itself")
  })

})