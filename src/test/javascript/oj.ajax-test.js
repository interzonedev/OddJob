$(function() {
	var xmlDocumentTypeRegExp, ajaxTestServletQueryStringParamName, ajaxTestServletQueryStringParamValue,
		ajaxTestServletUrl, ajaxTestServletParamName, ajaxTestServletParamValue, ajaxTestServletParams,
		preventCacheQueryStringParamName, htmlResponseContainsMethod, htmlResponseContainsParameter,
		htmlResponseContainsParameterAndValue, xmlResponseContainsMethod, xmlResponseContainsParameter,
		xmlResponseContainsParameterAndValue;

	module("oj.ajax");

	xmlDocumentTypeRegExp = /^\[object (XML)?Document\]$/;

	ajaxTestServletQueryStringParamName = "queryName1";
	ajaxTestServletQueryStringParamValue = "queryValue1";
	ajaxTestServletUrl = "/oddjob/ajaxTest?" + ajaxTestServletQueryStringParamName + "=" + ajaxTestServletQueryStringParamValue;

	ajaxTestServletParamName = "paramName1";
	ajaxTestServletParamValue = "paramValue1";
	ajaxTestServletParams = {};
	ajaxTestServletParams[ajaxTestServletParamName] = ajaxTestServletParamValue;

	preventCacheQueryStringParamName = "ojPreventCache";

	htmlResponseContainsMethod = function(response, method) {
		var htmlMethodRegExp, result;

		htmlMethodRegExp = new RegExp("<div id=\"method\">" + method + "</div>");

		result = htmlMethodRegExp.test(response);

		return result;
	};

	htmlResponseContainsParameter = function(response, parameterName) {
		var htmlParameterRegExp, result;

		htmlParameterRegExp = new RegExp("<dl id=\"parameters\">.*<dt>" + parameterName + "</dt><dd>.*</dd>(<dt>.*</dt><dd>.*</dd>)*</dl>");

		result = htmlParameterRegExp.test(response);

		return result;
	};

	htmlResponseContainsParameterAndValue = function(response, parameterName, parameterValue) {
		var htmlParameterAndValueRegExp, result;

		htmlParameterAndValueRegExp = new RegExp("<dl id=\"parameters\">.*<dt>" + parameterName + "</dt><dd>" + parameterValue + "</dd>(<dt>.*</dt><dd>.*</dd>)*</dl>");

		result = htmlParameterAndValueRegExp.test(response);

		return result;
	};

	xmlResponseContainsMethod = function(xmlDocument, method) {
		var docAsJson, result;

		docAsJson = $.xml2json(xmlDocument);

		result = (method === docAsJson.method);

		return result;
	};

	xmlResponseContainsParameter = function(xmlDocument, parameterName) {
		var docAsJson, result;

		docAsJson = $.xml2json(xmlDocument);

		result = false;

		$.each(docAsJson.parameters.parameter, function(i, parameter) {
			if (parameterName === parameter.name) {
				result = true;
			}
		});

		return result;
	};

	xmlResponseContainsParameterAndValue = function(xmlDocument, parameterName, parameterValue) {
		var docAsJson, result;

		docAsJson = $.xml2json(xmlDocument);

		result = false;

		$.each(docAsJson.parameters.parameter, function(i, parameter) {
			if ((parameterName === parameter.name) && (parameterValue === parameter.values.value)) {
				result = true;
			}
		});

		return result;
	};

	// oj.ajax object tests
	test("oj.ajax object defined", function() {
		expect(2);

		ok(oj.ajax, "oj.ajax object defined");
		strictEqual(typeof(oj.ajax), "object", "oj.ajax is an object");
	});

	// oj.ajax.doRequest method tests
	test("oj.ajax.doRequest function defined", function() {
		expect(1);

		strictEqual(typeof(oj.ajax.doRequest), "function", "oj.ajax.doRequest is a function");
	});

	asyncTest("oj.ajax.doRequest function asynchronous default parameters", function() {
		var synchronousResponse;

		expect(10);

		synchronousResponse = oj.ajax.doRequest({
			url: ajaxTestServletUrl,
			successCallback: function(response, status, xhr) {
				strictEqual(status, 200, "oj.ajax.doRequest asynchronous default parameters returns 200 status");
				ok(response, "oj.ajax.doRequest asynchronous default parameters returns content");
				strictEqual(typeof(response), "string", "oj.ajax.doRequest asynchronous default parameters returns a string");
				ok(htmlResponseContainsMethod(response, "get"), "oj.ajax.doRequest asynchronous default parameters returns the correct method");
				ok(htmlResponseContainsParameter(response, preventCacheQueryStringParamName), "oj.ajax.doRequest asynchronous default parameters prevents caching");
				ok(htmlResponseContainsParameterAndValue(response, ajaxTestServletQueryStringParamName, ajaxTestServletQueryStringParamValue), "oj.ajax.doRequest asynchronous default parameters returns the test query string params");
				ok(xhr, "oj.ajax.doRequest asynchronous default parameters returns the XHR object");
				strictEqual(typeof(xhr), "object", "oj.ajax.doRequest asynchronous default parameters returns the XHR object");
				strictEqual(xhr.status, 200, "oj.ajax.doRequest asynchronous default parameters returns the XHR object");

				start();
			},
			errorCallback: function(response, status, xhr) {
				ok(false, "oj.ajax.doRequest asynchronous default parameters should not call the error callback ");
				start();
			}
		});

		strictEqual(synchronousResponse, null, "oj.ajax.doRequest asynchronous default parameters returns null");
	});

	// oj.ajax.doGet method tests
	test("oj.ajax.doGet function defined", function() {
		expect(1);

		strictEqual(typeof(oj.ajax.doGet), "function", "oj.ajax.doGet is a function");
	});

	// oj.ajax.doGet method with HTML content type tests
	test("oj.ajax.doGet function synchronous HTML content type", function() {
		var params, response;

		expect(12);

		params = $.extend(true, {
			"type": "html"
		}, ajaxTestServletParams);

		response = oj.ajax.doGet({
			url: ajaxTestServletUrl,
			params: params,
			asynchronous: false,
			preventCache: true
		});

		strictEqual(response.status, 200, "oj.ajax.doGet synchronous HTML content type returns 200 status");
		strictEqual(typeof(response), "object", "oj.ajax.doGet synchronous HTML content type returns an object");
		ok(response.content, "oj.ajax.doGet synchronous HTML content type returns content");
		strictEqual(typeof(response.content), "string", "oj.ajax.doGet synchronous HTML content type returns a string for content");
		ok(htmlResponseContainsMethod(response.content, "get"), "oj.ajax.doGet synchronous HTML content type returns the correct method");
		ok(htmlResponseContainsParameter(response.content, preventCacheQueryStringParamName), "oj.ajax.doGet synchronous HTML content type prevents caching");
		ok(htmlResponseContainsParameterAndValue(response.content, ajaxTestServletQueryStringParamName, ajaxTestServletQueryStringParamValue), "oj.ajax.doGet synchronous HTML content type returns the test query string params");
		ok(htmlResponseContainsParameterAndValue(response.content, "type", "html"), "oj.ajax.doGet synchronous HTML content type returns the content type params");
		ok(htmlResponseContainsParameterAndValue(response.content, ajaxTestServletParamName, ajaxTestServletParamValue), "oj.ajax.doGet synchronous HTML content type returns the test params");
		ok(response.xhr, "oj.ajax.doGet synchronous HTML content type returns the XHR object");
		strictEqual(typeof(response.xhr), "object", "oj.ajax.doGet synchronous HTML content type returns the XHR object");
		strictEqual(response.xhr.status, 200, "oj.ajax.doGet synchronous HTML content type returns the XHR object");
	});

	asyncTest("oj.ajax.doGet function asynchronous HTML content type", function() {
		var params, synchronousResponse;

		expect(12);

		params = $.extend(true, {
			"type": "html"
		}, ajaxTestServletParams);

		synchronousResponse = oj.ajax.doGet({
			url: ajaxTestServletUrl,
			params: params,
			asynchronous: true,
			preventCache: true,
			successCallback: function(response, status, xhr) {
				strictEqual(status, 200, "oj.ajax.doGet asynchronous HTML content type returns 200 status");
				ok(response, "oj.ajax.doGet asynchronous HTML content type returns content");
				strictEqual(typeof(response), "string", "oj.ajax.doGet asynchronous HTML content type returns a string");
				ok(htmlResponseContainsMethod(response, "get"), "oj.ajax.doGet asynchronous HTML content type returns the correct method");
				ok(htmlResponseContainsParameter(response, preventCacheQueryStringParamName), "oj.ajax.doGet asynchronous HTML content type prevents caching");
				ok(htmlResponseContainsParameterAndValue(response, ajaxTestServletQueryStringParamName, ajaxTestServletQueryStringParamValue), "oj.ajax.doGet asynchronous HTML content type returns the test query string params");
				ok(htmlResponseContainsParameterAndValue(response, "type", "html"), "oj.ajax.doGet asynchronous HTML content type returns the content type params");
				ok(htmlResponseContainsParameterAndValue(response, ajaxTestServletParamName, ajaxTestServletParamValue), "oj.ajax.doGet asynchronous HTML content type returns the test params");
				ok(xhr, "oj.ajax.doGet asynchronous HTML content type returns the XHR object");
				strictEqual(typeof(xhr), "object", "oj.ajax.doGet asynchronous HTML content type returns the XHR object");
				strictEqual(xhr.status, 200, "oj.ajax.doGet asynchronous HTML content type returns the XHR object");

				start();
			},
			errorCallback: function(response, status, xhr) {
				ok(false, "oj.ajax.doGet asynchronous HTML content type should not call the error callback ");
				start();
			}
		});

		strictEqual(synchronousResponse, null, "oj.ajax.doGet asynchronous HTML content type returns null");
	});

	// oj.ajax.doGet method with JSON content type tests
	asyncTest("oj.ajax.doGet function asynchronous JSON content type", function() {
		var params, synchronousResponse;

		expect(12);

		params = $.extend(true, {
			"type": "json"
		}, ajaxTestServletParams);

		synchronousResponse = oj.ajax.doGet({
			url: ajaxTestServletUrl,
			params: params,
			asynchronous: true,
			preventCache: true,
			successCallback: function(response, status, xhr) {
				strictEqual(status, 200, "oj.ajax.doGet asynchronous JSON content type returns 200 status");
				ok(response, "oj.ajax.doGet asynchronous JSON content type returns content");
				strictEqual(typeof(response), "object", "oj.ajax.doGet asynchronous JSON content type returns an object");
				strictEqual(response.method, "get", "oj.ajax.doGet asynchronous JSON content type returns test Ajax JSON");
				ok(response.parameters[preventCacheQueryStringParamName], "oj.ajax.doGet asynchronous JSON content type prevents caching");
				strictEqual(response.parameters[ajaxTestServletQueryStringParamName][0], ajaxTestServletQueryStringParamValue, "oj.ajax.doGet asynchronous JSON content type returns the test query string params");
				strictEqual(response.parameters.type[0], "json", "oj.ajax.doGet asynchronous JSON content type returns the content type params");
				strictEqual(response.parameters[ajaxTestServletParamName][0], ajaxTestServletParamValue, "oj.ajax.doGet asynchronous JSON content type returns the test params");
				ok(xhr, "oj.ajax.doGet asynchronous JSON content type returns the XHR object");
				strictEqual(typeof(xhr), "object", "oj.ajax.doGet asynchronous JSON content type returns the XHR object");
				strictEqual(xhr.status, 200, "oj.ajax.doGet asynchronous JSON content type returns the XHR object");

				start();
			},
			errorCallback: function(response, status, xhr) {
				ok(false, "oj.ajax.doGet asynchronous JSON content type should not call the error callback ");
				start();
			}
		});

		strictEqual(synchronousResponse, null, "oj.ajax.doGet asynchronous JSON content type returns null");
	});

	// oj.ajax.doGet method with XML content type tests
	asyncTest("oj.ajax.doGet function asynchronous XML content type", function() {
		var params, synchronousResponse;

		expect(11);

		params = $.extend(true, {
			"type": "xml"
		}, ajaxTestServletParams);

		synchronousResponse = oj.ajax.doGet({
			url: ajaxTestServletUrl,
			params: params,
			asynchronous: true,
			preventCache: true,
			successCallback: function(response, status, xhr) {
				strictEqual(status, 200, "oj.ajax.doGet asynchronous XML content type returns 200 status");
				ok(response, "oj.ajax.doGet asynchronous XML content type returns content");
				ok(xmlDocumentTypeRegExp.test(Object.prototype.toString.apply(response)), "oj.ajax.doGet asynchronous XML content type returns an XML object");
				ok(xmlResponseContainsMethod(response, "get"), "oj.ajax.doGet asynchronous XML content type returns the correct method");
				ok(xmlResponseContainsParameter(response, preventCacheQueryStringParamName), "oj.ajax.doGet asynchronous XML content type prevents caching");
				ok(xmlResponseContainsParameterAndValue(response, "type", "xml"), "oj.ajax.doGet asynchronous XML content type returns the content type params");
				ok(xmlResponseContainsParameterAndValue(response, ajaxTestServletParamName, ajaxTestServletParamValue), "oj.ajax.doGet asynchronous XML content type returns the test params");
				ok(xhr, "oj.ajax.doGet asynchronous XML content type returns the XHR object");
				strictEqual(typeof(xhr), "object", "oj.ajax.doGet asynchronous XML content type returns the XHR object");
				strictEqual(xhr.status, 200, "oj.ajax.doGet asynchronous XML content type returns the XHR object");

				start();
			},
			errorCallback: function(response, status, xhr) {
				ok(false, "oj.ajax.doGet asynchronous XML content type should not call the error callback ");
				start();
			}
		});

		strictEqual(synchronousResponse, null, "oj.ajax.doGet asynchronous XML content type returns null");
	});

	// oj.ajax.doPost method tests
	test("oj.ajax.doPost function defined", function() {
		expect(1);

		strictEqual(typeof(oj.ajax.doPost), "function", "oj.ajax.doPost is a function");
	});

	// oj.ajax.doPost method with HTML content type tests
	asyncTest("oj.ajax.doPost function asynchronous HTML content type", function() {
		var params, synchronousResponse;

		expect(12);

		params = $.extend(true, {
			"type": "html"
		}, ajaxTestServletParams);

		synchronousResponse = oj.ajax.doPost({
			url: ajaxTestServletUrl,
			params: params,
			asynchronous: true,
			preventCache: true,
			successCallback: function(response, status, xhr) {
				strictEqual(status, 200, "oj.ajax.doPost asynchronous HTML content type returns 200 status");
				ok(response, "oj.ajax.doPost asynchronous HTML content type returns content");
				strictEqual(typeof(response), "string", "oj.ajax.doPost asynchronous HTML content type returns a string");
				ok(htmlResponseContainsMethod(response, "post"), "oj.ajax.doPost asynchronous HTML content type returns the correct method");
				ok(htmlResponseContainsParameter(response, preventCacheQueryStringParamName), "oj.ajax.doPost asynchronous HTML content type prevents caching");
				ok(htmlResponseContainsParameterAndValue(response, ajaxTestServletQueryStringParamName, ajaxTestServletQueryStringParamValue), "oj.ajax.doPost asynchronous HTML content type returns the test query string params");
				ok(htmlResponseContainsParameterAndValue(response, "type", "html"), "oj.ajax.doPost asynchronous HTML content type returns the content type params");
				ok(htmlResponseContainsParameterAndValue(response, ajaxTestServletParamName, ajaxTestServletParamValue), "oj.ajax.doPost asynchronous HTML content type returns the test params");
				ok(xhr, "oj.ajax.doPost asynchronous HTML content type returns the XHR object");
				strictEqual(typeof(xhr), "object", "oj.ajax.doPost asynchronous HTML content type returns the XHR object");
				strictEqual(xhr.status, 200, "oj.ajax.doPost asynchronous HTML content type returns the XHR object");

				start();
			},
			errorCallback: function(response, status, xhr) {
				ok(false, "oj.ajax.doPost asynchronous HTML content type should not call the error callback ");
				start();
			}
		});

		strictEqual(synchronousResponse, null, "oj.ajax.doPost asynchronous HTML content type returns null");
	});

	// oj.ajax.doPut method tests
	test("oj.ajax.doPut function defined", function() {
		expect(1);

		strictEqual(typeof(oj.ajax.doPut), "function", "oj.ajax.doPut is a function");
	});

	// oj.ajax.doDelete method tests
	test("oj.ajax.doDelete function defined", function() {
		expect(1);

		strictEqual(typeof(oj.ajax.doDelete), "function", "oj.ajax.doDelete is a function");
	});
});
