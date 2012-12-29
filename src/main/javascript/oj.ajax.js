(function(context) {
	"use strict";

	var POST_REG_EXP, XML_CONTENT_TYPE_REG_EXP, JSON_CONTENT_TYPE_REG_EXP, NOT_BLANK_REG_EXP, PREVENT_CACHE_PARAM_NAME,
		getXhr, getQueryStringFromParams, setQueryStringOnUrl, getJSONResponse, getXMLResponse, handleResponse;

	POST_REG_EXP = /^\s*POST\s*$/i;
	XML_CONTENT_TYPE_REG_EXP = /xml/i;
	JSON_CONTENT_TYPE_REG_EXP = /json/i;
	NOT_BLANK_REG_EXP = /\S/;
	PREVENT_CACHE_PARAM_NAME = "ojPreventCache";

	/**
	 * @private
	 */
	getXhr = function() {
		var xhr;

		xhr = null;

		if (context.XMLHttpRequest) {
			// Mozilla, IE7+, Safari and Opera.
			xhr = new XMLHttpRequest();
		} else if (context.ActiveXObject) {
			// IE 6.
			try {
				xhr = new ActiveXObject("Msxml2.XMLHTTP");
			} catch (e1) {
				try {
					xhr = new ActiveXObject("Microsoft.XMLHTTP");
				} catch (e2) {
					throw(new Error("Could not get an XMLHTTP instance."));
				}
			}
		}

		return xhr;
	};

	/**
	 * @private
	 */
	getQueryStringFromParams = function(params) {
		var queryString, queryStringArray, name = null, value;

		queryString = null;

		queryStringArray = [];
		if(oj.util.isObject(params)) {
			for (name in params) {
				if (params.hasOwnProperty(name)) {
					value = params[name];
					queryStringArray.push(encodeURIComponent(name) + "=" + encodeURIComponent(value));
				}
			}
		}

		if (queryStringArray.length > 0) {
			queryString = queryStringArray.join("&");
		}

		return queryString;
	};

	/**
	 * @private
	 */
	setQueryStringOnUrl = function(url, queryString) {
		var newURL;

		newURL = null;

		if ("string" === typeof(url)) {
			newURL = url.toString();
			if (queryString && NOT_BLANK_REG_EXP.test(queryString)) {
				if (newURL.indexOf("?") > -1) {
					newURL += "&";
				} else {
					newURL += "?";
				}
				newURL += queryString;
			}
		}

		return newURL;
	};

	/**
	 * @private
	 */
	getJSONResponse = function(json) {
		var obj;

		if ( context.JSON && context.JSON.parse ) {
			obj = context.JSON.parse(json);
		} else {
			obj = eval("(" + json + ")");
		}

		return obj;
	};

	/**
	 * @private
	 */
	getXMLResponse = function(xml) {
		return xml;
	};

	/**
	 * @private
	 */
	handleResponse = function(xhr, successCallback, errorCallback, timeoutRef) {
		var response, contentType, responseContent = null, statusCode = null, callback;

		// Only check the status if the readyState is complete.
		if (4 === xhr.readyState) {
			if (!isNaN(parseFloat(timeoutRef))) {
				clearTimeout(timeoutRef);
			}

			// Only set the success return value and call the success callback if the HTTP status indicated a successful
			// request.
			if (((xhr.status >= 200) && (xhr.status < 300)) || 304 === xhr.status) {
				// Successful request.
				// Set the return value according to the content type.
				contentType = xhr.getResponseHeader("Content-type");
				if (XML_CONTENT_TYPE_REG_EXP.test(contentType)) {
					responseContent = getXMLResponse(xhr.responseXML);
				} else if (JSON_CONTENT_TYPE_REG_EXP.test(contentType)) {
					responseContent = getJSONResponse(xhr.responseText);
				} else if (NOT_BLANK_REG_EXP.test(xhr.responseText)) {
					responseContent = xhr.responseText;
				}

				callback = successCallback;
			} else {
				// Unsuccessful request.
				// Set the return value to the response text.
				responseContent = xhr.responseText;

				callback = errorCallback;
			}

			statusCode = xhr.status;

			// If either a success or an error callback was set call it.
			if (callback) {
				callback.call(null, responseContent, statusCode, xhr);
			}
		}

		response = {
			"content": responseContent,
			"status": statusCode,
			"xhr": xhr
		};

		return response;
	};

	/**
	 * @namespace
	 * 
	 * Utility methods for Ajax calls.
	 */
	oj.ajax = {
		doRequest: function(args) {
			var method, url, data, asynchronous, preventCache, successCallback, errorCallback, timeout, timeoutCallback,
				initialErrorMessage, errorMessage, response, isPost, xhr, timeoutRef, requestAborted, timeoutWrapper,
				preventCacheParam;

			// Initialize error message.
			initialErrorMessage = "oj.ajax.doRequest():\n";
			errorMessage = initialErrorMessage;

			// If the arguments are not set throw an exception since nothing else can be done.
			if (!args) {
				errorMessage += "  The method argument must be a non-blank string.";
				throw(new Error(errorMessage));
			}

			method = args.method || "GET";
			url = args.url;
			data = args.data || null;
			asynchronous = ("undefined" === typeof(args.asynchronous)) ? true : !!args.asynchronous;
			preventCache = ("undefined" === typeof(args.preventCache)) ? true : !!args.preventCache;
			successCallback = args.successCallback;
			errorCallback = args.errorCallback;
			timeout = args.timeout;
			timeoutCallback = args.timeoutCallback;

			// Check required arguments.
			if (!method || !NOT_BLANK_REG_EXP.test(method)) {
				errorMessage += "  The method argument must be a non-blank string.\n";
		    }

			if (!url || !NOT_BLANK_REG_EXP.test(url)) {
				errorMessage += "  The url argument must be a non-blank string.\n";
		    }

			// Check the optional arguments.
			if ((successCallback || !NOT_BLANK_REG_EXP.test(successCallback)) && ("function" !== typeof(successCallback))) {
				errorMessage += "  If the successCallback argument is set it must be a function.\n";
		    }

			if ((errorCallback || !NOT_BLANK_REG_EXP.test(errorCallback)) && ("function" !== typeof(errorCallback))) {
				errorMessage += "  If the errorCallback argument is set it must be a function.\n";
		    }

			if (timeout && (isNaN(parseFloat(timeout)))) {
				errorMessage += "  If the timeout argument is set it must be a number.\n";
		    }

			if ((timeoutCallback || !NOT_BLANK_REG_EXP.test(timeoutCallback)) && ("function" !== typeof(timeoutCallback))) {
				errorMessage += "  If the timeoutCallback argument is set it must be a function.\n";
		    }

			if (!isNaN(parseFloat(timeout)) && (timeout > 0) && !asynchronous) {
				errorMessage += "  Can't abort a synchronous request.\n";
			}

			// Throw an exception if any of the arguments are invalid.
			if (errorMessage !== initialErrorMessage) {
				throw(new Error(errorMessage));
			}

			// The arguments are valid.  Make the request.
			response = null;

			isPost = POST_REG_EXP.test(method);

			xhr = getXhr();

			// Set a timeout interval to abort the request if the timeout period has been set.
			timeoutRef = null;
			requestAborted = false;
			if (!isNaN(parseFloat(timeout)) && (timeout > 0)) {
				/** @ignore */
				timeoutWrapper = function() {
					xhr.onreadystatechange = function() {};
					xhr.abort();
					requestAborted = true;
					if (timeoutCallback) {
						timeoutCallback.call(null, xhr);
					}
				};
				timeoutRef = setTimeout(timeoutWrapper, timeout);
			}

			if (asynchronous) {
				// Set the handler for readystatechange events to the handleResponse method and pass in the success and
				// error callback methods.
				xhr.onreadystatechange = function() {
					handleResponse(xhr, successCallback, errorCallback, timeoutRef);
				};
			}

			// Add a unique value to the url of the request if it is specified to prevent caching.
			if (preventCache) {
				preventCacheParam = PREVENT_CACHE_PARAM_NAME + "=" + oj.util.getUniqueId();
				url = setQueryStringOnUrl(url, preventCacheParam);
			}

			// Perform the request.
			xhr.open(method, url, asynchronous);
			if (isPost) {
				// Set the application/x-www-form-urlencoded request header for a POST.
				xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
			}
			xhr.send(data);

			if (!asynchronous && !requestAborted) {
				// For a synchronous request get the response directly from the handleResponse method.  The success or
				// error callbacks may still be called in they are defined.
				response = handleResponse(xhr, successCallback, errorCallback, timeoutRef);
			}

			return response;
		},

		doGet: function(args) {
			var queryString, urlWithQueryString;

			queryString = getQueryStringFromParams(args.params);

			urlWithQueryString = setQueryStringOnUrl(args.url, queryString);

			args.method = "GET";
			args.url = urlWithQueryString;
			args.data = null;

			return this.doRequest(args);
		},

		doPost: function(args) {
			var queryString;

			queryString = getQueryStringFromParams(args.params);

			args.method = "POST";
			args.data = queryString;

			return this.doRequest(args);
		},

		doPut: function(args) {
			var queryString, urlWithQueryString;

			queryString = getQueryStringFromParams(args.params);

			urlWithQueryString = setQueryStringOnUrl(args.url, queryString);

			args.method = "PUT";
			args.url = urlWithQueryString;
			args.data = null;

			return this.doRequest(args);
		},

		doDelete: function(args) {
			var queryString, urlWithQueryString;

			queryString = getQueryStringFromParams(args.params);

			urlWithQueryString = setQueryStringOnUrl(args.url, queryString);

			args.method = "DELETE";
			args.url = urlWithQueryString;
			args.data = null;

			return this.doRequest(args);
		}
	};
}(this));
