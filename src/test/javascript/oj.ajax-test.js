$(function() {
	var ajaxTestServletUrl, getMethodFromXmlResponse;

	module("oj.ajax");

	ajaxTestServletUrl = "/oddjob/ajaxTest";

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

	// oj.ajax.doGet method tests
	test("oj.ajax.doGet function defined", function() {
		expect(1);

		strictEqual(typeof(oj.ajax.doGet), "function", "oj.ajax.doGet is a function");
	});

	// oj.ajax.doGet method with HTML content type tests
	test("oj.ajax.doGet function synchronous HTML content type", function() {
		var response, responseMethodFrag;

		expect(8);

		responseMethodFrag = "<div id=\"method\">get</div>";

		response = oj.ajax.doGet({
			url: ajaxTestServletUrl,
			params: {},
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

	asyncTest("oj.ajax.doGet function asynchronous HTML content type with valid arguments", function() {
		var synchronousResponse, responseMethodFrag;

		expect(8);

		responseMethodFrag = "<div id=\"method\">get</div>";

		synchronousResponse = oj.ajax.doGet({
			url: ajaxTestServletUrl,
			params: {},
			asynchronous: true,
			preventCache: true,
			successCallback: function(response, status, xhr) {
				strictEqual(status, 200, "oj.ajax.doGet asynchronous HTML content type with valid arguments returns 200 status");
				ok(response, "oj.ajax.doGet asynchronous HTML content type with valid arguments returns content");
				strictEqual(typeof(response), "string", "oj.ajax.doGet asynchronous HTML content type with valid arguments returns a string");
				ok(response.indexOf(responseMethodFrag) > -1, "j.ajax.doGet asynchronous HTML content type with valid arguments returns the correct method");
				ok(xhr, "oj.ajax.doGet asynchronous HTML content type with valid arguments returns the XHR object");
				strictEqual(typeof(xhr), "object", "oj.ajax.doGet asynchronous HTML content type with valid arguments returns the XHR object");
				strictEqual(xhr.status, 200, "oj.ajax.doGet asynchronous HTML content type with valid arguments returns the XHR object");

				start();
			},
			errorCallback: function(response, status, xhr) {
				ok(false, "oj.ajax.doGet asynchronous HTML content type with valid arguments should not call the error callback ");
				start();
			}
		});

		strictEqual(synchronousResponse, null, "oj.ajax.doGet asynchronous HTML content type with valid arguments returns null");
	});

	// oj.ajax.doGet method with JSON content type tests
	asyncTest("oj.ajax.doGet function asynchronous JSON content type with valid arguments", function() {
		var synchronousResponse;

		expect(8);

		synchronousResponse = oj.ajax.doGet({
			url: ajaxTestServletUrl + "?type=json",
			params: {},
			asynchronous: true,
			preventCache: true,
			successCallback: function(response, status, xhr) {
				strictEqual(status, 200, "oj.ajax.doGet asynchronous JSON content type with valid arguments returns 200 status");
				ok(response, "oj.ajax.doGet asynchronous JSON content type with valid arguments returns content");
				strictEqual(typeof(response), "object", "oj.ajax.doGet asynchronous JSON content type with valid arguments returns an object");
				strictEqual(response.method, "get", "oj.ajax.doGet asynchronous JSON content type with valid arguments returns test Ajax JSON");
				ok(xhr, "oj.ajax.doGet asynchronous JSON content type with valid arguments returns the XHR object");
				strictEqual(typeof(xhr), "object", "oj.ajax.doGet asynchronous JSON content type with valid arguments returns the XHR object");
				strictEqual(xhr.status, 200, "oj.ajax.doGet asynchronous JSON content type with valid arguments returns the XHR object");

				start();
			},
			errorCallback: function(response, status, xhr) {
				ok(false, "oj.ajax.doGet asynchronous JSON content type with valid arguments should not call the error callback ");
				start();
			}
		});

		strictEqual(synchronousResponse, null, "oj.ajax.doGet asynchronous JSON content type with valid arguments returns null");
	});

	// oj.ajax.doGet method with XML content type tests
	asyncTest("oj.ajax.doGet function asynchronous XML content type with valid arguments", function() {
		var synchronousResponse;

		expect(8);

		synchronousResponse = oj.ajax.doGet({
			url: ajaxTestServletUrl + "?type=xml",
			params: {},
			asynchronous: true,
			preventCache: true,
			successCallback: function(response, status, xhr) {
				var method;

				strictEqual(status, 200, "oj.ajax.doGet asynchronous XML content type with valid arguments returns 200 status");
				ok(response, "oj.ajax.doGet asynchronous XML content type with valid arguments returns content");
				strictEqual(Object.prototype.toString.apply(response), "[object XMLDocument]", "oj.ajax.doGet asynchronous XML content type with valid arguments returns an XML object");

				method = getMethodFromXmlResponse(response);
				strictEqual(method, "get", "j.ajax.doGet asynchronous XML content type with valid arguments returns the correct method");

				ok(xhr, "oj.ajax.doGet asynchronous XML content type with valid arguments returns the XHR object");
				strictEqual(typeof(xhr), "object", "oj.ajax.doGet asynchronous XML content type with valid arguments returns the XHR object");
				strictEqual(xhr.status, 200, "oj.ajax.doGet asynchronous XML content type with valid arguments returns the XHR object");

				start();
			},
			errorCallback: function(response, status, xhr) {
				ok(false, "oj.ajax.doGet asynchronous XML content type with valid arguments should not call the error callback ");
				start();
			}
		});

		strictEqual(synchronousResponse, null, "oj.ajax.doGet asynchronous XML content type with valid arguments returns null");
	});
});
