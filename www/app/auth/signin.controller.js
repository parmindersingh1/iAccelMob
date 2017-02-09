(function() {
  'use strict';

  angular
    .module('app.auth')
    .controller('SigninController', SigninController);

  SigninController.$inject = ['$scope', 'logger', '$state', 'principal', '__env' , 'ConnectivityMonitor' ,'$ionicPopup', '$ionicPlatform' , '$localStorage', '$ionicHistory'];
  /* @ngInject */
  function SigninController($scope, logger, $state, principal,  __env , ConnectivityMonitor , $ionicPopup, $ionicPlatform , $localStorage, $ionicHistory) {
    var vm = this;
    vm.signin = signin;

    $ionicPlatform.ready(function() {
      if (!ConnectivityMonitor.isOnline()) {
        //logger.error("No Internet Connection")
        $ionicPopup.show({
          title: 'No Internet',
          template: 'App is unable to connect to our system. Please check your WIFI or network connectivity',
          buttons: [
            {
              text: 'Exit',
              type: 'button-assertive',
              onTap: function () {
                ionic.Platform.exitApp();
              }
            }]
        });
      }
    });

    function signin(form) {
      if(form.$valid) {
        principal.signin(vm.user, vm.password, vm.rememberMe).then(function(){
          logger.info("User logged in successfully");
          if($localStorage._identity.sites.length > 1){
            //should we change below statement based on role?
            $state.go('app.dashboardAll');
          }
          else {
            $state.go('app.dashboard',({id : $localStorage._identity.sites[0].id}))
          }
          $ionicHistory.clearHistory();
          $ionicHistory.clearCache();
          $ionicHistory.nextViewOptions({
              disableBack: true
          });

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
