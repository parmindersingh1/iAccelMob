(function () {
  'use strict';

  angular
    .module('app.dashboard')
    .directive('dtAlertsWidget', dtAlertsWidget);

  function dtAlertsWidget() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/widgets/datiot/alertsDashboard.html',
      scope: {
        data: '=data',
        method: '&activate'
      },
      controller: AlertsDashboardWidgetCtrl,
      link: link,
      controllerAs: 'alerts',
      bindToController: true
    };

    return directive;
  }

  function link($scope) {

    $scope.$watch($scope.user);
  }

 AlertsDashboardWidgetCtrl.$inject = ['$http', '$localStorage' , '$scope'];

  function AlertsDashboardWidgetCtrl($http, $localStorage , $scope) {
    var vm = this;
    vm.refresh = refresh;
  
    function refresh (){
      $scope.alerts.method();
    }


  }
})();



