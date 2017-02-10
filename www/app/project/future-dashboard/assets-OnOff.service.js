(function () {
  'use strict';

  angular
    .module('app.layout')
    .factory('assetControllerfactory',assetControllerfactory);

  assetControllerfactory.$inject = ['$http', '__env'];

  function assetControllerfactory($http, __env) {
    var service = {};

    service.getAssetInfo = function (siteId) {
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

    service.sendAssetInfo = function (data,siteId) {
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
}());
