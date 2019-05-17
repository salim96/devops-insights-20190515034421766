
var ConsoleModule = angular.module('ConsoleModule', ['ngRoute']);
//locations
var loc1={lat:0, lng:0};
var loc2={lat:0, lng:0};
var loc3={lat:0, lng:0};
var loc4={lat:0, lng:0};

ConsoleModule.config(['$routeProvider', '$locationProvider','$sceDelegateProvider', '$httpProvider',
    function ($routeProvider, $locationProvider, $sceDelegateProvider, $httpProvider) {
    $routeProvider.when('/', {
        templateUrl: '/partials/Byzip.html',
        controller: 'wcontroller',
        controllerAs: 'wcontroller'
    });
}]);

ConsoleModule.controller('wcontroller', ['$scope', '$http', '$routeParams', '$timeout', '$sce',
    function($scope, $http, $routeParams, $timeout, $sce) {

    $scope.somemessage = "Some weather";
    $scope.zip1City = "";
    $scope.zip1Weather = "";

    $scope.zip = function(which) {

        var data = "";
        if(which === 1) {
            data = $scope.zip1m;
        } else if(which === 2) {
            data = $scope.zip2m;
        } else if(which === 3) {
            data = $scope.zip3m;
        } else if(which === 4) {
            data = $scope.zip4m;
        } 

        if(data.length !== 0) {
            $http({
                method: "GET",
                url: '/api/v1/getWeather?q=' + data
            }).then( function(response) {
                if(which === 1) {
                    //$scope.zip1City = response.data.city;
                    $scope.zip1Weather = response.data.weather;
                    loc1={lat:response.data.latitude, lng:response.data.longitude};
                } else if(which === 2) {
                    //$scope.zip2City = response.data.city;
                    $scope.zip2Weather = response.data.weather;
                    loc2={lat:response.data.latitude, lng:response.data.longitude};
                } else if(which === 3) {
                    //$scope.zip3City = response.data.city;
                    $scope.zip3Weather = response.data.weather;
                    loc3={lat:response.data.latitude, lng:response.data.longitude};
                } else if(which === 4) {
                    //$scope.zip4City = response.data.city;
                    $scope.zip4Weather = response.data.weather;
                    loc4={lat:response.data.latitude, lng:response.data.longitude};
                } 
            });
        } else {
            if(which === 1) {
                    //$scope.zip1City = "";
                    $scope.zip1Weather = "";
                    loc1={lat:0, lng:0};
                } else if(which === 2) {
                    //$scope.zip2City = "";
                    $scope.zip2Weather = "";
                    loc2={lat:0, lng:0};
                } else if(which === 3) {
                    //$scope.zip3City = "";
                    $scope.zip3Weather = "";
                    loc3={lat:0, lng:0};
                } else if(which === 4) {
                    //$scope.zip4City = "";
                    $scope.zip4Weather = "";
                    loc4={lat:0, lng:0};
                } 
                initMap();
        }
    };
    
}]);

      function initMap() {
        map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: -41, lng: 173},
          zoom: 5.3
        });
        var marker1 = new google.maps.Marker({position: loc1, map: map});
        var marker2 = new google.maps.Marker({position: loc2, map: map});
        var marker3 = new google.maps.Marker({position: loc3, map: map});
        var marker4 = new google.maps.Marker({position: loc4, map: map});
      }

