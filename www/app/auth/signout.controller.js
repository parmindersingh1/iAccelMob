(function() {
  'use strict';

  angular
    .module('app.auth')
    .controller('SignoutController', SignoutController);

  SignoutController.$inject = ['$state', 'principal', '$ionicHistory'];
  /* @ngInject */
  function SignoutController($state, principal, $ionicHistory) {
    var vm = this;

    activate();

    function activate() {
      principal.signout();
      console.log("User log out successfully");
      $ionicHistory.clearHistory();
      $ionicHistory.clearCache();
      $ionicHistory.nextViewOptions({
          disableBack: true
      });
      $state.go('auth.signin');

    }

  }
})();
