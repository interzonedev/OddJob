$(function() {

	module("oj.Class");

	// oj.Class class tests
	test("oj.Class class defined", function() {
		expect(1);

		strictEqual(typeof(oj.Class), "function", "oj.Class is defined as a class");
	});

	// oj.Class.extend method tests
	test("oj.Class.extend method defined", function() {
		expect(1);

		strictEqual(typeof(oj.Class.extend), "function", "oj.Class.extend is a function");
	});

	test("oj.Class.extend inputs not altered", function() {
		var instanceProperties, classProperties, singleton, instancePropertiesClone, classPropertiesClone, singletonClone;

		expect(3);

		instanceProperties = {
			a: 1,
			b: 2,
			c: function() {
				return this.a;
			}
		};
		classProperties = {
			d: 4
		};
		singleton = false;

		instancePropertiesClone = $.extend(true, {}, instanceProperties);
		classPropertiesClone = $.extend(true, {}, classProperties);
		singletonClone = !!singleton;

		oj.Class.extend(instanceProperties, classProperties, singleton);

		deepEqual(instanceProperties, instancePropertiesClone, "oj.Class.extend does not alter its instanceProperties input");
		deepEqual(classProperties, classPropertiesClone, "oj.Class.extend does not alter its instanceProperties input");
		strictEqual(singleton, singletonClone, "oj.Class.extend does not alter its singleton input");
	});
});
