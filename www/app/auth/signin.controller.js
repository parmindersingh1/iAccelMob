(function() {
  'use strict';

  angular
    .module('app.auth')
    .controller('SigninController', SigninController);

  SigninController.$inject = ['$scope', 'logger', '$state', 'principal', '__env' , '$cordovaNetwork'];
  /* @ngInject */
  function SigninController($scope, logger, $state, principal,  __env , $cordovaNetwork) {
    var vm = this;

    vm.signin = signin;
    function checkConnection() {
      var networkState = navigator.connection.type;

      var states = {};
      states[Connection.UNKNOWN]  = 'Unknown connection';
      states[Connection.ETHERNET] = 'Ethernet connection';
      states[Connection.WIFI]     = 'WiFi connection';
      states[Connection.CELL_2G]  = 'Cell 2G connection';
      states[Connection.CELL_3G]  = 'Cell 3G connection';
      states[Connection.CELL_4G]  = 'Cell 4G connection';
      states[Connection.CELL]     = 'Cell generic connection';
      states[Connection.NONE]     = 'No network connection';

      console.log('Connection type: ' + states[networkState]);
    }

    checkConnection();

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
