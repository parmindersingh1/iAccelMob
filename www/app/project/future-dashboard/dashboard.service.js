(function() {
  'use strict';
  angular.module('app.dashboard')
    .factory('dashboardFactory', dashboardFactory);

  dashboardFactory.$inject = ['$http', '__env'];

  function dashboardFactory($http, __env) {
    var service = {};

    service.getMainsData = function () { // TODO below need to be changed
    var promise = $http.get('http://localhost:8084/dashboard/mainConsumption?siteId=58005c16e855161f7d388cf0')
      .then(

        function (response) {
          return response;
        },
        function (response) {
          return response;
        });
    return promise;
  };

  service.getGensetData = function () { // TODO below need to be changed
    var promise = $http.get('http://localhost:8084/dashboard/dgConsumption?siteId=58005c16e855161f7d388cf0')
      .then(

        function (response) {
          return response;
        },
        function (response) {
          return response;
        });
    return promise;
  };

  service.getActiveHourData = function () { // TODO below need to be changed
    var promise = $http.get('http://localhost:8084/dashboard/currentActive?siteId=58005c16e855161f7d388cf0')
      .then(

        function (response) {
          return response;
        },
        function (response) {
          return response;
        });
    return promise;
  };

  service.getEnergyData = function () { // TODO below need to be changed
    var promise = $http.get('http://localhost:8084/dashboard/dgMainHistogram?siteId=58005c16e855161f7d388cf0')
      .then(

        function (response) {
          return response;
        },
        function (response) {
          return response;
        });
    return promise;
  };

  service.getTemperatureData = function () { // TODO below need to be changed
    var promise = $http.get('http://localhost:8084/dashboard/temperature?siteId=58005c16e855161f7d388cf0')
      .then(

        function (response) {
          return response;
        },
        function (response) {
          return response;
        });
    return promise;
  };

   service.getEnergyData = function () { // TODO below need to be changed
      var promise = $http.get('http://localhost:8084/dashboard/dgMainHistogram?siteId=58005c16e855161f7d388cf0')
        .then(

          function (response) {
            return response;
          },
          function (response) {
            return response;
          });
      return promise;
    };


  service.getSupplyData = function () { // TODO below need to be changed
    var promise = $http.get('http://localhost:8084/dashboard/parameters?siteId=58005c16e855161f7d388cf0')
      .then(

        function (response) {
          return response;
        },
        function (response) {
          return response;
        });
    return promise;
  };

  service.getAssetData = function () { // TODO below need to be changed
    var promise = $http.get('http://localhost:8084/dashboard/acStatus?siteId=58005c16e855161f7d388cf0')
      .then(

        function (response) {
          return response;
        },
        function (response) {
          return response;
        });
    return promise;
  };

  service.getAlertData = function () { // TODO below need to be changed
     var promise = $http.get(__env.notificationServerUrl + '/alarms/dashboardData?siteId=58005c16e855161f7d388cf0')
      .then(

        function (response) {
          return response;
        },
        function (response) {
          return response;
        });
    return promise;
  };

    service.getData = function () { // TODO below need to be changed
      var promise = $http.get('/data/getData.json')
        .then(

          function (response) {
            return response;
          },
          function (response) {
            return response;
          });
      return promise;
    };
    service.getDashboard = function(id) {
      var promise = $http.get('/data/getDashboard.json')
        .then(

          function (response) {
            return response;
          },
          function (response) {
            return response;
          });
      return promise;
    };

    service.getDashboardData = function(id) {
      var promise = $http.get('/data/getDashboardData.json')
        .then(

          function (response) {
            return response;
          },
          function (response) {
            return response;
          });
      return promise;
    };

    service.getDashboardSites = function(id) {
      var promise = $http.get( '/data/getDashboardSites.json')
        .then(
          function (response) {
            return response;
          },
          function (response) {
            return response;
          });
      return promise;
    };


    return service;
  };
})();
