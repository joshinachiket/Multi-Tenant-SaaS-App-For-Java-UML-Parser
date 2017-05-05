/**
 * http://usejsdoc.org/
 */
var tenant = angular.module('tenant', [ 'ngRoute' ]);

var link = "http://CMPE281-SAAS-APP-LB-1609984865.us-west-2.elb.amazonaws.com:3000";




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
	}).when("/tenant4", {
		templateUrl : "/templates/tenant4.html",
		controller : "tenant4_controller"
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

			console.log("control caught in failure callback nachiket");
			console.log(err);
			cb(err);
		});
	};
} ]);

tenant.controller('myCtrl', [ '$scope', 'fileUpload',
		function($scope, fileUpload) {

			$scope.uploadFile = function(tenant) {
			
				var file = $scope.myFile;
				var uploadUrl = link + "/" + tenant;
				console.log("control caught in myCtrl controller new nachiket with URL");
				console.log(uploadUrl);

				fileUpload.uploadFileToUrl(file, uploadUrl, function(data) {
					
					console.log("my image path is:");
					
					var image_link = data.path;
					image_link = image_link.substring(1);
					
					if (tenant == "") {
						image_link = link + image_link;
					} else{
						image_link = link +"/" + tenant + image_link;
					}
					
					
					
					console.log(image_link);
					$scope.output = image_link;
				});

			};
		} ]);

tenant.controller("tenant1_controller", function($scope, $http) {
	console.log("inside Tenant-1 Akshay controller");
	$scope.mark_flag = true;

	$scope.enter = function() {
		console.log("enter button Tenant-1 Akshay pressed!");
		
		var TenantOneDetails = {
				"tenant_id" : "101",
				"tenant_name" : "Tenant-1 Akshay",
				"correctness" : $scope.correct,
				"marks" : $scope.mark,
				"comment" : ""
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
	console.log("inside Tenant-2 Laura controller");
	$scope.mark_flag = true;
	
	$scope.enter = function() {
		console.log("enter button Tenant-2 Laura pressed!");
		
		var TenantOneDetails = {
				"tenant_id" : "102",
				"tenant_name" : "Tenant-2 Laura",
				"correctness" : $scope.correct,
				"marks" : $scope.mark,
				"comment" : ""
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

tenant.controller("tenant3_controller", function($scope, $http) {
	console.log("inside Tenant-3 Suchi controller");
	$scope.mark_flag = true;

	$scope.enter = function() {
		console.log("enter button Tenant-3 Suchi pressed!");
		
		var TenantOneDetails = {
				"tenant_id" : "103",
				"tenant_name" : "Tenant-3 Suchi",
				"correctness" : $scope.correct,
				"marks" : $scope.mark,
				"comment" : ""
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


tenant.controller("tenant4_controller", function($scope, $http) {
	console.log("inside Tenant-4 Apoorva controller");
	$scope.mark_flag = true;

	$scope.enter = function() {
		console.log("enter button Tenant-4 Apoorva pressed!");
		
		var TenantOneDetails = {
				"tenant_id" : "104",
				"tenant_name" : "Tenant-4 Apoorva",
				"correctness" : $scope.correct,
				"marks" : $scope.mark,
				"comment" : $scope.comment
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
