(function() {
  'use strict';

  angular
    .module('app.user')
    .factory('changePasswordFactory', changePasswordFactory);

  changePasswordFactory.$inject = ['$http', '__env'];

  function changePasswordFactory($http, __env) {
    var service = {};
    var apiUser = __env.apiUser;

    service.change = function (passData) {
      var promise = $http.put(__env.userServerUrl + '/changePassword',passData)
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
