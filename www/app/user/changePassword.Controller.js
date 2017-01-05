(function () {
  'use strict';

  angular
    .module('app.user')
    .controller('ChangePasswordController', ChangePasswordController);

  ChangePasswordController.$inject = ['$q', 'changePasswordFactory', '$state', 'logger','validationHelperFactory', '$location', '$stateParams', '$localStorage'];

  function ChangePasswordController($q, changePasswordFactory, $state, logger, validationHelperFactory, $location, $stateParams, $localStorage) {
    var vm = this;

    vm.passData = {};
    var userid = $localStorage._identity.userDetails.id;

    vm.submit = function () {
      vm.passData.password = vm.password;
      vm.passData.newPassword = vm.newPassword;
      vm.passData.id = userid;

      var firstError = null;
      if (vm.Form.$invalid) {
        validationHelperFactory.manageValidationFailed(vm.Form);
        return;
      }
      else {
        //console.log(vm.passData);
        changePasswordFactory.change(vm.passData).then(function (response) {

          if (response.status == 200) {
            logger.info('Password Changed', 'default');
            $state.go('auth.signin');
          }
          else if (response.status == -1) {
            logger.error('Network Error', 'error');
            console.error(response);
          }
          else if (response.status == 400) {
            logger.error(response.data[0].message, 'error');
            console.error(response);
          }
          else {
            logger.error(response.data[0].message, 'error');
            console.error(response);
          }
        });

      }
    };

  }
}());
