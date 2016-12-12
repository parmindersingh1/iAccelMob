(function () {
  'use strict';

  angular
    .module('app.dashboard')
    .directive('dtMainsReadingWidget', dtMainsReadingWidget);

  function dtMainsReadingWidget() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/widgets/datiot/mainSupply.html',
      scope: {
        data: '=data',
        method: '&activate'
      },
      controller: MainsReadingWidgetCtrl,
      link: link,
      controllerAs: 'mainsReading',
      bindToController: true
    };

    return directive;
  }

  function link($scope) {

    $scope.$watch($scope.user);
  }

  MainsReadingWidgetCtrl.$inject = ['$http', '$localStorage' , '$scope'];

  function MainsReadingWidgetCtrl($http, $localStorage , $scope) {
    var vm = this;

    vm.refresh = refresh;


    function refresh(){
       $scope.mainsReading.method();
    }

  }
})();


