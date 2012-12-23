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

	test("oj.Class.extend", function() {
		var Prototype1, prototype1;
 
 		expect(0);
 
		Prototype1 = oj.Class.extend({
			initializedCount: 0,

			instanceProperty1: "instanceValue1",

			constructor: function(params) {
				this._super(params);
debugger;
				if (!params) {
					return;
				}

				this.instanceProperty1 = params.instanceProperty1 || this.instanceProperty1;
			},

			init: function() {
				//this._super();
debugger;
				this.initializedCount += 1;
			},

			instanceMethod1: function(arg) {
				return "instanceMethod1" + " - " + arg;
			},

			instanceMethod2: function(arg) {
				return this.instanceProperty1 + " - " + arg;
			}
		},{
			className: "Prototype1",

			classProperty1: "classValue1",

			classMethod1: function(arg) {
				return "classMethod1" + " - " + arg;
			},

			classMethod2: function(arg) {
				return this.classProperty1 + " - " + arg;
			}
		});

		prototype1 = new Prototype1({a: "b"});
		debugger;
	});
});
