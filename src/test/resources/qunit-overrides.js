QUnit.log = function(run) {
	if (window.console && window.console.log) {
		window.console.log(run.result + " :: " + run.message);
	}
};
