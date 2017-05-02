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

tenant.directive('fileModel', [ '$parse', function($parse) {

	console.log("control caught in directive");

	return {
		restrict : 'A',
		link : function(scope, element, attrs) {
			var model = $parse(attrs.fileModel);
			var modelSetter = model.assign;

			element.bind('change', function() {
				scope.$apply(function() {
					modelSetter(scope, element[0].files[0]);
				});
			});
		}
	};
} ]);

tenant.service('fileUpload', [ '$http', function($http) {
	this.uploadFileToUrl = function(file, uploadUrl, cb) {

		console.log("control caught in fileUpload service");

		var fd = new FormData();
		fd.append('file', file);

		$http.post(uploadUrl, fd, {
			transformRequest : angular.identity,
			headers : {
				'Content-Type' : undefined
			}
		}).success(function(data) {

			console.log("control caught in success callback");
			cb(data);
		}).error(function(err) {

			console.log("control caught in failure callback");
			console.log(err);
			cb(err);
		});
	};
} ]);

tenant.controller('myCtrl', [ '$scope', 'fileUpload',
		function($scope, fileUpload) {

			$scope.uploadFile = function() {
				console.log("control caught in myCtrl controller");

				var file = $scope.myFile;
				var uploadUrl = "/";

				fileUpload.uploadFileToUrl(file, uploadUrl, function(data) {
					console.log(data.path);
					$scope.output = data.path;
				});

			};
		} ]);

tenant.controller("tenant1_controller", function($scope, $http) {
	console.log("inside tenant1 controller");
	$scope.mark_flag = true;

	$scope.enter = function() {
		console.log("enter button tenent 1 pressed!");
		
		var TenantOneDetails = {
				"tenant_name" : "Tenant One",
				"correctness" : $scope.correct,
				"marks" : $scope.mark
		};

		if (!($scope.correct) || !($scope.mark)) {
			$scope.mark_flag = false;
			console.log("cant enter empty credentials");
		} else {
			$scope.mark_flag = true;

			console.log(TenantOneDetails);
			
			$http({
				method : "POST",
				url : '/enterTenantOneInfo',
				data : JSON.stringify(TenantOneDetails),
				headers: {'Content-Type': 'application/json'}
			}).success(function(data) {

				if (data.statusCode === 200) {
					console.log("invalid entry received");
				} else {
					console.log("record has been inserted");
				}
			});
			
		}
	};

});

tenant.controller("tenant2_controller", function($scope, $http) {
	console.log("inside tenant1 controller");
	$scope.mark_flag = true;

	$scope.enter = function() {
		console.log("enter button tenent 2 pressed!");

		if (!($scope.correct) || !($scope.mark)) {
			$scope.mark_flag = false;
			console.log("cant enter empty credentials");
		} else {
			$scope.mark_flag = true;
			console.log("Correct: " + $scope.correct + " Marks: " + $scope.mark);
		}
	};
});

tenant.controller("tenant3_controller", function($scope, $http) {
	console.log("inside tenant1 controller");
	$scope.mark_flag = true;

	$scope.enter = function() {
		console.log("enter button tenent 3 pressed!");

		if (!($scope.correct) || !($scope.mark)) {
			$scope.mark_flag = false;
			console.log("cant enter empty credentials");
		} else {
			$scope.mark_flag = true;
			console.log("Correct: " + $scope.correct + " Marks: " + $scope.mark);
		}
	};
});
