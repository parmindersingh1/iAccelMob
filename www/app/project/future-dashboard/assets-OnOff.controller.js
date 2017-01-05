(function() {
  'use strict';

  angular
    .module('app.dashboard')
    .controller('ControlAsset', ControlAsset);

  ControlAsset.$inject = ['assetControllerfactory', '$state', 'logger', '$http', 'validationHelperFactory', '$localStorage', '__env', '$scope'];
  /* @ngInject */
  function ControlAsset(assetControllerfactory, $state, logger, $http, validationHelperFactory, $localStorage, __env, $scope) {
    var vm = this;
    vm.temp = {};
    vm.title = "command";
    activate();

    function activate() {
       vm.disableTime = true;

      assetControllerfactory.getAssetInfo().then(function (response) {
        if (response.status == 200) {
          vm.master = angular.copy(response.data);
          if(vm.master.AC1.disabled || vm.master.AC2.disabled || vm.master.AC3.disabled || vm.master.Signage.disabled){
            vm.disableTime = false;
          }
          if(vm.master.AC1.status == 1.00){
            vm.master.AC1.status = true;
          }
          else{
            vm.master.AC1.status = false;
          }
          if(vm.master.AC2.status == 1.00){
            vm.master.AC2.status = true;
          }
          else{
            vm.master.AC2.status = false;
          }
          if(vm.master.AC3.status == 1.00){
            vm.master.AC3.status = true;
          }
          else{
            vm.master.AC3.status = false;
          }
          if(vm.master.Signage.status == 1.00){
            vm.master.Signage.status = true;
          }
          else{
            vm.master.Signage.status = false;
          }
          console.log(vm.master)
          vm.control = angular.copy(vm.master);

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
  }
})();





