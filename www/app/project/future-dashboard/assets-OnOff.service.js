(function () {
  'use strict';

  angular
    .module('app.layout')
    .factory('assetControllerfactory',assetControllerfactory);

  assetControllerfactory.$inject = ['$http', '__env'];

  function assetControllerfactory($http, __env) {
    var service = {};

    service.getAssetInfo = function () {
      var promise = $http.get(__env.dataServerUrl + '/assetStatus/digitalOutput?siteId=58005c16e855161f7d388cf0')
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
      var promise = $http.post(__env.dataServerUrl + '/assetStatus/saveAssetStatus/58005c16e855161f7d388cf0' , data)
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
}());
