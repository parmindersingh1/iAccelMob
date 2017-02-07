(function () {
  'use strict';

  angular
    .module('app.layout')
    .controller('sideMenuController', sideMenuController);

  sideMenuController.$inject = ['$scope','$q', 'userProfileFactory', '$localStorage', 'role', 'ACCESS_LEVEL', '$ionicSideMenuDelegate'];

  /* @ngInject */


  function sideMenuController($scope,$q, userProfileFactory, $localStorage, role, ACCESS_LEVEL, $ionicSideMenuDelegate) {
    var vm = this;

    vm.user = $localStorage._identity.userDetails;
    vm.siteList = $localStorage._identity.sites;


    vm.isAdminRole = role.isAdminRole();
    vm.isViewerRole = role.isViewerRole();
    vm.currentAccessLevel = role.currentAccessLevel();
    vm.ACCESS_LEVEL = ACCESS_LEVEL;
    console.log("vm.ACCESS_LEVEL is",role.isAdminRole());


    $scope.$watch(function () {
      return $ionicSideMenuDelegate.isOpenLeft();
    },
       function (isOpen) {
      if (isOpen){
        vm.user = $localStorage._identity.userDetails;
      }

    });
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
