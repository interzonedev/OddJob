$(function() {
	var htmlUrl, htmlContent;

	htmlUrl = "resources/oj/ajax/test.html";
	htmlContent = "<div>Ajax Test</div>";

	module("oj.ajax");

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

	test("oj.ajax.doGet function synchronous HTML content type", function() {
		var response;

		expect(6);

		response = oj.ajax.doGet({
			url: htmlUrl,
			params: {},
			asynchronous: false,
			preventCache: true
		});

		strictEqual(typeof(response), "object", "oj.ajax.doGet synchronous HTML content type returns an object");
		strictEqual(response.status, 200, "oj.ajax.doGet synchronous HTML content type returns 200 status");
		strictEqual(response.content, htmlContent, "oj.ajax.doGet synchronous HTML content type returns test Ajax HTML");
		ok(response.xhr, "oj.ajax.doGet synchronous HTML content type returns the XHR object");
		strictEqual(typeof(response.xhr), "object", "oj.ajax.doGet synchronous HTML content type returns the XHR object");
		strictEqual(response.xhr.status, 200, "oj.ajax.doGet synchronous HTML content type returns the XHR object");
	});

	asyncTest("oj.ajax.doGet function asynchronous HTML content type with valid arguments", function() {
		var synchronousResponse;

		expect(6);

		synchronousResponse = oj.ajax.doGet({
			url: htmlUrl,
			params: {},
			asynchronous: true,
			preventCache: true,
			successCallback: function(response, status, xhr) {
				strictEqual(response, htmlContent, "oj.ajax.doGet asynchronous HTML content type with valid arguments returns test Ajax HTML");
				strictEqual(status, 200, "oj.ajax.doGet asynchronous HTML content type with valid arguments returns 200 status");
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
});
