(function() {
  'use strict';

  angular
    .module('app.dashboard')
    .controller('CommandController', CommandController);

  CommandController.$inject = ['$state'];
  /* @ngInject */
  function CommandController($state) {
    var vm = this;
    vm.temp = {};

    activate();

    function activate() {

      $state.go('app.command');    
    }
  }
})();

