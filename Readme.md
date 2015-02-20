

# keyboard-shortcut

keyboard shortcut sequences.

## installation

```bash
npm install keyboard-shortcut
```

## usage

```js
var key = require('keyboard-shortcut');

key('a b c', function (e) {
  console.log('hit:', 'a b c');
});

key('a * s * d * f *', function (e) {
  console.log('hit:', 'a <any> s <any> d <any> f <any>');
});

key('ctrl s', function (e) {
  console.log('hit:', 'ctrl s');
});

var el = document.getElementsByTagName('h1')[0];
key('meta e', {
  el: el,
  ms: 1000,
  preventDefault: false,
  stopPropagation: false,
}, function (e) {
  console.log('hit:', 'meta e');
});

key('meta s', function (e) {
  console.log('hit:', 'command s');
});

```

## api

#### keys

These are the available keys: [vkeys.js](https://github.com/intesso/vkeys/blob/master/vkeys.js)

#### key(keys[, options], fn)

the callback function `fn` will only be invoked only if
the given `keys` sequence is matched.

if you want to capture any key in your sequence, you can use the wildard char '*' within the `keys` string.

if `ms` is `50ms` the keys must be pressed within `50ms` for
the callback to be called.


The following options `options` are optional with the default values:
```js
{
  ms: 1000,                  // 1000 milliseconds
  el: window,              // DOM Element the shortcut is added to.
  stopPropagation: false,   // no bubbling up the DOM Tree
  preventDefault: false,    // no default event for the given `keys`.
};
```

#### key.press(key[, el])

creates a `keydown` event, followed by `keyup` for the given key.

example:
```js
key.press('meta');
key.press('s', window);
```
#### key.vkeys

Object with {`code` : `key`} pairs.
```js
{
  0: 'unk',
  ...
  8: 'backspace',
  9: 'tab',
  12: 'clear',
  13: 'enter',
  ...
  254: 'clear'
}
```
see: [vkeys.js](https://github.com/intesso/vkeys/blob/master/vkeys.js)

#### key.getKey(code)

return the `key` for the given `code`.
```js
var key = key.getKey(60);
assert.equal(key, '<');
```
#### key.findCode(key)

returns the first `code` that matches the `key`.
```js
var code = key.findCode('space');
assert.equal(code, 32);
```

#### key.findAllCodes(key)

returns an Array of `code`'s that match the `key`.
```js
var code = key.findAllCodes('meta');
// code equals [91, 92, 223, 224]
```

## test

```bash
npm install -g browserify testling
npm run test
```

## credits

 - @yjelds https://github.com/yields/k-sequence
 - @chrisdickinson https://github.com/chrisdickinson/vkey


## license

 MIT
