(function () {
  'use strict';

  angular
    .module('app.layout')
    .controller('sideMenuController', sideMenuController);

  sideMenuController.$inject = ['$q', 'userProfileFactory', '$localStorage', 'role', 'ACCESS_LEVEL'];

  /* @ngInject */


  function sideMenuController($q, userProfileFactory, $localStorage, role, ACCESS_LEVEL) {
    var vm = this;

    vm.user = $localStorage._identity.userDetails;


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
