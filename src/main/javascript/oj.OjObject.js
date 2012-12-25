(function() {
	"use strict";

	var functionCallsSuperRegExp, constructFromPrototype, extend, Class;

	// Define a regular expression for determining whether or not the definition of a function contains "_super".  Falls
	// back to a regular expression that always evaluates to true if the toString method of the function does not return
	// its definition.
	functionCallsSuperRegExp = /xyz/.test(function() {xyz;}) ? /\b_super\b/ : /.*/;

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

		instance = new clazz();

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
	 * 
	 * Allows for the definition of new classes with the specified instance and class level properties and for singleton
	 * class defintions.  Instance and class level properties will be inherited from the class on which the extend
	 * method is run.
	 * 
	 * @param {String} instanceProperties The instance properties for the class being defined.  If this is not an object
	 *                                    an empty object will be used in its place.
	 * @param {String} classProperties The class (static-like) properties for the class being defined..  If this is not
	 *                                 an object an empty object will be used in its place.
	 * @param {Boolean} singleton Whether or not the class should be a singleton.  This is treated as "truthy".
	 * 
	 * @return {Function} Returns the newly defined class.
	 */
	extend = function(instanceProperties, classProperties, singleton) {
		var superClass, propName = null, instancePropertiesClone = {}, classPropertiesClone = {},
			singletonClone = false, superClassPrototype, subClass, subClassPrototype, propValue,
			overridingFunctionCallsSuper;

		// The context in which this method is run is considered the superclass.
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

		// Force the singleton argument to a Boolean if it isn't already.
		singletonClone = !!singleton;

		// If a class name was not set in the class properties set a random one based on the superclass name.
		if (!classPropertiesClone.className) {
			classPropertiesClone.className = oj.util.getUniqueId(superClass.className + "_subclass_");
		}

		// Add any class properties in the super class not already in the class being currently defined to the class
		// properties.
		for (propName in superClass) {
			if (superClass.hasOwnProperty(propName) && !classPropertiesClone[propName]) {
				classPropertiesClone[propName] = superClass[propName];
			}
		}

		// Get a reference to the superclass prototype.
		superClassPrototype = superClass.prototype;

		/**
		 * @private
		 * 
		 * Start off the subclass as an empty class.
		 */
		subClass = function() {};

		// Start off the subclass prototype definition from the superclass.
		subClassPrototype = new superClass();

		// Copy the instance properties onto the subclass prototype.
		for (propName in instancePropertiesClone) {
			propValue = instancePropertiesClone[propName];

			// Check if the property value is a function with a call to the superclass function it is overriding.
			overridingFunctionCallsSuper = ("function" === typeof propValue)
				&& ("function" === typeof superClassPrototype[propName])
				&& functionCallsSuperRegExp.test(propValue);

			if (overridingFunctionCallsSuper) {
				// The property value is a function with a call to the superclass function it is overriding.  Assign the
				// subclass to a wrapper function that handles the call to the overridden method.
				subClassPrototype[propName] = (function(propName, overridingFunction) {
					return function() {
						var instance, tmp, returnValue;

						// Get a reference to the current instance upon which the overriding method is being called.
						instance = this;

						// If there is a _super method on the current instance save it.
						tmp = instance._super;
						
						// Decorate the current instance with a method called _super that points to the overridden
						// method on the superclass. 
						instance._super = superClassPrototype[propName];

						// Execute the overridden method in the context of the decorated current instance.
						returnValue = overridingFunction.apply(instance, arguments);

						// Restore the original _super method (if there was one) on the current instance.
						instance._super = tmp;

						return returnValue;
					};
				}(propName, propValue));
			} else {
				subClassPrototype[propName] = propValue;	
			}
		}

		// Copy the class properties onto the subclass.
		for (propName in classPropertiesClone) {
			propValue = classPropertiesClone[propName];
			subClass[propName] = propValue;
		}

		// Add a reference on the subclass to the superclass.
		subClass._super = superClass;

		// Define the getInstance method definition to allow for singleton class definition.  Use the memoization
		// pattern to keep track of whether or not the class being defined has already been instantiated in the case of
		// a singleton class definition.  For non-singleton class definitions, the private constructFromPrototype method
		// is called directly.
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

		// Set the prototype and constructor of the subclass.
		subClass.prototype = subClassPrototype;
		subClass.prototype.constructor = subClass;

		return subClass;
	};

	/**
	 * @private
	 * 
	 * Create an initial empty class context in which to first run the extend method. 
	 */
	Class = function() {};
	Class.extend = extend;
	
	/**
	 * @class
	 * 
	 * Base class to be extended by all classes in the system.
	 * 
	 * @requires oj.util
	 */
	oj.OjObject = Class.extend(
	/**
	 * @lends oj.OjObject.prototype
	 */
	{
		/**
		 * @lends oj.OjObject.prototype
		 * @property {Object} clazz A reference to the class definition of this instance.
		 */
		clazz: null,

		/**
		 * @lends oj.OjObject.prototype
		 * @property {String} className The name of this class. Used for logging.
		 */
		className: null,

		/**
		 * @lends oj.OjObject.prototype
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
		 * @lends oj.OjObject
		 * @property {String} className The name of this class. Used for logging.
		 */
		className: "oj.OjObject",

		/**
		 * Factory method that creates an instance of this class each time it is called.
		 * 
		 * @param {Object} params An associative array of instantiation properties. These are passed directly into the
		 *                        class constructor.
		 * @param {Boolean} initialize Determines whether or not to call the init method (if defined) on the newly
		 *                             created instance.
		 * 
		 * @returns {Object} A unique instance of this class.
		 */
		getInstance: function(params, initialize) {
			return constructFromPrototype(this, params, initialize);
		}
	});

	/**
	 * Allows for the definition of new classes with the specified instance and class level properties and for singleton
	 * class defintions.  The newly defined class will also have the extend method for further subclassing.  Instance
	 * and class level properties will be inherited from the class on which the extend method is run.
	 * 
	 * @param {String} instanceProperties The instance properties for the class being defined.  If this is not an object
	 *                                    an empty object will be used in its place.
	 * @param {String} classProperties The class (static-like) properties for the class being defined..  If this is not
	 *                                 an object an empty object will be used in its place.
	 * @param {Boolean} singleton Whether or not the class should be a singleton.  This is treated as "truthy".
	 * 
	 * @return {Function} Returns the newly defined class.
	 */
	oj.OjObject.extend = function(instanceProperties, classProperties, singleton) {
		var superClass, subClass;

		superClass = this;

		subClass = extend.apply(superClass, [instanceProperties, classProperties, singleton]);
		subClass.extend = extend;

		return subClass;
	};
}());
