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

  ActiveHourWidgetCtrl.$inject = ['$http', '$localStorage' , '$scope' ,'$timeout', '$ionicScrollDelegate'];

  function ActiveHourWidgetCtrl($http, $localStorage , $scope , $timeout, $ionicScrollDelegate) {
    var vm = this;
    vm.scrollTop = scrollTop;
    
     function scrollTop () {
        $ionicScrollDelegate.scrollTop();
        console.log(scrollTop());
      }

  }
})();
