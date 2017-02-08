(function() {
  'use strict';
  angular.module('app.dashboard')
    .factory('dashboardFactory', dashboardFactory);

  dashboardFactory.$inject = ['$http', '__env'];

  function dashboardFactory($http, __env) {
    var service = {};

      service.get = function (id) { // TODO below need to be changed
          var promise = $http.get(__env.refDataUrl + "/sites/" + id)
              .then(

                  function (response) {
                      return response;
                  },
                  function (response) {
                      return response;
                  });
          return promise;
      };
      service.getMainsData = function (siteId) { // TODO below need to be changed
          var promise = $http.get(__env.dataServerUrl + '/dashboard/mainConsumption?siteId=' + siteId)
              .then(

                  function (response) {
                      return response;
                  },
                  function (response) {
                      return response;
                  });
          return promise;
      };

      service.getGensetData = function (siteId) { // TODO below need to be changed
          var promise = $http.get(__env.dataServerUrl +'/dashboard/dgConsumption?siteId=' + siteId)
              .then(

                  function (response) {
                      return response;
                  },
                  function (response) {
                      return response;
                  });
          return promise;
      };

      service.getActiveHourData = function (siteId) { // TODO below need to be changed
          var promise = $http.get(__env.dataServerUrl + '/dashboard/currentActive?siteId=' + siteId)
              .then(

                  function (response) {
                      return response;
                  },
                  function (response) {
                      return response;
                  });
          return promise;
      };

      service.getEnergyData = function (siteId) { // TODO below need to be changed
          var promise = $http.get(__env.dataServerUrl + '/dashboard/dgMainHistogram?siteId=' + siteId)
              .then(

                  function (response) {
                      return response;
                  },
                  function (response) {
                      return response;
                  });
          return promise;
      };

      service.getTemperatureData = function (siteId) { // TODO below need to be changed
          var promise = $http.get(__env.dataServerUrl + '/dashboard/temperature?siteId=' + siteId)
              .then(

                  function (response) {
                      return response;
                  },
                  function (response) {
                      return response;
                  });
          return promise;
      };


      service.getSupplyData = function (siteId) { // TODO below need to be changed
          var promise = $http.get(__env.dataServerUrl + '/dashboard/parameters?siteId=' + siteId)
              .then(

                  function (response) {
                      return response;
                  },
                  function (response) {
                      return response;
                  });
          return promise;
      };

      service.getAssetData = function (siteId) { // TODO below need to be changed
          var promise = $http.get(__env.dataServerUrl + '/dashboard/acStatus?siteId=' + siteId)
              .then(
                  function (response) {
                      return response;
                  },
                  function (response) {
                      return response;
                  });
          return promise;
      };
  service.getAlertData = function (siteId) { // TODO below need to be changed
     var promise = $http.get(__env.notificationServerUrl + '/alarms/dashboardData?siteId=' + siteId)
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

     service.allSiteData = function(id) {
      var promise = $http.get(__env.dataServerUrl + '/dashboard/currentActive/activeSites')
        .then(
          function (response) {
            return response;
          },
          function (response) {
            return response;
          });
      return promise;
    };

    service.getAssetInfo = function(siteId) {
      var promise = $http.get(__env.dataServerUrl + '/assetStatus/digitalOutput?siteId=' + siteId)
        .then(
          function (response) {
            return response;
          },
          function (response) {
            return response;
          });
      return promise;
    };

      service.sendAssetInfo = function (data) {
          var promise = $http.post(__env.dataServerUrl + '/assetStatus/saveAssetStatus/' + siteId , data)
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
