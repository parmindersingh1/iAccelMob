(function () {
  'use strict';

  angular
    .module('app.layout')
    .controller('sideMenuController', sideMenuController);

  sideMenuController.$inject = ['$q', 'userProfileFactory', '$localStorage', 'role', 'ACCESS_LEVEL'];

  /* @ngInject */


  function sideMenuController($q, userProfileFactory, $localStorage, role, ACCESS_LEVEL) {
    var vm = this;

    var userID = $localStorage._identity.userDetails.id;

    activate(userID);

    function activate(id) {
      userProfileFactory.alluser(id).then(function (response) {
          if (response.status == 200) {
            vm.master = response.data;
            vm.user = angular.copy(vm.master);
            //server side image issue
            vm.user.profilePictureUrl = "https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg";
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



    vm.isAdminRole = role.isAdminRole();
    vm.isViewerRole = role.isViewerRole();
    vm.currentAccessLevel = role.currentAccessLevel();
    vm.ACCESS_LEVEL = ACCESS_LEVEL;


  // for multivel side menu
    // vm.group = {};
    // vm.group.admin = 'admin';
    // vm.group.user = 'user';
    //
    // vm.toggleGroup = function(group) {
    //   if (vm.isGroupShown(group)) {
    //     vm.shownGroup = null;
    //   } else {
    //     vm.shownGroup = group;
    //   }
    // };
    // vm.isGroupShown = function(group) {
    //   return vm.shownGroup === group;
    // };


      }

})();
