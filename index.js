/**
 * dependencies
 */

var vkeys = require('./vkeys');

/**
 * Export `shortcut`
 */

module.exports = shortcut;

/**
 * Create keyboard shortcut sequence with the `keys` like e.g. 'ctrl s'.
 * The following options `o` are optional with the default values:
 *
 *  {
 *     ms: 500,                 // 500 milliseconds
 *     el: window,              // DOM Element the shortcut is added to.
 *     stopPropagation: true,   // no bubbling up the DOM Tree
 *     preventDefault: true,    // no default event for the given `keys`.
 *  };
 *
 * Example:
 *     var shortcut = require('keyboard-shortcut');
 *
 *     shortcut('a b c', function(e) {
 *       console.log('hit:', 'a b c');
 *     });
 *
 * @param {String} keys
 * @param {Object} o options
 * @param {Function} fn callback function with the keydown event.
 * @api public
 */
function shortcut(keys, o, fn) {
  var keys = keys.split(/ +/);
  var klen = keys.length;
  var seq = [];
  var i = 0;
  var prev;

  if (2 == arguments.length) {
    fn = o;
    o = {};
  }
  defaults();

  o.el.addEventListener('keydown', keydown);

  function keydown(e) {
    var key = keys[i++];
    var code = e.which || e.keyCode;
    var pressed = vkeys[code];
    procedure(pressed, e);
    console.log('keys', keys, 'pressed', pressed, 'code', code);
    if ('*' != key && key != pressed) return reset();
    if (o.ms && prev && new Date - prev > o.ms) return reset();
    if (o.ms) prev = new Date;
    var len = seq.push(pressed);
    if (len != klen) return;
    reset();
    fn(e);
  }

  function defaults() {
    o.ms = o.ms || 500;
    o.el = o.el || window;
    o.preventDefault = o.preventDefault != false;
    o.stopPropagation = o.stopPropagation != false;
  }

  function procedure(pressed, e) {
    var defined = keys.some(function (key) {
      return pressed == key;
    });
    if (!defined) return;
    if (o.preventDefault) e.preventDefault();
    if (o.stopPropagation) e.stopPropagation();
  }

  function reset() {
    prev = null;
    seq = [];
    i = 0;
  }
}
