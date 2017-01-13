(function() {
  'use strict';

  angular
    .module('app.dashboard')
    .controller('ControlAsset', ControlAsset);

  ControlAsset.$inject = ['$scope','assetControllerfactory', '$state', 'logger', '$http', 'validationHelperFactory', '$localStorage', '__env', '$ionicHistory','$interval', 'DASHBOARD_REFRESH_RATE'];
  /* @ngInject */
  function ControlAsset($scope, assetControllerfactory, $state, logger, $http, validationHelperFactory, $localStorage, __env, $ionicHistory, $interval, DASHBOARD_REFRESH_RATE) {
    var vm = this;
    vm.temp = {};
    vm.title = "command";
    vm.progress = true;
    activate();

    function activate() {
       vm.disableTime = true;

      assetControllerfactory.getAssetInfo().then(function (response) {
        vm.progress = false;
        if (response.status == 200) {
          if (response.data != null) {
            vm.master = angular.copy(response.data);

            for (var index=0 ; index<vm.master.length ; index++){

              if(vm.master[index].disabled) {
                vm.disableTime = false;
              }

              if (vm.master[index].status == 1.00) {
                vm.master[index].status = true;
              }
              else {
                vm.master[index].status = false;
              }
            }

            vm.control = angular.copy(vm.master);
          }
        }
        else if (response.status == 404) {
          logger.error('User not found', 'error');
          console.error(response);
        }
        else if (response.status == -1) {
          logger.error('Network Error', 'error');
          console.error(response);
        }
        else {
          logger.error('Backend error', 'error');
          console.error(response);
        }
      });
      // $state.go('app.command');

    }

    vm.saveController = function () {
      console.log(vm.control)
      vm.temp = {};
      for (var index=0 ; index<vm.control.length ; index++) {
        vm.temp[vm.control[index].assetName] = {};
        vm.temp[vm.control[index].assetName] = vm.control[index];
      }
      console.log(vm.temp);
      assetControllerfactory.sendAssetInfo(vm.temp).then(function (response) {
        if (response.status == 200) {
          console.log(response.data);
          $state.go("app.dashboard");
          logger.info('Asset Status Changed', 'default');
          vm.disableTime = false;
        }
        else if (response.status == -1) {
          logger.error('Network Error', 'error');
          console.error(response);
        }
        else if (response.status == 400) {
          logger.error(response.data.errors[0].message, 'error');
          console.error(response);
        }
        else {
          logger.error('Some problem', 'error');
          console.error(response);
        }
      });
    };

    vm.onCancel = function() {
      $ionicHistory.nextViewOptions({
        disableBack: true
      });
      $state.go("app.dashboard");
    }

  }
})();





