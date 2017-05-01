/**
 * http://usejsdoc.org/
 */
var tenant = angular.module('tenant', [ 'ngRoute' ]);

tenant.controller("tenant", function($scope, $http) {
	console.log("inside tenant controller");
});

tenant.config(function($routeProvider) {
	console.log("inside tenant route provider");
	$routeProvider.when("/tenant1", {
		templateUrl : "/templates/tenant1.html",
		controller : "tenant1_controller"
	}).when("/tenant2", {
		templateUrl : "/templates/tenant2.html",
		controller : "tenant2_controller"
	}).when("/tenant3", {
		templateUrl : "/templates/tenant3.html",
		controller : "tenant3_controller"
	});

});

tenant.controller("tenant1_controller", function($scope, $http) {
	console.log("inside tenant1 controller");
	$scope.mark_flag = true;

	$scope.enter = function() {
		console.log("enter button tenent 1 pressed!");

		if ( !($scope.correct) || !($scope.mark)) {
			$scope.mark_flag = false;
			console.log("cant enter empty credentials");
		} else {
			$scope.mark_flag = true;
			console.log("Correct: " + $scope.correct + " Marks: "+ $scope.mark);
		}
	};

});

tenant.controller("tenant2_controller", function($scope, $http) {
	console.log("inside tenant1 controller");
	$scope.mark_flag = true;

	$scope.enter = function() {
		console.log("enter button tenent 2 pressed!");

		if ( !($scope.correct) || !($scope.mark)) {
			$scope.mark_flag = false;
			console.log("cant enter empty credentials");
		} else {
			$scope.mark_flag = true;
			console.log("Correct: " + $scope.correct + " Marks: "+ $scope.mark);
		}
	};
});

tenant.controller("tenant3_controller", function($scope, $http) {
	console.log("inside tenant1 controller");
	$scope.mark_flag = true;

	$scope.enter = function() {
		console.log("enter button tenent 3 pressed!");

		if ( !($scope.correct) || !($scope.mark)) {
			$scope.mark_flag = false;
			console.log("cant enter empty credentials");
		} else {
			$scope.mark_flag = true;
			console.log("Correct: " + $scope.correct + " Marks: "+ $scope.mark);
		}
	};
});
