$(function() {
	var Singleton1, Prototype1, Singleton2, Prototype2, anonymousSubclassNameRegEx;

	anonymousSubclassNameRegEx = /^oj\.oop\.OjObject_subclass_\d+$/;

	Singleton1 = null;
	Prototype1 = null;
	Singleton2 = null;
	Prototype2 = null;

	module("oj.oop.OjObject", {
		// Redefine the classes before each test to wipe out any state altered at the class level between test
		// (especially singleton instance state).
		setup: function() {
			Singleton1 = oj.oop.OjObject.extend({
				initializedCount: 0,

				instanceProperty1: "instanceValue1",

				constructor: function(params) {
					this.base(params);

					if (!params) {
						return;
					}

					this.instanceProperty1 = params.instanceProperty1 || this.instanceProperty1;
				},

				init: function() {
					this.base();

					this.initializedCount += 1;
				},

				instanceMethod1: function(arg) {
					return "instanceMethod1" + " - " + arg;
				},

				instanceMethod2: function(arg) {
					return this.instanceProperty1 + " - " + arg;
				}
			},{
				className: "Singleton1",

				classProperty1: "classValue1",

				classMethod1: function(arg) {
					return "classMethod1" + " - " + arg;
				},

				classMethod2: function(arg) {
					return this.classProperty1 + " - " + arg;
				}
			}, true);

			Prototype1 = oj.oop.OjObject.extend({
				initializedCount: 0,

				instanceProperty1: "instanceValue1",

				constructor: function(params) {
					this.base(params);

					if (!params) {
						return;
					}

					this.instanceProperty1 = params.instanceProperty1 || this.instanceProperty1;
				},

				init: function() {
					this.base();

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

			Singleton2 = Prototype1.extend({
				instanceProperty2: "instanceValue2",

				constructor: function(params) {
					this.base(params);

					if (!params) {
						return;
					}

					this.instanceProperty1 = params.instanceProperty1 || this.instanceProperty1;
					this.instanceProperty2 = params.instanceProperty2 || this.instanceProperty2;
				},

				init: function() {
					this.base();

					this.initializedCount += 1;
				},

				instanceMethod2: function(arg) {
					return this.base(arg) + " - " + this.instanceProperty2 + " - " + arg;
				}
			},{
				className: "Singleton2",

				classProperty2: "classValue2",

				classMethod2: function(arg) {
					return this.ancestor.classMethod2(arg) + " - " + this.classProperty2 + " - " + arg;
				}
			}, true);

			Prototype2 = Singleton1.extend({
				instanceProperty2: "instanceValue2",

				constructor: function(params) {
					this.base(params);

					if (!params) {
						return;
					}

					this.instanceProperty1 = params.instanceProperty1 || this.instanceProperty1;
					this.instanceProperty2 = params.instanceProperty2 || this.instanceProperty2;
				},

				init: function() {
					this.base();

					this.initializedCount += 1;
				},

				instanceMethod2: function(arg) {
					return this.base(arg) + " - " + this.instanceProperty2 + " - " + arg;
				}
			},{
				className: "Prototype2",

				classProperty2: "classValue2",

				classMethod2: function(arg) {
					return this.ancestor.classMethod2(arg) + " - " + this.classProperty2 + " - " + arg;
				}
			});
		},
		teardown: function() {
			Singleton1 = null;
			Prototype1 = null;
			Singleton2 = null;
			Prototype2 = null;
		}
	});

	// oj.oop.OjObject class tests
	test("oj.oop.OjObject class defined", function() {
		expect(1);

		strictEqual(typeof(oj.oop.OjObject), "function", "oj.oop.OjObject is defined as a class");
	});

	test("oj.oop.OjObject class name", function() {
		expect(1);

		strictEqual(oj.oop.OjObject.className, "oj.oop.OjObject", "oj.oop.OjObject.className is set");
	});

	// oj.oop.OjObject.getInstance method tests
	test("oj.oop.OjObject.getInstance method defined", function() {
		expect(1);

		strictEqual(typeof(oj.oop.OjObject.getInstance), "function", "oj.oop.OjObject.getInstance is a function");
	});

	test("oj.oop.OjObject.getInstance called with non defined values", function() {
		expect(5 * QUnit.oj.nonDefinedValues.length);

		$.each(QUnit.oj.nonDefinedValues, function(i, nonDefinedValue) {
			var instance;

			instance = oj.oop.OjObject.getInstance(nonDefinedValue, true);

			ok(instance, "oj.oop.OjObject.getInstance called with " + nonDefinedValue + " returns a defined value");
			strictEqual(typeof(instance), "object", "oj.oop.OjObject.getInstance called with " + nonDefinedValue + " returns an instance");
			strictEqual(instance.instanceName.indexOf("oj.oop.OjObject_instance_"), 0, "oj.oop.OjObject.getInstance called with " + nonDefinedValue + " returns an instantiated instance");
			strictEqual(instance.className, "oj.oop.OjObject", "oj.oop.OjObject.getInstance called with " + nonDefinedValue + " returns an instance with the class name set");
			strictEqual(instance.clazz, oj.oop.OjObject, "oj.oop.OjObject.getInstance called with " + nonDefinedValue + " returns an instance with the class set");
		});
	});

	test("oj.oop.OjObject.getInstance called with defined values", function() {
		expect(5 * QUnit.oj.definedInstances.length);

		$.each(QUnit.oj.definedInstances, function(i, definedValue) {
			var instance;

			instance = oj.oop.OjObject.getInstance(definedValue, true);

			ok(instance, "oj.oop.OjObject.getInstance called with " + definedValue + " returns a defined value");
			strictEqual(typeof(instance), "object", "oj.oop.OjObject.getInstance called with " + definedValue + " returns an instance");
			strictEqual(instance.instanceName.indexOf("oj.oop.OjObject_instance_"), 0, "oj.oop.OjObject.getInstance called with " + definedValue + " returns an instantiated instance");
			strictEqual(instance.className, "oj.oop.OjObject", "oj.oop.OjObject.getInstance called with " + definedValue + " returns an instance with the class name set");
			strictEqual(instance.clazz, oj.oop.OjObject, "oj.oop.OjObject.getInstance called with " + definedValue + " returns an instance with the class set");
		});
	});

	test("oj.oop.OjObject.getInstance called with instanceName param", function() {
		var instanceName, params, instance;

		expect(5);

		instanceName = "instance1";

		params = {
			"instanceName": instanceName
		};

		instance = oj.oop.OjObject.getInstance(params, true);

		ok(instance, "oj.oop.OjObject.getInstance called with instanceName param returns a defined value");
		strictEqual(typeof(instance), "object", "oj.oop.OjObject.getInstance called with instanceName param returns an instance");
		strictEqual(instance.instanceName, instanceName, "oj.oop.OjObject.getInstance called with instanceName param returns an instance with instanceName set");
		strictEqual(instance.className, "oj.oop.OjObject", "oj.oop.OjObject.getInstance called with instanceName param returns an instance with the class name set");
		strictEqual(instance.clazz, oj.oop.OjObject, "oj.oop.OjObject.getInstance called with instanceName param returns an instance with the class set");
	});

	// Singleton1 test class properties tests
	test("Singleton1 class properties", function() {
		expect(3);

		strictEqual(typeof(Singleton1), "function", "Singleton1 is defined as a class");
		strictEqual(Singleton1.className, "Singleton1", "The Singleton1.className class property is defined");
		strictEqual(Singleton1.classProperty1, "classValue1", "The Singleton1.classProperty1 class property is defined");
	});

	// Singleton1 test class getInstance method tests
	test("Singleton1.getInstance called with no params sets default properties on instance", function() {
		var instance;

		expect(6);

		instance = Singleton1.getInstance();

		ok(instance, "Singleton1.getInstance called with no params returns a defined value");
		strictEqual(typeof(instance), "object", "Singleton1.getInstance called with no params returns an instance");
		strictEqual(instance.instanceName.indexOf("Singleton1_instance_"), 0, "Singleton1.getInstance called with no params returns an instance with the default instanceName set");
		strictEqual(instance.className, "Singleton1", "Singleton1.getInstance called with no params returns an instance with the class name set");
		strictEqual(instance.clazz, Singleton1, "Singleton1.getInstance called with no params returns an instance with the class set");
		strictEqual(instance.instanceProperty1, "instanceValue1", "Singleton1.getInstance called with no params returns an instance with the instance property set");
	});

	test("Singleton1.getInstance called with empty params sets default properties on instance", function() {
		var instance;

		expect(6);

		instance = Singleton1.getInstance({}, false);

		ok(instance, "Singleton1.getInstance called with empty params returns a defined value");
		strictEqual(typeof(instance), "object", "Singleton1.getInstance called with empty params returns an instance");
		strictEqual(instance.instanceName.indexOf("Singleton1_instance_"), 0, "Singleton1.getInstance called with empty params returns an instance with the default instanceName set");
		strictEqual(instance.className, "Singleton1", "Singleton1.getInstance called with empty params returns an instance with the class name set");
		strictEqual(instance.clazz, Singleton1, "Singleton1.getInstance called with empty params returns an instance with the class set");
		strictEqual(instance.instanceProperty1, "instanceValue1", "Singleton1.getInstance called with empty params returns an instance with the instance property set");
	});

	test("Singleton1.getInstance called with instanceName param", function() {
		var instanceName, params, instance;

		expect(6);

		instanceName = "instance1";

		params = {
			"instanceName": instanceName
		};

		instance = Singleton1.getInstance(params, false);

		ok(instance, "Singleton1.getInstance called with instanceName param returns a defined value");
		strictEqual(typeof(instance), "object", "Singleton1.getInstance called with instanceName param returns an instance");
		strictEqual(instance.instanceName, instanceName, "Singleton1.getInstance called with instanceName param returns an instance with instanceName set");
		strictEqual(instance.className, "Singleton1", "Singleton1.getInstance called with instanceName param returns an instance with the class name set");
		strictEqual(instance.clazz, Singleton1, "Singleton1.getInstance called with instanceName param returns an instance with the class set");
		strictEqual(instance.instanceProperty1, "instanceValue1", "Singleton1.getInstance called with instanceName param returns an instance with the instance property set");
	});

	test("Singleton1.getInstance called with no initialization", function() {
		var instance;

		expect(7);

		instance = Singleton1.getInstance({}, false);

		ok(instance, "Singleton1.getInstance called with no initialization returns a defined value");
		strictEqual(typeof(instance), "object", "Singleton1.getInstance called with no initialization returns an instance");
		strictEqual(instance.instanceName.indexOf("Singleton1_instance_"), 0, "Singleton1.getInstance called with no initialization returns an instance with the default instanceName set");
		strictEqual(instance.className, "Singleton1", "Singleton1.getInstance called with no initialization returns an instance with the class name set");
		strictEqual(instance.clazz, Singleton1, "Singleton1.getInstance called with no initialization returns an instance with the class set");
		strictEqual(instance.initializedCount, 0, "Singleton1.getInstance called with no initialization does not initialize the instance");
		strictEqual(instance.instanceProperty1, "instanceValue1", "Singleton1.getInstance called with no initialization returns an instance with the instance property set");
	});

	test("Singleton1.getInstance called with initialization", function() {
		var instance;

		expect(7);

		instance = Singleton1.getInstance({}, true);

		ok(instance, "Singleton1.getInstance called with initialization returns a defined value");
		strictEqual(typeof(instance), "object", "Singleton1.getInstance called with initialization returns an instance");
		strictEqual(instance.instanceName.indexOf("Singleton1_instance_"), 0, "Singleton1.getInstance called with initialization returns an instance with the default instanceName set");
		strictEqual(instance.className, "Singleton1", "Singleton1.getInstance called with initialization returns an instance with the class name set");
		strictEqual(instance.clazz, Singleton1, "Singleton1.getInstance called with initialization returns an instance with the class set");
		strictEqual(instance.initializedCount, 1, "Singleton1.getInstance called with initialization initializes the instance");
		strictEqual(instance.instanceProperty1, "instanceValue1", "Singleton1.getInstance called with initialization returns an instance with the instance property set");
	});

	test("Singleton1.getInstance called twice", function() {
		var instance1, instance2;

		expect(14);

		instance1 = Singleton1.getInstance({}, true);
		instance2 = Singleton1.getInstance({}, true);

		ok(instance1, "Singleton1.getInstance called twice returns a defined value");
		ok(instance2, "Singleton1.getInstance called twice returns a defined value");
		strictEqual(typeof(instance1), "object", "Singleton1.getInstance called twice returns an instance");
		strictEqual(typeof(instance2), "object", "Singleton1.getInstance called twice returns an instance");
		strictEqual(instance2, instance1, "Singleton1.getInstance called twice returns the same instance");
		strictEqual(instance2.instanceName, instance1.instanceName, "Singleton1.getInstance called twice returns the same instance");
		strictEqual(instance1.className, "Singleton1", "Singleton1.getInstance called twice returns an instance with the class name set");
		strictEqual(instance2.className, "Singleton1", "Singleton1.getInstance called twice returns an instance with the class name set");
		strictEqual(instance1.clazz, Singleton1, "Singleton1.getInstance called twice returns an instance with the class set");
		strictEqual(instance2.clazz, Singleton1, "Singleton1.getInstance called twice returns an instance with the class set");		
		strictEqual(instance1.initializedCount, 1, "Singleton1.getInstance called twice only initializes the instance once");
		strictEqual(instance2.initializedCount, 1, "Singleton1.getInstance called twice only initializes the instance once");
		strictEqual(instance1.instanceProperty1, "instanceValue1", "Singleton1.getInstance called twice returns an instance with the instance property set");
		strictEqual(instance2.instanceProperty1, "instanceValue1", "Singleton1.getInstance called twice returns an instance with the instance property set");
	});

	// Singleton1 test class instanceMethod1 instance method tests
	test("Singleton1.instanceMethod1 instance method defined", function() {
		var instance;

		expect(1);

		instance = Singleton1.getInstance();

		strictEqual(typeof(instance.instanceMethod1), "function", "Instances of Singleton1 should have the instanceMethod1 instance method defined");
	});
 
	test("Singleton1.instanceMethod1 instance method called", function() {
		var instance, arg, result;

		expect(1);

		instance = Singleton1.getInstance();

		arg = "test1";

		result = instance.instanceMethod1(arg);

		strictEqual(result, "instanceMethod1" + " - " + arg, "The Singleton1.instanceMethod1 instance should return the correct result");
	});

	// Singleton1 test class instanceMethod2 instance method tests
	test("Singleton1.instanceMethod2 instance method defined", function() {
		var instance;

		expect(1);

		instance = Singleton1.getInstance();

		strictEqual(typeof(instance.instanceMethod2), "function", "Instances of Singleton1 should have the instanceMethod2 instance method defined");
	});

	test("Singleton1.instanceMethod2 instance method called", function() {
		var instance, arg, result;

		expect(1);

		instance = Singleton1.getInstance();

		arg = "test1";

		result = instance.instanceMethod2(arg);

		strictEqual(result, instance.instanceProperty1 + " - " + arg, "The Singleton1.instanceMethod2 instance should return the correct result");
	});

	// Singleton1 test class classMethod1 class method tests
	test("Singleton1.classMethod1 class method defined", function() {
		expect(1);

		strictEqual(typeof(Singleton1.classMethod1), "function", "Singleton1 should have the classMethod1 class method defined");
	});
 
	test("Singleton1.classMethod1 class method called", function() {
		var arg, result;

		expect(1);

		arg = "test1";

		result = Singleton1.classMethod1(arg);

		strictEqual(result, "classMethod1" + " - " + arg, "The Singleton1.classMethod1 class method should return the correct result");
	});

	// Singleton1 test class classMethod2 class method tests
	test("Singleton1.classMethod2 class method defined", function() {
		expect(1);

		strictEqual(typeof(Singleton1.classMethod2), "function", "Singleton1 should have the classMethod2 class method defined");
	});
 
	test("Singleton1.classMethod2 class method called", function() {
		var arg, result;

		expect(1);

		arg = "test1";

		result = Singleton1.classMethod2(arg);

		strictEqual(result, Singleton1.classProperty1 + " - " + arg, "The Singleton1.classMethod2 class method should return the correct result");
	});

	// Singleton2 test class properties tests
	test("Singleton2 class properties", function() {
		expect(4);

		strictEqual(typeof(Singleton2), "function", "Singleton2 is defined as a class");
		strictEqual(Singleton2.className, "Singleton2", "The Singleton2.className class property is defined");
		strictEqual(Singleton2.classProperty1, "classValue1", "The Singleton2.classProperty1 class property is defined");
		strictEqual(Singleton2.classProperty2, "classValue2", "The Singleton2.classProperty2 class property is defined");
	});

	// Singleton2 test class getInstance method tests
	test("Singleton2.getInstance called with no params sets default properties on instance", function() {
		var instance;

		expect(7);

		instance = Singleton2.getInstance();

		ok(instance, "Singleton2.getInstance called with no params returns a defined value");
		strictEqual(typeof(instance), "object", "Singleton2.getInstance called with no params returns an instance");
		strictEqual(instance.instanceName.indexOf("Singleton2_instance_"), 0, "Singleton2.getInstance called with no params returns an instance with the default instanceName set");
		strictEqual(instance.className, "Singleton2", "Singleton2.getInstance called with no params returns an instance with the class name set");
		strictEqual(instance.clazz, Singleton2, "Singleton2.getInstance called with no params returns an instance with the class set");
		strictEqual(instance.instanceProperty1, "instanceValue1", "Singleton2.getInstance called with no params returns an instance with the instance properties set");
		strictEqual(instance.instanceProperty2, "instanceValue2", "Singleton2.getInstance called with no params returns an instance with the instance properties set");
	});

	test("Singleton2.getInstance called with empty params sets default properties on instance", function() {
		var instance;

		expect(7);

		instance = Singleton2.getInstance({}, false);

		ok(instance, "Singleton2.getInstance called with empty params returns a defined value");
		strictEqual(typeof(instance), "object", "Singleton2.getInstance called with empty params returns an instance");
		strictEqual(instance.instanceName.indexOf("Singleton2_instance_"), 0, "Singleton2.getInstance called with empty params returns an instance with the default instanceName set");
		strictEqual(instance.className, "Singleton2", "Singleton2.getInstance called with empty params returns an instance with the class name set");
		strictEqual(instance.clazz, Singleton2, "Singleton2.getInstance called with empty params returns an instance with the class set");
		strictEqual(instance.instanceProperty1, "instanceValue1", "Singleton2.getInstance called with empty params returns an instance with the instance properties set");
		strictEqual(instance.instanceProperty2, "instanceValue2", "Singleton2.getInstance called with empty params returns an instance with the instance properties set");
	});

	test("Singleton2.getInstance called with instanceName param", function() {
		var instanceName, params, instance;

		expect(7);

		instanceName = "instance1";

		params = {
			"instanceName": instanceName
		};

		instance = Singleton2.getInstance(params, false);

		ok(instance, "Singleton2.getInstance called with instanceName param returns a defined value");
		strictEqual(typeof(instance), "object", "Singleton2.getInstance called with instanceName param returns an instance");
		strictEqual(instance.instanceName, instanceName, "Singleton2.getInstance called with instanceName param returns an instance with instanceName set");
		strictEqual(instance.className, "Singleton2", "Singleton2.getInstance called with instanceName param returns an instance with the class name set");
		strictEqual(instance.clazz, Singleton2, "Singleton2.getInstance called with instanceName param returns an instance with the class set");
		strictEqual(instance.instanceProperty1, "instanceValue1", "Singleton2.getInstance called with instanceName param returns an instance with the instance properties set");
		strictEqual(instance.instanceProperty2, "instanceValue2", "Singleton2.getInstance called with instanceName param returns an instance with the instance properties set");
	});

	test("Singleton2.getInstance called with no initialization", function() {
		var instance;

		expect(8);

		instance = Singleton2.getInstance({}, false);

		ok(instance, "Singleton2.getInstance called with no initialization returns a defined value");
		strictEqual(typeof(instance), "object", "Singleton2.getInstance called with no initialization returns an instance");
		strictEqual(instance.instanceName.indexOf("Singleton2_instance_"), 0, "Singleton2.getInstance called with no initialization returns an instance with the default instanceName set");
		strictEqual(instance.className, "Singleton2", "Singleton2.getInstance called with no initialization returns an instance with the class name set");
		strictEqual(instance.clazz, Singleton2, "Singleton2.getInstance called with no initialization returns an instance with the class set");
		strictEqual(instance.initializedCount, 0, "Singleton2.getInstance called with no initialization does not initialize the instance");
		strictEqual(instance.instanceProperty1, "instanceValue1", "Singleton2.getInstance called with no initialization returns an instance with the instance properties set");
		strictEqual(instance.instanceProperty2, "instanceValue2", "Singleton2.getInstance called with no initialization returns an instance with the instance properties set");
	});

	test("Singleton2.getInstance called with initialization", function() {
		var instance;

		expect(8);

		instance = Singleton2.getInstance({}, true);

		ok(instance, "Singleton2.getInstance called with initialization returns a defined value");
		strictEqual(typeof(instance), "object", "Singleton2.getInstance called with initialization returns an instance");
		strictEqual(instance.instanceName.indexOf("Singleton2_instance_"), 0, "Singleton2.getInstance called with initialization returns an instance with the default instanceName set");
		strictEqual(instance.className, "Singleton2", "Singleton2.getInstance called with initialization returns an instance with the class name set");
		strictEqual(instance.clazz, Singleton2, "Singleton2.getInstance called with initialization returns an instance with the class set");
		strictEqual(instance.initializedCount, 2, "Singleton2.getInstance called with initialization initializes the instance");
		strictEqual(instance.instanceProperty1, "instanceValue1", "Singleton2.getInstance called with initialization returns an instance with the instance properties set");
		strictEqual(instance.instanceProperty2, "instanceValue2", "Singleton2.getInstance called with initialization returns an instance with the instance properties set");
	});

	test("Singleton2.getInstance called with instanceProperty1 and instanceProperty2 param", function() {
		var instancePropertyValue1, instancePropertyValue2, params, instance;

		expect(8);

		instancePropertyValue1 = "test1";
		instancePropertyValue2 = "test2";

		params = {
			"instanceProperty1": instancePropertyValue1,
			"instanceProperty2": instancePropertyValue2
		};

		instance = Singleton2.getInstance(params, true);

		ok(instance, "Singleton2.getInstance called with instanceProperty1 and instanceProperty2 param returns a defined value");
		strictEqual(typeof(instance), "object", "Singleton2.getInstance called with instanceProperty1 and instanceProperty2 param returns an instance");
		strictEqual(instance.instanceName.indexOf("Singleton2_instance_"), 0, "Singleton2.getInstance called with instanceProperty1 and instanceProperty2 param returns an instance with the default instanceName set");
		strictEqual(instance.className, "Singleton2", "Singleton2.getInstance called with instanceProperty1 and instanceProperty2 param returns an instance with the class name set");
		strictEqual(instance.clazz, Singleton2, "Singleton2.getInstance called with instanceProperty1 and instanceProperty2 param returns an instance with the class set");
		strictEqual(instance.instanceProperty1, instancePropertyValue1, "Singleton2.getInstance called with instanceProperty1 and instanceProperty2 param returns an instance with the instanceProperty2 properties set");
		strictEqual(instance.instanceProperty2, instancePropertyValue2, "Singleton2.getInstance called with instanceProperty1 and instanceProperty2 param returns an instance with the instanceProperty2 properties set");
		strictEqual(instance.initializedCount, 2, "Singleton2.getInstance called with instanceProperty1 and instanceProperty2 param only initializes the instance once");
	});

	test("Singleton2.getInstance called twice", function() {
		var instance1, instance2;

		expect(16);

		instance1 = Singleton2.getInstance({}, true);
		instance2 = Singleton2.getInstance({}, true);

		ok(instance1, "Singleton2.getInstance called twice returns a defined value");
		ok(instance1, "Singleton2.getInstance called twice returns a defined value");
		strictEqual(typeof(instance1), "object", "Singleton2.getInstance called twice returns an instance");
		strictEqual(typeof(instance2), "object", "Singleton2.getInstance called twice returns an instance");
		strictEqual(instance2, instance1, "Singleton2.getInstance called twice returns the same instance");
		strictEqual(instance2.instanceName, instance1.instanceName, "Singleton2.getInstance called twice returns the same instance");
		strictEqual(instance1.className, "Singleton2", "Singleton2.getInstance called twice returns an instance with the class name set");
		strictEqual(instance2.className, "Singleton2", "Singleton2.getInstance called twice returns an instance with the class name set");
		strictEqual(instance1.clazz, Singleton2, "Singleton2.getInstance called twice returns an instance with the class set");
		strictEqual(instance2.clazz, Singleton2, "Singleton2.getInstance called twice returns an instance with the class set");		
		strictEqual(instance1.initializedCount, 2, "Singleton2.getInstance called twice only initializes the instance once");
		strictEqual(instance2.initializedCount, 2, "Singleton2.getInstance called twice only initializes the instance once");
		strictEqual(instance1.instanceProperty1, "instanceValue1", "Singleton2.getInstance called twice returns an instance with the instance properties set");
		strictEqual(instance2.instanceProperty1, "instanceValue1", "Singleton2.getInstance called twice returns an instance with the instance properties set");
		strictEqual(instance1.instanceProperty2, "instanceValue2", "Singleton2.getInstance called twice returns an instance with the instance properties set");
		strictEqual(instance2.instanceProperty2, "instanceValue2", "Singleton2.getInstance called twice returns an instance with the instance properties set");
	});

	// Singleton1 and Singleton2 test classes getInstance method tests
	test("Singleton1.getInstance and Singleton2.getInstance called", function() {
		var instance1, instance2;

		expect(15);

		instance1 = Singleton1.getInstance({}, true);
		instance2 = Singleton2.getInstance({}, true);

		ok(instance1, "Singleton1.getInstance and Singleton2.getInstance called returns a defined value");
		ok(instance2, "Singleton1.getInstance and Singleton2.getInstance called returns a defined value");
		strictEqual(typeof(instance1), "object", "Singleton1.getInstance and Singleton2.getInstance called returns an instance for Singleton1");
		strictEqual(typeof(instance2), "object", "Singleton1.getInstance and Singleton2.getInstance called returns an instance for Singleton2");
		strictEqual(instance1.instanceName.indexOf("Singleton1_instance_"), 0, "Singleton1.getInstance and Singleton2.getInstance called returns an instance with the default instanceName set for Singleton1");
		strictEqual(instance2.instanceName.indexOf("Singleton2_instance_"), 0, "Singleton1.getInstance and Singleton2.getInstance called returns an instance with the default instanceName set for Singleton2");
		strictEqual(instance1.className, "Singleton1", "Singleton1.getInstance and Singleton2.getInstance called returns an instance with the class name set for Singleton1");
		strictEqual(instance2.className, "Singleton2", "Singleton1.getInstance and Singleton2.getInstance called returns an instance with the class name set for Singleton2");
		strictEqual(instance1.clazz, Singleton1, "Singleton1.getInstance and Singleton2.getInstance called returns an instance with the class set for Singleton1");
		strictEqual(instance2.clazz, Singleton2, "Singleton1.getInstance and Singleton2.getInstance called returns an instance with the class set for Singleton2");
		strictEqual(instance1.initializedCount, 1, "Singleton1.getInstance and Singleton2.getInstance called only initializes the instance once for Singleton1");
		strictEqual(instance2.initializedCount, 2, "Singleton1.getInstance and Singleton2.getInstance called only initializes the instance once for Singleton2");
		strictEqual(instance1.instanceProperty1, "instanceValue1", "Singleton1.getInstance and Singleton2.getInstance called returns an instance with the instance property set for Singleton1");
		strictEqual(instance2.instanceProperty1, "instanceValue1", "Singleton1.getInstance and Singleton2.getInstance called returns an instance with the instance properties set for Singleton2");
		strictEqual(instance2.instanceProperty2, "instanceValue2", "Singleton1.getInstance and Singleton2.getInstance called returns an instance with the instance properties set for Singleton2");
	});

	// Singleton2 test class instanceMethod1 instance method tests
	test("Singleton2.instanceMethod1 instance method defined", function() {
		var instance;

		expect(1);

		instance = Singleton2.getInstance();

		strictEqual(typeof(instance.instanceMethod1), "function", "Instances of Singleton2 should have the instanceMethod1 instance method defined");
	});

	test("Singleton2.instanceMethod1 instance method called", function() {
		var instance, arg, result;

		expect(1);

		instance = Singleton2.getInstance();

		arg = "test1";

		result = instance.instanceMethod1(arg);

		strictEqual(result, "instanceMethod1" + " - " + arg, "The Singleton2.instanceMethod1 instance should return the correct result");
	});

	// Singleton2 test class instanceMethod2 instance method tests
	test("Singleton2.instanceMethod2 instance method defined", function() {
		var instance;

		expect(1);

		instance = Singleton2.getInstance();

		strictEqual(typeof(instance.instanceMethod2), "function", "Instances of Singleton2 should have the instanceMethod2 instance method defined");
	});

	test("Singleton2.instanceMethod2 instance method called", function() {
		var instance, arg, result;

		expect(1);

		instance = Singleton2.getInstance();

		arg = "test1";

		result = instance.instanceMethod2(arg);

		strictEqual(result, instance.instanceProperty1 + " - " + arg + " - " + instance.instanceProperty2 + " - " + arg, "The Singleton2.instanceMethod2 instance should return the correct result");
	});

	// Singleton2 test class classMethod1 class method tests
	test("Singleton2.classMethod1 class method defined", function() {
		expect(1);

		strictEqual(typeof(Singleton2.classMethod1), "function", "Singleton2 should have the classMethod1 class method defined");
	});

	test("Singleton2.classMethod1 class method called", function() {
		var arg, result;

		expect(1);

		arg = "test1";

		result = Singleton2.classMethod1(arg);

		strictEqual(result, "classMethod1" + " - " + arg, "The Singleton2.classMethod1 class method should return the correct result");
	});

	// Singleton2 test class classMethod2 class method tests
	test("Singleton2.classMethod2 class method defined", function() {
		expect(1);

		strictEqual(typeof(Singleton2.classMethod2), "function", "Singleton2 should have the classMethod2 class method defined");
	});

	test("Singleton2.classMethod2 class method called", function() {
		var arg, result;

		expect(1);

		arg = "test1";

		result = Singleton2.classMethod2(arg);

		strictEqual(result, Singleton1.classProperty1 + " - " + arg + " - " + Singleton2.classProperty2 + " - " + arg, "The Singleton2.classMethod2 class method should return the correct result");
	});

	// Prototype1 test class properties tests
	test("Prototype1 class properties", function() {
		expect(3);

		strictEqual(typeof(Prototype1), "function", "Prototype1 is defined as a class");
		strictEqual(Prototype1.className, "Prototype1", "The Prototype1.className class property is defined");
		strictEqual(Prototype1.classProperty1, "classValue1", "The Prototype1.classProperty1 class property is defined");
	});

	// Prototype1 test class getInstance method tests
	test("Prototype1.getInstance called with no params sets default properties on instance", function() {
		var instance;

		expect(6);

		instance = Prototype1.getInstance();

		ok(instance, "Prototype1.getInstance called with no params returns a defined value");
		strictEqual(typeof(instance), "object", "Prototype1.getInstance called with no params returns an instance");
		strictEqual(instance.instanceName.indexOf("Prototype1_instance_"), 0, "Prototype1.getInstance called with no params returns an instance with the default instanceName set");
		strictEqual(instance.className, "Prototype1", "Prototype1.getInstance called with no params returns an instance with the class name set");
		strictEqual(instance.clazz, Prototype1, "Prototype1.getInstance called with no params returns an instance with the class set");
		strictEqual(instance.instanceProperty1, "instanceValue1", "Prototype1.getInstance called with no params returns an instance with the instance property set");
	});

	test("Prototype1.getInstance called with empty params sets default properties on instance", function() {
		var instance;

		expect(6);

		instance = Prototype1.getInstance({}, false);

		ok(instance, "Prototype1.getInstance called with empty params returns a defined value");
		strictEqual(typeof(instance), "object", "Prototype1.getInstance called with empty params returns an instance");
		strictEqual(instance.instanceName.indexOf("Prototype1_instance_"), 0, "Prototype1.getInstance called with empty params returns an instance with the default instanceName set");
		strictEqual(instance.className, "Prototype1", "Prototype1.getInstance called with empty params returns an instance with the class name set");
		strictEqual(instance.clazz, Prototype1, "Prototype1.getInstance called with empty params returns an instance with the class set");
		strictEqual(instance.instanceProperty1, "instanceValue1", "Prototype1.getInstance called with empty params returns an instance with the instance property set");
	});

	test("Prototype1.getInstance called with instanceName param", function() {
		var instanceName, params, instance;

		expect(6);

		instanceName = "instance1";

		params = {
			"instanceName": instanceName
		};

		instance = Prototype1.getInstance(params, false);

		ok(instance, "Prototype1.getInstance called with instanceName param returns a defined value");
		strictEqual(typeof(instance), "object", "Prototype1.getInstance called with instanceName param returns an instance");
		strictEqual(instance.instanceName, instanceName, "Prototype1.getInstance called with instanceName param returns an instance with instanceName set");
		strictEqual(instance.className, "Prototype1", "Prototype1.getInstance called with instanceName param returns an instance with the class name set");
		strictEqual(instance.clazz, Prototype1, "Prototype1.getInstance called with instanceName param returns an instance with the class set");
		strictEqual(instance.instanceProperty1, "instanceValue1", "Prototype1.getInstance called with instanceName param returns an instance with the instance property set");
	});

	test("Prototype1.getInstance called with no initialization", function() {
		var instance;

		expect(7);

		instance = Prototype1.getInstance({}, false);

		ok(instance, "Prototype1.getInstance called with no initialization returns a defined value");
		strictEqual(typeof(instance), "object", "Prototype1.getInstance called with no initialization returns an instance");
		strictEqual(instance.instanceName.indexOf("Prototype1_instance_"), 0, "Prototype1.getInstance called with no initialization returns an instance with the default instanceName set");
		strictEqual(instance.className, "Prototype1", "Prototype1.getInstance called with no initialization returns an instance with the class name set");
		strictEqual(instance.clazz, Prototype1, "Prototype1.getInstance called with no initialization returns an instance with the class set");
		strictEqual(instance.initializedCount, 0, "Prototype1.getInstance called with no initialization does not initialize the instance");
		strictEqual(instance.instanceProperty1, "instanceValue1", "Prototype1.getInstance called with no initialization returns an instance with the instance property set");
	});

	test("Prototype1.getInstance called with initialization", function() {
		var instance;

		expect(7);

		instance = Prototype1.getInstance({}, true);

		ok(instance, "Prototype1.getInstance called with initialization returns a defined value");
		strictEqual(typeof(instance), "object", "Prototype1.getInstance called with initialization returns an instance");
		strictEqual(instance.instanceName.indexOf("Prototype1_instance_"), 0, "Prototype1.getInstance called with initialization returns an instance with the default instanceName set");
		strictEqual(instance.className, "Prototype1", "Prototype1.getInstance called with initialization returns an instance with the class name set");
		strictEqual(instance.clazz, Prototype1, "Prototype1.getInstance called with initialization returns an instance with the class set");
		strictEqual(instance.initializedCount, 1, "Prototype1.getInstance called with initialization initializes the instance");
		strictEqual(instance.instanceProperty1, "instanceValue1", "Prototype1.getInstance called with initialization returns an instance with the instance property set");
	});

	test("Prototype1.getInstance called twice", function() {
		var instance1, instance2;

		expect(16);

		instance1 = Prototype1.getInstance({}, true);
		instance2 = Prototype1.getInstance({}, true);

		ok(instance1 !== instance2, "Prototype1.getInstance called twice returns the distinct instances");
		ok(instance1, "Prototype1.getInstance called twice returns a defined value");
		ok(instance2, "Prototype1.getInstance called twice returns a defined value");
		strictEqual(typeof(instance1), "object", "Prototype1.getInstance called twice returns an instance");
		strictEqual(typeof(instance2), "object", "Prototype1.getInstance called twice returns an instance");
		strictEqual(instance1.instanceName.indexOf("Prototype1_instance_"), 0, "Prototype1.getInstance called twice returns an instance with the default instanceName set");
		strictEqual(instance2.instanceName.indexOf("Prototype1_instance_"), 0, "Prototype1.getInstance called twice returns an instance with the default instanceName set");
		ok(instance1.instanceName !== instance2.instanceName, "Prototype1.getInstance called twice returns the distinct instances");
		strictEqual(instance1.className, "Prototype1", "Prototype1.getInstance called twice returns an instance with the class name set");
		strictEqual(instance2.className, "Prototype1", "Prototype1.getInstance called twice returns an instance with the class name set");
		strictEqual(instance1.clazz, Prototype1, "Prototype1.getInstance called twice returns an instance with the class set");
		strictEqual(instance2.clazz, Prototype1, "Prototype1.getInstance called twice returns an instance with the class set");
		strictEqual(instance1.initializedCount, 1, "Prototype1.getInstance called twice only initializes the instance once");
		strictEqual(instance2.initializedCount, 1, "Prototype1.getInstance called twice only initializes the instance once");
		strictEqual(instance1.instanceProperty1, "instanceValue1", "Prototype1.getInstance called twice returns an instance with the instance property set");
		strictEqual(instance2.instanceProperty1, "instanceValue1", "Prototype1.getInstance called twice returns an instance with the instance property set");
	});

	// Prototype1 test class instanceMethod1 instance method tests
	test("Prototype1.instanceMethod1 instance method defined", function() {
		var instance;

		expect(1);

		instance = Prototype1.getInstance();

		strictEqual(typeof(instance.instanceMethod1), "function", "Instances of Prototype1 should have the instanceMethod1 instance method defined");
	});

	test("Prototype1.instanceMethod1 instance method called", function() {
		var instance, arg, result;

		expect(1);

		instance = Prototype1.getInstance();

		arg = "test1";

		result = instance.instanceMethod1(arg);

		strictEqual(result, "instanceMethod1" + " - " + arg, "The Prototype1.instanceMethod1 instance should return the correct result");
	});

	// Prototype1 test class instanceMethod2 instance method tests
	test("Prototype1.instanceMethod2 instance method defined", function() {
		var instance;

		expect(1);

		instance = Prototype1.getInstance();

		strictEqual(typeof(instance.instanceMethod2), "function", "Instances of Prototype1 should have the instanceMethod2 instance method defined");
	});

	test("Prototype1.instanceMethod2 instance method called", function() {
		var instance, arg, result;

		expect(1);

		instance = Prototype1.getInstance();

		arg = "test1";

		result = instance.instanceMethod2(arg);

		strictEqual(result, instance.instanceProperty1 + " - " + arg, "The Prototype1.instanceMethod2 instance should return the correct result");
	});

	// Prototype1 test class classMethod1 class method tests
	test("Prototype1.classMethod1 class method defined", function() {
		expect(1);

		strictEqual(typeof(Prototype1.classMethod1), "function", "Prototype1 should have the classMethod1 class method defined");
	});

	test("Prototype1.classMethod1 class method called", function() {
		var arg, result;

		expect(1);

		arg = "test1";

		result = Prototype1.classMethod1(arg);

		strictEqual(result, "classMethod1" + " - " + arg, "The Prototype1.classMethod1 class method should return the correct result");
	});

	// Prototype1 test class classMethod2 class method tests
	test("Prototype1.classMethod2 class method defined", function() {
		expect(1);

		strictEqual(typeof(Prototype1.classMethod2), "function", "Prototype1 should have the classMethod2 class method defined");
	});

	test("Prototype1.classMethod2 class method called", function() {
		var arg, result;

		expect(1);

		arg = "test1";

		result = Prototype1.classMethod2(arg);

		strictEqual(result, Prototype1.classProperty1 + " - " + arg, "The Prototype1.classMethod2 class method should return the correct result");
	});

	// Prototype2 test class properties tests
	test("Prototype2 class properties", function() {
		expect(4);

		strictEqual(typeof(Prototype2), "function", "Prototype2 is defined as a class");
		strictEqual(Prototype2.className, "Prototype2", "The Prototype2.className class property is defined");
		strictEqual(Prototype2.classProperty1, "classValue1", "The Prototype2.classProperty1 class property is defined");
		strictEqual(Prototype2.classProperty2, "classValue2", "The Prototype2.classProperty2 class property is defined");
	});

	// Prototype2 test class getInstance method tests
	test("Prototype2.getInstance called with no params sets default properties on instance", function() {
		var instance;

		expect(7);

		instance = Prototype2.getInstance();

		ok(instance, "Prototype2.getInstance called with no params returns a defined value");
		strictEqual(typeof(instance), "object", "Prototype2.getInstance called with no params returns an instance");
		strictEqual(instance.instanceName.indexOf("Prototype2_instance_"), 0, "Prototype2.getInstance called with no params returns an instance with the default instanceName set");
		strictEqual(instance.className, "Prototype2", "Prototype2.getInstance called with no params returns an instance with the class name set");
		strictEqual(instance.clazz, Prototype2, "Prototype2.getInstance called with no params returns an instance with the class set");
		strictEqual(instance.instanceProperty1, "instanceValue1", "Prototype2.getInstance called with no params returns an instance with the instance properties set");
		strictEqual(instance.instanceProperty2, "instanceValue2", "Prototype2.getInstance called with no params returns an instance with the instance properties set");
	});

	test("Prototype2.getInstance called with empty params sets default properties on instance", function() {
		var instance;

		expect(7);

		instance = Prototype2.getInstance({}, false);

		ok(instance, "Prototype2.getInstance called with empty params returns a defined value");
		strictEqual(typeof(instance), "object", "Prototype2.getInstance called with empty params returns an instance");
		strictEqual(instance.instanceName.indexOf("Prototype2_instance_"), 0, "Prototype2.getInstance called with empty params returns an instance with the default instanceName set");
		strictEqual(instance.className, "Prototype2", "Prototype2.getInstance called with empty params returns an instance with the class name set");
		strictEqual(instance.clazz, Prototype2, "Prototype2.getInstance called with empty params returns an instance with the class set");
		strictEqual(instance.instanceProperty1, "instanceValue1", "Prototype2.getInstance called with empty params returns an instance with the instance properties set");
		strictEqual(instance.instanceProperty2, "instanceValue2", "Prototype2.getInstance called with empty params returns an instance with the instance properties set");
	});

	test("Prototype2.getInstance called with instanceName param", function() {
		var instanceName, params, instance;

		expect(7);

		instanceName = "instance1";

		params = {
			"instanceName": instanceName
		};

		instance = Prototype2.getInstance(params, false);

		ok(instance, "Prototype2.getInstance called with instanceName param returns a defined value");
		strictEqual(typeof(instance), "object", "Prototype2.getInstance called with instanceName param returns an instance");
		strictEqual(instance.instanceName, instanceName, "Prototype2.getInstance called with instanceName param returns an instance with instanceName set");
		strictEqual(instance.className, "Prototype2", "Prototype2.getInstance called with instanceName param returns an instance with the class name set");
		strictEqual(instance.clazz, Prototype2, "Prototype2.getInstance called with instanceName param returns an instance with the class set");
		strictEqual(instance.instanceProperty1, "instanceValue1", "Prototype2.getInstance called with instanceName param returns an instance with the instance properties set");
		strictEqual(instance.instanceProperty2, "instanceValue2", "Prototype2.getInstance called with instanceName param returns an instance with the instance properties set");
	});

	test("Prototype2.getInstance called with no initialization", function() {
		var instance;

		expect(8);

		instance = Prototype2.getInstance({}, false);

		ok(instance, "Prototype2.getInstance called with no initialization returns a defined value");
		strictEqual(typeof(instance), "object", "Prototype2.getInstance called with no initialization returns an instance");
		strictEqual(instance.instanceName.indexOf("Prototype2_instance_"), 0, "Prototype2.getInstance called with no initialization returns an instance with the default instanceName set");
		strictEqual(instance.className, "Prototype2", "Prototype2.getInstance called with no initialization returns an instance with the class name set");
		strictEqual(instance.clazz, Prototype2, "Prototype2.getInstance called with no initialization returns an instance with the class set");
		strictEqual(instance.initializedCount, 0, "Prototype2.getInstance called with no initialization does not initialize the instance");
		strictEqual(instance.instanceProperty1, "instanceValue1", "Prototype2.getInstance called with no initialization returns an instance with the instance properties set");
		strictEqual(instance.instanceProperty2, "instanceValue2", "Prototype2.getInstance called with no initialization returns an instance with the instance properties set");
	});

	test("Prototype2.getInstance called with initialization", function() {
		var instance;

		expect(8);

		instance = Prototype2.getInstance({}, true);

		ok(instance, "Prototype2.getInstance called with initialization returns a defined value");
		strictEqual(typeof(instance), "object", "Prototype2.getInstance called with initialization returns an instance");
		strictEqual(instance.instanceName.indexOf("Prototype2_instance_"), 0, "Prototype2.getInstance called with initialization returns an instance with the default instanceName set");
		strictEqual(instance.className, "Prototype2", "Prototype2.getInstance called with initialization returns an instance with the class name set");
		strictEqual(instance.clazz, Prototype2, "Prototype2.getInstance called with initialization returns an instance with the class set");
		strictEqual(instance.initializedCount, 2, "Prototype2.getInstance called with initialization initializes the instance");
		strictEqual(instance.instanceProperty1, "instanceValue1", "Prototype2.getInstance called with initialization returns an instance with the instance properties set");
		strictEqual(instance.instanceProperty2, "instanceValue2", "Prototype2.getInstance called with initialization returns an instance with the instance properties set");
	});

	test("Prototype2.getInstance called with instanceProperty1 and instanceProperty2 param", function() {
		var instancePropertyValue1, instancePropertyValue2, params, instance;

		expect(8);

		instancePropertyValue1 = "test1";
		instancePropertyValue2 = "test2";

		params = {
			"instanceProperty1": instancePropertyValue1,
			"instanceProperty2": instancePropertyValue2
		};

		instance = Prototype2.getInstance(params, true);

		ok(instance, "Prototype2.getInstance called with instanceProperty1 and instanceProperty2 param returns a defined value");
		strictEqual(typeof(instance), "object", "Prototype2.getInstance called with instanceProperty1 and instanceProperty2 param returns an instance");
		strictEqual(instance.instanceName.indexOf("Prototype2_instance_"), 0, "Prototype2.getInstance called with instanceProperty1 and instanceProperty2 param returns an instance with the default instanceName set");
		strictEqual(instance.className, "Prototype2", "Prototype2.getInstance called with instanceProperty1 and instanceProperty2 param returns an instance with the class name set");
		strictEqual(instance.clazz, Prototype2, "Prototype2.getInstance called with instanceProperty1 and instanceProperty2 param returns an instance with the class set");
		strictEqual(instance.instanceProperty1, instancePropertyValue1, "Prototype2.getInstance called with instanceProperty1 and instanceProperty2 param returns an instance with the instanceProperty1 property set");
		strictEqual(instance.instanceProperty2, instancePropertyValue2, "Prototype2.getInstance called with instanceProperty1 and instanceProperty2 param returns an instance with the instanceProperty2 property set");
		strictEqual(instance.initializedCount, 2, "Prototype2.getInstance called with instanceProperty1 and instanceProperty2 param only initializes the instance once");
	});

	test("Prototype2.getInstance called twice", function() {
		var instance1, instance2;

		expect(18);

		instance1 = Prototype2.getInstance({}, true);
		instance2 = Prototype2.getInstance({}, true);

		ok(instance1 !== instance2, "Prototype2.getInstance called twice returns the distinct instances");
		ok(instance1, "Prototype2.getInstance called twice returns a defined value");
		ok(instance2, "Prototype2.getInstance called twice returns a defined value");
		strictEqual(typeof(instance1), "object", "Prototype2.getInstance called twice returns an instance");
		strictEqual(typeof(instance2), "object", "Prototype2.getInstance called twice returns an instance");
		strictEqual(instance1.instanceName.indexOf("Prototype2_instance_"), 0, "Prototype2.getInstance called twice returns an instance with the default instanceName set");
		strictEqual(instance2.instanceName.indexOf("Prototype2_instance_"), 0, "Prototype2.getInstance called twice returns an instance with the default instanceName set");
		ok(instance1.instanceName !== instance2.instanceName, "Prototype2.getInstance called twice returns the distinct instances");
		strictEqual(instance1.className, "Prototype2", "Prototype2.getInstance called twice returns an instance with the class name set");
		strictEqual(instance2.className, "Prototype2", "Prototype2.getInstance called twice returns an instance with the class name set");
		strictEqual(instance1.clazz, Prototype2, "Prototype2.getInstance called twice returns an instance with the class set");
		strictEqual(instance2.clazz, Prototype2, "Prototype2.getInstance called twice returns an instance with the class set");
		strictEqual(instance1.initializedCount, 2, "Prototype2.getInstance called twice only initializes the instance once");
		strictEqual(instance2.initializedCount, 2, "Prototype2.getInstance called twice only initializes the instance once");
		strictEqual(instance1.instanceProperty1, "instanceValue1", "Prototype2.getInstance called twice returns an instance with the instance properties set");
		strictEqual(instance2.instanceProperty1, "instanceValue1", "Prototype2.getInstance called twice returns an instance with the instance properties set");
		strictEqual(instance1.instanceProperty2, "instanceValue2", "Prototype2.getInstance called twice returns an instance with the instance properties set");
		strictEqual(instance2.instanceProperty2, "instanceValue2", "Prototype2.getInstance called twice returns an instance with the instance properties set");
	});

	// Prototype1 and Prototype2 test classes getInstance method tests
	test("Prototype1.getInstance and Prototype2.getInstance called", function() {
		var instance1, instance2;

		expect(15);

		instance1 = Prototype1.getInstance({}, true);
		instance2 = Prototype2.getInstance({}, true);

		ok(instance1, "Prototype1.getInstance and Prototype2.getInstance called returns a defined value");
		ok(instance2, "Prototype1.getInstance and Prototype2.getInstance called returns a defined value");
		strictEqual(typeof(instance1), "object", "Prototype1.getInstance and Prototype2.getInstance called returns an instance for Prototype1");
		strictEqual(typeof(instance2), "object", "Prototype1.getInstance and Prototype2.getInstance called returns an instance for Prototype2");
		strictEqual(instance1.instanceName.indexOf("Prototype1_instance_"), 0, "Prototype1.getInstance and Prototype2.getInstance called returns for Prototype1 an instance with the default instanceName set");
		strictEqual(instance2.instanceName.indexOf("Prototype2_instance_"), 0, "Prototype1.getInstance and Prototype2.getInstance called returns for Prototype2 an instance with the default instanceName set");
		strictEqual(instance1.className, "Prototype1", "Prototype1.getInstance and Prototype2.getInstance called returns an instance with the class name set for Prototype1");
		strictEqual(instance2.className, "Prototype2", "Prototype1.getInstance and Prototype2.getInstance called returns an instance with the class name set for Prototype2");
		strictEqual(instance1.clazz, Prototype1, "Prototype1.getInstance and Prototype2.getInstance called returns an instance with the class set for Prototype1");
		strictEqual(instance2.clazz, Prototype2, "Prototype1.getInstance and Prototype2.getInstance called returns an instance with the class set for Prototype2");
		strictEqual(instance1.initializedCount, 1, "Prototype1.getInstance and Prototype2.getInstance called only initializes the instance once for Prototype1");
		strictEqual(instance2.initializedCount, 2, "Prototype1.getInstance and Prototype2.getInstance called only initializes the instance once for Prototype2");
		strictEqual(instance1.instanceProperty1, "instanceValue1", "Prototype1.getInstance and Prototype2.getInstance called returns an instance with the instance property set for Prototype1");
		strictEqual(instance2.instanceProperty1, "instanceValue1", "Prototype1.getInstance and Prototype2.getInstance called returns an instance with the instance properties set for Prototype2");
		strictEqual(instance2.instanceProperty2, "instanceValue2", "Prototype1.getInstance and Prototype2.getInstance called returns an instance with the instance properties set for Prototype2");
	});

	// Prototype2 test class instanceMethod1 instance method tests
	test("Prototype2.instanceMethod1 instance method defined", function() {
		var instance;

		expect(1);

		instance = Prototype2.getInstance();

		strictEqual(typeof(instance.instanceMethod1), "function", "Instances of Prototype2 should have the instanceMethod1 instance method defined");
	});

	test("Prototype2.instanceMethod1 instance method called", function() {
		var instance, arg, result;

		expect(1);

		instance = Prototype2.getInstance();

		arg = "test1";

		result = instance.instanceMethod1(arg);

		strictEqual(result, "instanceMethod1" + " - " + arg, "The Prototype2.instanceMethod1 instance should return the correct result");
	});

	// Prototype2 test class instanceMethod2 instance method tests
	test("Prototype2.instanceMethod2 instance method defined", function() {
		var instance;

		expect(1);

		instance = Prototype2.getInstance();

		strictEqual(typeof(instance.instanceMethod2), "function", "Instances of Prototype2 should have the instanceMethod2 instance method defined");
	});

	test("Prototype2.instanceMethod2 instance method called", function() {
		var instance, arg, result;

		expect(1);

		instance = Prototype2.getInstance();

		arg = "test1";

		result = instance.instanceMethod2(arg);

		strictEqual(result, instance.instanceProperty1 + " - " + arg + " - " + instance.instanceProperty2 + " - " + arg, "The Prototype2.instanceMethod2 instance should return the correct result");
	});

	// Prototype2 test class classMethod1 class method tests
	test("Prototype2.classMethod1 class method defined", function() {
		expect(1);

		strictEqual(typeof(Prototype2.classMethod1), "function", "Prototype2 should have the classMethod1 class method defined");
	});

	test("Prototype2.classMethod1 class method called", function() {
		var arg, result;

		expect(1);

		arg = "test1";

		result = Prototype2.classMethod1(arg);

		strictEqual(result, "classMethod1" + " - " + arg, "The Prototype2.classMethod1 class method should return the correct result");
	});

	// Prototype2 test class classMethod2 class method tests
	test("Prototype2.classMethod2 class method defined", function() {
		expect(1);

		strictEqual(typeof(Prototype2.classMethod2), "function", "Prototype2 should have the classMethod2 class method defined");
	});

	test("Prototype2.classMethod2 class method called", function() {
		var arg, result;

		expect(1);

		arg = "test1";

		result = Prototype2.classMethod2(arg);

		strictEqual(result, Prototype2.classProperty1 + " - " + arg + " - " + Prototype2.classProperty2 + " - " + arg, "The Prototype2.classMethod2 class method should return the correct result");
	});

	// oj.oop.OjObject.extend method tests
	test("oj.oop.OjObject.extend method defined", function() {
		expect(1);

		strictEqual(typeof(oj.oop.OjObject.extend), "function", "oj.oop.OjObject.extend is a function");
	});

	test("oj.oop.OjObject.extend called with non defined values", function() {
		expect(10 * QUnit.oj.nonDefinedValues.length);

		$.each(QUnit.oj.nonDefinedValues, function(i, nonDefinedValue) {
			var subClass, instance;

			subClass = oj.oop.OjObject.extend(nonDefinedValue, nonDefinedValue, nonDefinedValue);

			strictEqual(typeof(subClass), "function", "oj.oop.OjObject.extend called with " + nonDefinedValue + " returns a defined subclass");
			ok(anonymousSubclassNameRegEx.test(subClass.className), "oj.oop.OjObject.extend called with " + nonDefinedValue + " returns a subclass with the class name set to a random value");
			strictEqual(typeof(subClass.getInstance), "function", "oj.oop.OjObject.extend called with " + nonDefinedValue + " returns a subclass with the getInstance method defined");
			strictEqual(typeof(subClass.extend), "function", "oj.oop.OjObject.extend called with " + nonDefinedValue + " returns a subclass with the extend method defined");

			instance = subClass.getInstance();

			ok(instance, "getInstance called on anonymous subclass of oj.oop.OjObject with " + nonDefinedValue + " returns a defined value");
			strictEqual(typeof(instance), "object", "getInstance called on anonymous subclass of oj.oop.OjObject with " + nonDefinedValue + " returns an instance");
			strictEqual(instance.instanceName.indexOf(subClass.className + "_instance_"), 0, "getInstance called on anonymous subclass of oj.oop.OjObject with " + nonDefinedValue + " returns an instance with the default instanceName set");
			strictEqual(instance.className, subClass.className, "getInstance called on anonymous subclass of oj.oop.OjObject with " + nonDefinedValue + " returns an instance with the class name set");
			strictEqual(instance.clazz, subClass, "getInstance called on anonymous subclass of oj.oop.OjObject with " + nonDefinedValue + " returns an instance with the class set");
			strictEqual(typeof(instance.init), "function", "getInstance called on anonymous subclass of oj.oop.OjObject with " + nonDefinedValue + " returns an instance with the init method defined");
		});
	});

	test("oj.oop.OjObject.extend called with defined values", function() {
		expect(10 * QUnit.oj.definedInstances.length);

		$.each(QUnit.oj.definedInstances, function(i, definedValue) {
			var subClass, instance;

			subClass = oj.oop.OjObject.extend(definedValue, definedValue, definedValue);

			strictEqual(typeof(subClass), "function", "oj.oop.OjObject.extend called with " + definedValue + " returns a defined subclass");
			ok(anonymousSubclassNameRegEx.test(subClass.className), "oj.oop.OjObject.extend called with " + definedValue + " returns a subclass with the class name set to a random value");
			strictEqual(typeof(subClass.getInstance), "function", "oj.oop.OjObject.extend called with " + definedValue + " returns a subclass with the getInstance method defined");
			strictEqual(typeof(subClass.extend), "function", "oj.oop.OjObject.extend called with " + definedValue + " returns a subclass with the extend method defined");

			instance = subClass.getInstance();

			ok(instance, "getInstance called on anonymous subclass of oj.oop.OjObject with " + definedValue + " returns a defined value");
			strictEqual(typeof(instance), "object", "getInstance called on anonymous subclass of oj.oop.OjObject with " + definedValue + " returns an instance");
			strictEqual(instance.instanceName.indexOf(subClass.className + "_instance_"), 0, "getInstance called on anonymous subclass of oj.oop.OjObject with " + definedValue + " returns an instance with the default instanceName set");
			strictEqual(instance.className, subClass.className, "getInstance called on anonymous subclass of oj.oop.OjObject with " + definedValue + " returns an instance with the class name set");
			strictEqual(instance.clazz, subClass, "getInstance called on anonymous subclass of oj.oop.OjObject with " + definedValue + " returns an instance with the class set");
			strictEqual(typeof(instance.init), "function", "getInstance called on anonymous subclass of oj.oop.OjObject with " + definedValue + " returns an instance with the init method defined");
		});
	});

	test("oj.oop.OjObject.extend called with empty params", function() {
		var subClass, instance;

		expect(10);

		subClass = oj.oop.OjObject.extend({}, {}, false);

		strictEqual(typeof(subClass), "function", "oj.oop.OjObject.extend called with empty params returns a defined subclass");
		ok(anonymousSubclassNameRegEx.test(subClass.className), "oj.oop.OjObject.extend called with empty params returns a subclass with the class name set to a random value");
		strictEqual(typeof(subClass.getInstance), "function", "oj.oop.OjObject.extend called with empty params returns a subclass with the getInstance method defined");
		strictEqual(typeof(subClass.extend), "function", "oj.oop.OjObject.extend called with empty params returns a subclass with the extend method defined");

		instance = subClass.getInstance();

		ok(instance, "getInstance called on anonymous subclass of oj.oop.OjObject with no params returns a defined value");
		strictEqual(typeof(instance), "object", "getInstance called on anonymous subclass of oj.oop.OjObject with no params returns an instance");
		strictEqual(instance.instanceName.indexOf(subClass.className + "_instance_"), 0, "getInstance called on anonymous subclass of oj.oop.OjObject with no params returns an instance with the default instanceName set");
		strictEqual(instance.className, subClass.className, "getInstance called on anonymous subclass of oj.oop.OjObject with no params returns an instance with the class name set");
		strictEqual(instance.clazz, subClass, "getInstance called on anonymous subclass of oj.oop.OjObject with no params returns an instance with the class set");
		strictEqual(typeof(instance.init), "function", "getInstance called on anonymous subclass of oj.oop.OjObject with no params returns an instance with the init method defined");
	});
});
