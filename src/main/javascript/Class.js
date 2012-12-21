(function() {
	var initializing = false, fnTest;

	fnTest = /xyz/.test(function() {xyz;}) ? /\b_super\b/ : /.*/;

	// The base Class implementation (does nothing)
	this.Class = function() {};

	// Create a new Class that inherits from this class
	Class.extend = function(instanceProperties) {
		var _super, prototype, overrideProperty;

		_super = this.prototype;

		// Instantiate a base class (but only create the instance, don't run the init constructor)
		initializing = true;
		prototype = new this();
		initializing = false;

		// Copy the properties over onto the new prototype
		for ( var name in instanceProperties) {
			// Check if we're overwriting an existing function
			overrideProperty = ("function" === typeof instanceProperties[name])
					&& ("function" === typeof _super[name])
					&& fnTest.test(instanceProperties[name]);

			prototype[name] = overrideProperty ? (function(name, fn) {
				return function() {
					var tmp, ret;

					tmp = this._super;

					// Add a new ._super() method that is the same method but on the super-class
					this._super = _super[name];

					// The method only need to be bound temporarily, so we remove it when we're done executing
					ret = fn.apply(this, arguments);
					this._super = tmp;

					return ret;
				};
			})(name, instanceProperties[name]) : instanceProperties[name];
		}

		// The dummy class constructor
		function Class() {
			// All construction is actually done in the init method
			if (!initializing && this.init) {
				this.init.apply(this, arguments);
			}
		}

		// Populate our constructed prototype object
		Class.prototype = prototype;

		// Enforce the constructor to be what we expect
		Class.prototype.constructor = Class;

		// And make this class extendable
		Class.extend = arguments.callee;

		return Class;
	};
})();
