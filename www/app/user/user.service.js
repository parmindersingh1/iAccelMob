(function () {
  'use strict';

  angular
    .module('app.user')

    .factory('userService', userService);

    userService.$inject = ['$http', '$localStorage', '__env'];

    function userService($http, $localStorage, __env) {
      var service = {};
      service.getUser= function() {
        var userID = $localStorage._identity.userDetails.id;

        activate(userID);

        function activate(id) {
          return userProfileFactory.alluser(id).then(function (response) {
                    if (response.status == 200) {
                      vm.master = response.data;
                      vm.user = angular.copy(vm.master);
                    }
                    else if (response.status == 404) {
                      console.error('User not found', 'error');
                      console.error(response);
                    }
                    else if (response.status == -1) {
                      console.error('Network Error', 'error');
                      console.error(response);
                    }
                    else {
                      console.error('Backend error', 'error');
                      console.error(response);
                    }
                  });
                }
      };


      return service;
   }

}());
