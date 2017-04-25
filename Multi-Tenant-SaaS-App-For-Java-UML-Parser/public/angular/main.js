/**
 * http://usejsdoc.org/
 */
var app = angular.module('app', []);

app.controller("app", function($scope, $http) {
	$scope.success = true;
	$scope.show = false;
	$scope.msg_flag = true;

	$scope.submit = function() {
		console.log("login button pressed");
		window.location = "templates/tenant.html";
	};
});
