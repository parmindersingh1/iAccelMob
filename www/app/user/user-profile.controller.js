(function () {
  'use strict';

  angular
    .module('app.user')
    .controller('userProfileController', UserProfileController);

  UserProfileController.$inject = ['$localStorage', '__env' ,'userProfileFactory' ,'$state' , '$scope'];

  function UserProfileController( $localStorage, __env ,userProfileFactory ,$state , $scope) {
    var vm = this;
     vm.reset = reset;

      var userID = $localStorage._identity.userDetails.id;

    activate(userID);

    function reset() {
      activate(userID);
    }

    function activate(id) {
      userProfileFactory.alluser(id).then(function (response) {
          if (response.status == 200) {
            vm.master = response.data;
              console.log(response.data)
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

    $scope.$on('reload', function(asd) {
        activate(userID);
        console.log('mass');
    });


  }
}());
