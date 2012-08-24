(function(context) {
	"use strict";

	var topNamespace, validNamespace, oj;

	// The top level namespace of the OddJob JavaScript library.
	topNamespace = "oj";

	// A regular expression for valid namespaces.
	validNamespace = /^([\$a-z]+[a-z0-9]?)+(\.[a-z]+[a-z0-9]?)*$/i;

	/**
	 * @namespace
	 * 
	 * The top level namespace of the OddJob JavaScript library.
	 */
	oj = {
		/**
		 * Creates an hierarchy of objects according to the specified namespace input.  Only parts of the heirarchy that
		 * do not already exist will be created.
		 * 
		 * Example: "com.example.myapp" will result in the following hierarchy of objects defined in the specified
		 * context: com, com.example, com.example.myapp.  If the com.example object aleady exists then only the
		 * com.example.myapp object will be created and other properties of com and com.example will not be affected.
		 * 
		 * Properties, methods and classes can then be assigned anywhere in the hierarchy to simulate namespacing.
		 * 
		 * @param {String} namespaceInput A dot separated string of namespace levels.
		 * 
		 * @returns {Object} Returns the hierarchy of objects according to the specified namespace input.
		 * 
		 * @throws {Error} Throws an exception if the namespaceInput parameter is not a string of the form
		 *                 level1.level2.level3... where each level must be of the form /[a-z]+[a-z0-9]?/ (the top level
		 *                 may optionally start with $).
		 */
		namespace: function(namespaceInput) {
			var initialErrorMessage, errorMessage, namespaceLevels, namespaceHierarchy, i, namespaceLevel;

			// Initialize error message.
			initialErrorMessage = topNamespace + ".namespace():\n";
			errorMessage = initialErrorMessage;

			// Check argument.
			if (!validNamespace.test(namespaceInput)) {
				errorMessage += "The namespace input must be a string of the form  level1.level2.level3...where each " +
								"level is of the form /[a-z]+[a-z0-9]?/i.\nThe input was " + namespaceInput + ".";
			}

			// If the argument is valid create the namespace.
			if (errorMessage === initialErrorMessage) {
				namespaceLevels = namespaceInput.split(".");
				namespaceHierarchy = context;
				for ( i = 0; i < namespaceLevels.length; i++) {
					namespaceLevel = namespaceLevels[i];
					if ("undefined" === typeof (namespaceHierarchy[namespaceLevel])) {
						namespaceHierarchy[namespaceLevel] = {};
					}
					namespaceHierarchy = namespaceHierarchy[namespaceLevel];
				}
				return namespaceHierarchy;
			}

			// Throw an exception if there were any errors.
			if (errorMessage !== initialErrorMessage) {
				throw new Error(errorMessage);
			}
		}
	};

	// Set the OddJob JavaScript library to the top level namespace on the context in which this is run.
	context[topNamespace] = oj;

}(this));

