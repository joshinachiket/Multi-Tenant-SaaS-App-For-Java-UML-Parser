/**
 * Tenant-Akshay
 */
var myApp = angular.module('app', []);

console.log("control caught in app controller");

myApp.directive('fileModel', ['$parse', function ($parse) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            var model = $parse(attrs.fileModel);
            var modelSetter = model.assign;
            
            element.bind('change', function(){
                scope.$apply(function(){
                    modelSetter(scope, element[0].files[0]);
                });
            });
        }
    };
}]);

myApp.service('fileUpload', ['$http', function ($http) {
    this.uploadFileToUrl = function(file, uploadUrl, cb) {
        var fd = new FormData();
        fd.append('file', file);
        
        console.log("control caught before making HTTP request");
        
        
        $http.post(uploadUrl, fd, {
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined}
        })
        .success(function(data){
        	cb(data);
        })
        .error(function(err){
        	console.log(err);
        	cb(err);
        });
    }
}]);

myApp.controller('myCtrl', ['$scope', 'fileUpload', function($scope, fileUpload){
	
	console.log("control caught in myCtrl controller");
    
    $scope.uploadFile = function(){
        var file = $scope.myFile;
        //while uploading on EC2 use second POST URL
        //var uploadUrl = "/";
        var uploadUrl = "/suchi";
        fileUpload.uploadFileToUrl(file, uploadUrl, function(data) {
        	console.log(data.path);
        	$scope.output = data.path;
        });
    };
}]);
