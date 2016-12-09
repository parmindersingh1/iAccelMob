(function() {
  'use strict';

  angular
    .module('app.user')
    .factory('userProfileFactory', userProfileFactory);

  userProfileFactory.$inject = ['$http', '$localStorage', '__env'];

  function userProfileFactory($http, $localStorage, __env) {
    var service = {};
    var userID = $localStorage._identity.userDetails.id;

    service.edit = function (user) {
      var promise = $http.post(__env.userServerUrl + '/editUser/'+userID,user)
        .then(

          function (response) {
            return response;
          },
          function (response) {
            return response;
          });
      return promise;
    };
    service.alluser = function (id) {
     // console.log("Inside console.log(response)");
     var promise = $http.get(__env.userServerUrl + '/users/' + id)
       .then(
         function (data) {
           // console.log("data service.getAll : ");
           console.log(data);
           return data;
         },
         function (errors) {
           console.log("data error service.getAll : ");
           console.log(errors);
           return errors;
         });
     return promise;
   };

    return service;
  };
}());
