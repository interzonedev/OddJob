$(function() {
	var testAjaxHtml;

	testAjaxHtml = "<div>Ajax Test</div>";

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

		expect(1);

		response = oj.ajax.doGet({
			url: "resources/oj/ajax/test.html",
			params: {},
			asynchronous: false,
			preventCache: true
		});

		strictEqual(response, testAjaxHtml, "oj.ajax.doGet function synchronous HTML content type returns test Ajax HTML");
	});

	asyncTest("oj.ajax.doGet function asynchronous HTML content type with valid arguments", function() {
		var synchronousResponse;

		expect(3);

		synchronousResponse = oj.ajax.doGet({
			url: "resources/oj/ajax/test.html",
			params: {},
			asynchronous: true,
			preventCache: true,
			successCallback: function(response, status) {
				strictEqual(response, testAjaxHtml, "oj.ajax.doGet function asynchronous HTML content type with valid arguments returns test Ajax HTML");
				strictEqual(status, 200, "oj.ajax.doGet function asynchronous HTML content type with valid arguments returns 200 status");
				start();
			},
			errorCallback: function(status, response) {
				ok(false, "oj.ajax.doGet function asynchronous HTML content type  with valid arguments should not call the error callback ");
				start();
			}
		});

		strictEqual(synchronousResponse, null, "oj.ajax.doGet function asynchronous HTML content type returns null");
	});
});
