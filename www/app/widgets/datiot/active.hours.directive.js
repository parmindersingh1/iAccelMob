(function () {
  'use strict';

  angular
    .module('app.dashboard')
    .directive('dtActiveHourWidget', dtActiveHourWidget);

  function dtActiveHourWidget() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/widgets/datiot/activeHours.html',
      scope: {
        data: '=data',
        method: '&activate'
      },
      controller: ActiveHourWidgetCtrl,
      link: link,
      controllerAs: 'activeHour',
      bindToController: true
    };

    return directive;
  }

  function link($scope) {
    $scope.$watch($scope.user);
  }

  ActiveHourWidgetCtrl.$inject = ['$http', '$localStorage' , '$scope' ,'$timeout'];

  function ActiveHourWidgetCtrl($http, $localStorage , $scope , $timeout) {
    var vm = this;
    


  }
})();
