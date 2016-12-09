(function () {
  'use strict';

  angular
    .module('app.user')
    .controller('userProfileController', UserProfileController);

  UserProfileController.$inject = ['$localStorage', '__env' ,'userProfileFactory' ,'$state' ];

  function UserProfileController( $localStorage, __env ,userProfileFactory ,$state) {
    var vm = this;

    var userID = $localStorage._identity.userDetails.id;

    activate(userID);

    function activate(id) {
      userProfileFactory.alluser(id).then(function (response) {
          if (response.status == 200) {
            vm.master = response.data;
            console.log(response.data);
            vm.user = angular.copy(vm.master);
            console.log(vm.user );
            // vm.user.profilePictureUrl = "https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg";
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
          // self.resetDisabled = false;
          // self.submitDisabled = false;
        });
    }


  }
}());
