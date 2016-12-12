(function () {
  'use strict';

  angular
    .module('app.dashboard')
    .directive('dtBarGraphWidget', dtBarGraphWidget);

  function dtBarGraphWidget() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/widgets/datiot/barGraph.html',
      scope: {
        data: '=data',
        method: '&activate',
        color: '@'
      },
      controller: BarGraphWidgetCtrl,
      link: link,
      controllerAs: 'barGraph',
      bindToController: true
    };

    return directive;
  }

  function link($scope) {
    $scope.$watch($scope.user);
  }

  BarGraphWidgetCtrl.$inject = ['$http', '$localStorage' , '$scope' , '$timeout'];

  function BarGraphWidgetCtrl($http, $localStorage , $scope , $timeout) {
    var vm = this;
    console.log(this.color);

  }
})();
