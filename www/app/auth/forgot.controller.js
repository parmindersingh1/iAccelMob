(function() {
  'use strict';

  angular
    .module('app.auth')
    .controller('ForgotController', ForgotController);

  ForgotController.$inject = ['$q','forgotFactory','$state', 'validationHelperFactory', 'logger'];

  function ForgotController($q, forgotFactory, $state, validationHelperFactory, logger) {
    var vm = this;

    vm.submit = function() {
      var firstError = null;
      if (form.$invalid) {
        validationHelperFactory.manageValidationFailed(vm.form);
        return;
      }
      else {

        forgotFactory.abc(vm.email).then(function (response) {

          if (response.status == 200) {
            logger.info('Password Reset Link Sent To E-Mail');
            $state.go('auth.signin');
          }
          else if (response.status == -1) {
            logger.error('Network Error');
            console.error(response);
          }
          else if (response.status == 400) {
            logger.error('Invalid data received at backend');
            console.error(response);
          }else if (response.status == 404) {
            logger.error(response.data[0].message);
          }
          else {
            logger.error('Some problem');
            console.error(response);
          }
        });

      }
    }

  }

}());
