$(function() {
	var xmlDocumentTypeRegEx, ajaxTestServletUrl, ajaxTestServletParams, getResponseMethodHtmlFrag, getMethodFromXmlResponse;

	module("oj.ajax");

	xmlDocumentTypeRegEx = /^\[object (XML)?Document\]$/;

	ajaxTestServletUrl = "/oddjob/ajaxTest?queryName1=queryValue1";

	ajaxTestServletParams = {
		"paramName1": "paramValue1"
	};

	getResponseMethodHtmlFrag = function(method) {
		return "<div id=\"method\">" + method + "</div>";
	};

	getMethodFromXmlResponse = function(xmlDocument) {
		var rootNode, method;

		rootNode = xmlDocument.documentElement;
		method = rootNode.getAttribute("method");

		return method;
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
		var responseMethodFrag, synchronousResponse;

		expect(8);

		responseMethodFrag = getResponseMethodHtmlFrag("get");

		synchronousResponse = oj.ajax.doRequest({
			url: ajaxTestServletUrl,
			successCallback: function(response, status, xhr) {
				strictEqual(status, 200, "oj.ajax.doGet asynchronous HTML content type returns 200 status");
				ok(response, "oj.ajax.doGet asynchronous HTML content type returns content");
				strictEqual(typeof(response), "string", "oj.ajax.doGet asynchronous HTML content type returns a string");
				ok(response.indexOf(responseMethodFrag) > -1, "j.ajax.doGet asynchronous HTML content type returns the correct method");
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

	// oj.ajax.doGet method tests
	test("oj.ajax.doGet function defined", function() {
		expect(1);

		strictEqual(typeof(oj.ajax.doGet), "function", "oj.ajax.doGet is a function");
	});

	// oj.ajax.doGet method with HTML content type tests
	test("oj.ajax.doGet function synchronous HTML content type", function() {
		var responseMethodFrag, params, response;

		expect(8);

		responseMethodFrag = getResponseMethodHtmlFrag("get");

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
		ok(response.content.indexOf(responseMethodFrag) > -1, "oj.ajax.doGet synchronous HTML content type returns the correct method");
		ok(response.xhr, "oj.ajax.doGet synchronous HTML content type returns the XHR object");
		strictEqual(typeof(response.xhr), "object", "oj.ajax.doGet synchronous HTML content type returns the XHR object");
		strictEqual(response.xhr.status, 200, "oj.ajax.doGet synchronous HTML content type returns the XHR object");
	});

	asyncTest("oj.ajax.doGet function asynchronous HTML content type", function() {
		var responseMethodFrag, params, synchronousResponse;

		expect(8);

		responseMethodFrag = getResponseMethodHtmlFrag("get");

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
				ok(response.indexOf(responseMethodFrag) > -1, "j.ajax.doGet asynchronous HTML content type returns the correct method");
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

		expect(8);

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

		expect(8);

		params = $.extend(true, {
			"type": "xml"
		}, ajaxTestServletParams);

		synchronousResponse = oj.ajax.doGet({
			url: ajaxTestServletUrl,
			params: params,
			asynchronous: true,
			preventCache: true,
			successCallback: function(response, status, xhr) {
				var method;

				strictEqual(status, 200, "oj.ajax.doGet asynchronous XML content type returns 200 status");
				ok(response, "oj.ajax.doGet asynchronous XML content type returns content");
				ok(xmlDocumentTypeRegEx.test(Object.prototype.toString.apply(response)), "oj.ajax.doGet asynchronous XML content type returns an XML object");

				method = getMethodFromXmlResponse(response);
				strictEqual(method, "get", "j.ajax.doGet asynchronous XML content type returns the correct method");

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
		var responseMethodFrag, params, synchronousResponse;

		expect(8);

		responseMethodFrag = getResponseMethodHtmlFrag("post");

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
				ok(response.indexOf(responseMethodFrag) > -1, "j.ajax.doPost asynchronous HTML content type returns the correct method");
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
