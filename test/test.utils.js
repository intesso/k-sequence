var test = require('tape');
var key = require('../index');


test('should find code 32', function (t) {
  t.plan(1);
  var code = key.findCode('space');
  t.equal(code, 32, 'key space should have code 32');
});

test('should find codes [91,92,223,224]', function (t) {
  t.plan(2);
  var codes = key.findAllCodes('meta');
  console.log('codes', codes);
  t.equal(codes.length, 4);
  var arr = [91, 92, 223, 224];
  t.true(arrayEqual(codes, arr));
});

test('should get key "<"', function (t) {
  t.plan(1);
  var k = key.getKey(60);
  t.equal(k, '<', 'key space should have key "<"');
});


function arrayEqual(actual, expected) {
  var equal = true;
  actual.forEach(function (k) {
    if (actual[k] != expected[k]) equal = false;
  });
  return equal;
}
