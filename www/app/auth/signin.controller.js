(function() {
  'use strict';

  angular
    .module('app.auth')
    .controller('SigninController', SigninController);

  SigninController.$inject = ['$scope', 'logger', '$state', 'principal', "__env"];
  /* @ngInject */
  function SigninController($scope, logger, $state, principal,  __env) {
    var vm = this;

    vm.signin = signin;

    function signin(form) {
      if(form.$valid) {
        principal.signin(vm.user, vm.password, vm.rememberMe).then(function(){
          logger.info("User logged in successfully");
          //should we change below statement based on role?
          $state.go('app.dashboard');
        }, function(){
          logger.error("Wrong user credentials");
        });
      }
    }

    activate();

    function activate() {
      //TODO to be removed;
      vm.user = __env.user;
      vm.password = __env.password;
    }
  }
})();
