var test = require('tape');
var key = require('../index');


test('should hit meta s', function(t) {
	t.plan(1);
	key('meta s', function(e) {
		t.ok(e, 'hit meta s');
	});
	key.press('meta');
	key.press('s');
});

test('should hit "a b c"', function(t) {
	t.plan(1);
	key('a b c', function(e) {
		t.ok(e, 'hit a b c');
	});
	key.press('a');
	key.press('b');
	key.press('c');
});

test('should hit "< * space * >"', function(t) {
	t.plan(1);
	key('< * space * >', function(e) {
		t.ok(e, 'hit < * space * >');
	});
	key.press('<');
	key.press('f2');
	key.press('space');
	key.press('f3');
	key.press('>');
});

test('should not hit "< * space * >" when pressing "< f1 w space a >"', function(t) {
	t.plan(1);
	var calls = counter();
	key('< * space * >', function(e) {
		calls();
		t.ok(e, 'hit < * space * >');
	});
	key.press('<');
	key.press('f2');
	key.press('w');
	key.press('space');
	key.press('a');
	key.press('>');
	t.equal(0, calls());
});

test('should hit "a b d" when pressing "a b" and "d" after 40ms', function(t) {
	t.plan(1);
	key('a b d', function(e) {
		t.ok(e, 'hit a b and d after 40ms');
	});
	key.press('a');
	key.press('b');
	setTimeout(function() {
		key.press(('d'));
	}, 40);
});

test('should not hit "a b c" when pressing "a c b"', function(t) {
	t.plan(1);
	var calls = counter();
	key('a b c', calls);
	key.press('a');
	key.press('c');
	key.press('b');
	t.equal(0, calls());
});

test('should not hit "e e" when pressing "e" and "e" after 1100ms', function(t) {
	t.plan(1);
	var calls = counter();
	key('e e', calls);
	key.press('e');
	setTimeout(function() {
		key.press(('e'));
	}, 1100);
	setTimeout(function() {
		t.equal(0, calls());
	}, 1200);
});

function counter() {
	var calls = 0;
	return function() {
		return calls++;
	}
}
