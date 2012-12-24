(function() {
	"use strict";

	var constructFromPrototype, extend, extendWrapper, Class;

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

		if ("function" === typeof (instance.construct)) {
			instance.construct.call(instance, params);
		}

		if (initialize && ("function" === typeof (instance.init))) {
			instance.init.call(instance, params);
		}

		return instance;
	};

	/**
	 * @private
	 */
	extend = function(instanceProperties, classProperties, singleton) {
		var superClass, propName = null, instancePropertiesClone = {}, classPropertiesClone = {},
			singletonClone = false, superClassPrototype, subClass, subClassPrototype, propValue;

		superClass = this;

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

		// Add any class properties in the super class not already in the class being currently defined to the class
		// properties.
		for (propName in superClass) {
			if (superClass.hasOwnProperty(propName) && !classPropertiesClone[propName]) {
				classPropertiesClone[propName] = superClass[propName];
			}
		}

		// Force the singleton argument to a Boolean if it isn't already.
		singletonClone = !!singleton;

		superClassPrototype = superClass.prototype;

		/**
		 * @private
		 */
		subClass = function() {};
		subClassPrototype = new superClass();

		// Copy the instance properties onto the sub class prototype.
		for (propName in instancePropertiesClone) {
			propValue = instancePropertiesClone[propName];
			subClassPrototype[propName] = propValue;
		}

		// Copy the class properties onto the sub class.
		for (propName in classPropertiesClone) {
			propValue = classPropertiesClone[propName];
			subClass[propName] = propValue;
		}

		/**
		 * @lends oj.Class2
		 * 
		 * Factory method that creates an instance of this class each time it is called.
		 * 
		 * @param {Object} params An associative array of instantiation properties. These are passed directly into the
		 *                        class constructor.
		 * @param {Boolean} initialize Determines whether or not to call the init method (if defined) on the newly
		 *                             created instance.
		 * 
		 * @returns {Object} A unique instance of this class.
		 */
		subClass.getInstance = (function() {
			var instance = null; // Cache the instance.  This is used for singletons and ignored for non-singletons.

			return function(params, initialize) {
				var instanceAlreadyExists = false, constructing = false;

				if (singletonClone) {
					instanceAlreadyExists = !!(instance || constructing);
				}

				if (!instanceAlreadyExists) {
					constructing = true;
					instance = constructFromPrototype(this, params, initialize);
					constructing = false;
				}

				return instance;
			};
		}());

		subClass.prototype = subClassPrototype;
		subClass.prototype.constructor = subClass;

		return subClass;
	};

	/**
	 * @private
	 */
	extendWrapper = function(instanceProperties, classProperties, singleton) {
		var superClass, subClass;

		superClass = this;

		subClass = extend.apply(superClass, [instanceProperties, classProperties, singleton]);
		subClass.extend = extend;

		return subClass;
	};

	/**
	 * @private
	 */
	Class = function() {};
	Class.extend = extendWrapper;
	
	/**
	 * @class
	 * 
	 * Base class to be extended by all classes in the system.
	 * 
	 * @requires oj.util
	 */
	oj.Class2 = Class.extend(
	/**
	 * @lends oj.Class2.prototype
	 */
	{
		/**
		 * @lends oj.Class2.prototype
		 * @property {Object} clazz A reference to the class definition of this instance.
		 */
		clazz: null,

		/**
		 * @lends oj.Class2.prototype
		 * @property {String} className The name of this class. Used for logging.
		 */
		className: null,

		/**
		 * @lends oj.Class2.prototype
		 * @property {String} instanceName The name of this instance. Used for logging.
		 */
		instanceName: null,

		/**
		 * Runs when a new instance of this class is constructed.
		 * 
		 * Sets the clazz instance property to the definition of the class being instantiated.
		 * 
		 * Sets the className instance property from the corresponding class property.
		 * 
		 * Sets the instanceName instance property from the specified parameters or sets a randomly generated value.
		 * 
		 * @param {Object} params An associative array of instantiation properties.<br />
		 *                        Optional params:<br />
		 *                        instanceName {String} The name of the instance for use in logging.
		 */
		construct: function(params) {
			this.clazz = this.constructor;
			this.className = this.constructor.className;
			this.instanceName = (params && params.instanceName) || oj.util.getUniqueId(this.className + "_instance_");
		},

		/**
		 * Empty default initialization method.
		 */
		init: function() {
		}
	}, {
		/**
		 * @lends oj.Class2
		 * @property {String} className The name of this class. Used for logging.
		 */
		className: "oj.Class2"
	});
}());
