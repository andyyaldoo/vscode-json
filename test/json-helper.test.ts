//
// Note: This example test is leveraging the Mocha test framework.
// Please refer to their documentation on https://mochajs.org/ for help.
//

// The module 'assert' provides assertion methods from node
import * as assert from "assert";

// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
import JsonHelper from "../src/json-helper";

suite("Unit tests", () => {
  let jsonHelper = new JsonHelper();
  let validUglifiedUnescapedJson = '{"name":"Andy","age":21}';
  let validUglifiedEscapedJson = '{\\"name\\":\\"Andy\\",\\"age\\":21}';
  let validUglifiedEscapedJsonString = '"{\\"name\\":\\"Andy\\",\\"age\\":21}"';
  let validUglifiedEscapedJsonStringWithEndingQuote =
    '{\\"name\\":\\"Andy\\",\\"age\\":21}"';
  let validUglifiedEscapedJsonStringWithStartingQuote =
    '"{\\"name\\":\\"Andy\\",\\"age\\":21}';
  let validBeautifiedJson4 = '{\n    "name": "Andy",\n    "age": 21\n}';
  let validBeautifiedJson2 = '{\n  "name": "Andy",\n  "age": 21\n}';
  let invalidJson = '{"name": "andy}';

  let uglifiedBigNumberJSON = `{"id1":365247355169013770,"id2":367559095164600330}`
  let beautifiedBigNumberJSON = `\n  {"id1": 365247355169013770,\n  "id2": 367559095164600330\n}`
  let uglifiedEscapedBigNumberJSON =`{\\"id1\\":365247355169013770,\\"id2\\":367559095164600330}`
  let beautifiedEscapedBigNumberJSON = `\n  {\"id1\": 365247355169013770,\n  \"id2\": 367559095164600330\n}`

  test("Validate JSON", () => {
    assert.equal(
      jsonHelper.isValid(validUglifiedUnescapedJson),
      true,
      "Valid Json should return true"
    );
    assert.equal(
      jsonHelper.isValid(invalidJson),
      false,
      "Invalid Json should return false"
    );

    assert.equal(
      jsonHelper.isValid(uglifiedBigNumberJSON),
      true
    );

    assert.equal(
      jsonHelper.isValid(beautifiedBigNumberJSON),
      true
    );
  });

  test("Beautify JSON", () => {
    assert.equal(
      jsonHelper.beautify(validUglifiedUnescapedJson, 4),
      validBeautifiedJson4
    );
    assert.equal(
      jsonHelper.beautify(validUglifiedUnescapedJson, 2),
      validBeautifiedJson2
    );
    assert.equal(
      jsonHelper.beautify(invalidJson),
      invalidJson,
      "Invalid Json should return itself"
    );

    assert.equal(
      jsonHelper.beautify(uglifiedBigNumberJSON, 2),
      beautifiedBigNumberJSON,
    );
  });

  test("Uglify JSON", () => {
    assert.equal(
      jsonHelper.uglify(validBeautifiedJson4),
      validUglifiedUnescapedJson
    );

    assert.equal(
      jsonHelper.uglify(beautifiedBigNumberJSON),
      uglifiedBigNumberJSON,
    );

    assert.equal(
      jsonHelper.uglify(invalidJson),
      invalidJson,
      "Invalid Json should return itself"
    );
  });

  test("Escape JSON", () => {
    assert.equal(
      jsonHelper.escape(validUglifiedUnescapedJson),
      validUglifiedEscapedJson
    );

    assert.equal(
      jsonHelper.escape(uglifiedBigNumberJSON),
      uglifiedEscapedBigNumberJSON,
    );

    assert.equal(
      jsonHelper.escape(invalidJson),
      invalidJson,
      "Invalid Json should return itself"
    );
  });

  test("Unescape JSON", () => {
    assert.equal(
      jsonHelper.unescape(validUglifiedEscapedJson),
      validUglifiedUnescapedJson
    );
    assert.equal(
      jsonHelper.unescape(validUglifiedEscapedJsonString),
      validUglifiedUnescapedJson
    );
    assert.equal(
      jsonHelper.unescape(validUglifiedEscapedJsonStringWithEndingQuote),
      validUglifiedUnescapedJson
    );
    assert.equal(
      jsonHelper.unescape(validUglifiedEscapedJsonStringWithStartingQuote),
      validUglifiedUnescapedJson
    );

    assert.equal(
      jsonHelper.unescape(uglifiedEscapedBigNumberJSON),
      uglifiedBigNumberJSON,
    );

    assert.equal(
      jsonHelper.unescape(invalidJson),
      invalidJson,
      "Invalid Json should return itself"
    );
  });
});
