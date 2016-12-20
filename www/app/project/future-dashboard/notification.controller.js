(function () {
    'use strict';

    angular
        .module('app.dashboard')
        .controller('NotificationController', NotificationController);

    NotificationController.$inject = ['$scope', '$q', 'logger'];
    /* @ngInject */
    function NotificationController($scope, $q, logger ) {
        var vm = this;


    }

})();