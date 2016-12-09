(function () {
  'use strict';

  angular
    .module('app.dashboard')
    .directive('dtLineGraphWidget', dtLineGraphWidget);

  function dtLineGraphWidget() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/widgets/datiot/lineGraph.html',
      scope: {
        data: '=data',
        method: '&activate'
      },
      controller: LineGraphWidgetCtrl,
      link: link,
      controllerAs: 'lineGraph',
      bindToController: true
    };

    return directive;
  }

  function link($scope) {

    $scope.$watch($scope.user);
  }

  LineGraphWidgetCtrl.$inject = ['$http', '$localStorage' , '$scope'];

  function LineGraphWidgetCtrl($http, $localStorage , $scope) {
    var vm = this;

  
  }
})();
