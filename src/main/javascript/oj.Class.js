(function() {
	//"use strict";

	var Class, fnTest, constructFromPrototype, initializing;

	Class = function() {
		this._super = function() {};
	};

	fnTest = /xyz/.test(function() {xyz;}) ? /\b_super\b/ : /.*/;

	/**
	 * @private
	 * 
	 * Factory method that creates an instance of the specified class passing in the specified params to its
	 * constructor.  Optionally runs the init method (if defined) on the newly created instance.
	 * 
	 * @param {Function} clazz The definition of the class from which to create the instance.  The class definition must
	 *                         be a function type object with a prototype.
	 * @param {Object} params An associative array of instantiation properties. These are passed directly into the
	 *                        class constructor.
	 * @param {Boolean} initialize Determines whether or not to call the init method (if defined) on the newly created
	 *                             instance.
	 * 
	 * @returns {Object} An optionally initialized instance of the specified class.
	 */
	constructFromPrototype = function(clazz, params, initialize) {
		var instance;

		instance = new clazz(params);

		if (initialize && ("function" === typeof (instance.init))) {
			instance.init.call(instance, params);
		}

		return instance;
	};
debugger;
	Class.extend = function(instanceProperties, classProperties, singleton) {
		var _super, _prototype, propName = null, instancePropertiesClone = {}, classPropertiesClone = {},
			singletonClone, propValue, overrideFunction;

		_super = this.prototype;

		initializing = true;
		_prototype = new this();
		initializing = false;

		debugger;

		// Clone the instanceProperties argument so the original value does not get altered.
		for (propName in instanceProperties) {
			if (instanceProperties.hasOwnProperty(propName)) {
				instancePropertiesClone[propName] = instanceProperties[propName]; 
			}
		}

		// Clone the classProperties argument so the original value does not get altered.
		for (propName in classProperties) {
			if (classProperties.hasOwnProperty(propName)) {
				classPropertiesClone[propName] = classProperties[propName]; 
			}
		}

		// Force the singleton argument to a Boolean if it isn't already.
		singletonClone = !!singleton;

		// Copy the instance properties onto the super class.
		for (propName in instancePropertiesClone) {
			propValue = instancePropertiesClone[propName];

			_prototype[propName] = propValue; 

			// Check if we're overwriting an existing function
			overrideFunction = ("function" === typeof propValue)
				&& ("function" === typeof _super[propName])
				&& fnTest.test(propValue);

			if (overrideFunction) {
				_prototype[propName] = (function(propName, fn) {
					return function() {
						var tmp, ret;

						tmp = this._super;

						// Add a new ._super() method that is the same method but on the super-class
						this._super = _super[propName];

						// The method only need to be bound temporarily, so we remove it when we're done executing
						ret = fn.apply(this, arguments);
						this._super = tmp;

						return ret;
					};
				})(propName, propValue);
			}
		}

		debugger;
		// The dummy class constructor
		function Class() {
			// All construction is actually done in the init method
			debugger;
			if (!initializing) {
				if (this.construct) {
					this.construct.apply(this, arguments);
				}

				if (this.init) {
					this.init.apply(this, arguments);
				}
			}
		}

		// Copy the class properties onto the currently being defined class.
		for (propName in classPropertiesClone) {
			propValue = classPropertiesClone[propName];

			Class[propName] = propValue;
		}

		// Populate our constructed prototype object
		Class.prototype = _prototype;

		// Enforce the constructor to be what we expect
		Class.prototype.constructor = Class;

		// And make this class extendable
		Class.extend = arguments.callee;

		return Class;
	};
	
	/**
	 * @class
	 * 
	 * Base class to be extended by all classes in the system.
	 * 
	 * @requires oj.util
	 */
	oj.Class = Class;
}());
