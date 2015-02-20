

# keyboard-shortcut

keyboard shortcut sequences.

## installation

```bash
npm install keyboard-shortcut
```

## usage

```js
var shortcut = require('keyboard-shortcut');

shortcut('a b c', function (e) {
  console.log('hit:', 'a b c');
});

shortcut('a * s * d * f *', function (e) {
  console.log('hit:', 'a <any> s <any> d <any> f <any>');
});

shortcut('ctrl s', function (e) {
  console.log('hit:', 'ctrl s');
});

var el = document.getElementsByName('h1');
shortcut('meta e', {
  el: el,
  ms: 1000,
  preventDefault: false,
  stopPropagation: false,
}, function (e) {
  console.log('hit:', 'meta e');
});

shortcut('meta s', function (e) {
  console.log('hit:', 'command s');
});

```

## api

### shortcut(keys[, options], fn)

the callback function `fn` will only be invoked only if
the given `keys` sequence is matched.

if you want to capture any key in your sequence, you can use the wildard char '*' within the `keys` string.

if `ms` is `500ms` the keys must be pressed within `500ms` for
the callback to be called.



The following options `options` are optional with the default values:
```js
{
  ms: 500,                 // 500 milliseconds
  el: window,              // DOM Element the shortcut is added to.
  stopPropagation: true,   // no bubbling up the DOM Tree
  preventDefault: true,    // no default event for the given `keys`.
};
```


### keys

Available keys: [vkeys.js](vkeys.js)

## test

```bash
$ make test
```

## credits

 - @yjelds https://github.com/yields/k-sequence
 - @chrisdickinson https://github.com/chrisdickinson/vkey


## license

 MIT
