(function () {
    'use strict';

    angular
        .module('app.dashboard')
        .controller('NotificationController', NotificationController);

    NotificationController.$inject = ['$scope', '$q', 'logger', 'dashboardFactory'];
    /* @ngInject */
    function NotificationController($scope, $q, logger, dashboardFactory) {
        var vm = this;
        vm.activate = activate;

    function activate() {

    	 dashboardFactory.getAlertData().then(function (response) {
                if(response.data != null) {
                  vm.data = response.data;
                  console.log(response.data)
                }
              })
                .catch(function (error) {
                  logger.error(error);
                });

    }
    activate();
        var myInterval = $interval(function () {
            vm.activate();
        }, DASHBOARD_REFRESH_RATE.TIME_INTERVAL);

        $scope.$on('$destroy', function(){
            $interval.cancel(myInterval)
        });

}

})();