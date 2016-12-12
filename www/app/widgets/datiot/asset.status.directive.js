(function () {
  'use strict';

  angular
    .module('app.dashboard')
    .directive('dtAssetStatusWidget', dtAssetStatusWidget);

  function dtAssetStatusWidget() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/widgets/datiot/assetsStatus.html',
      scope: {
        data: '=data',
        method: '&activate'
      },
      controller: AssetStatusWidgetCtrl,
      link: link,
      controllerAs: 'assetStatus',
      bindToController: true
    };

    return directive;
  }

  function link($scope) {

    $scope.$watch($scope.user);
  }

  AssetStatusWidgetCtrl.$inject = ['$http', '$localStorage' , '$scope'];

  function AssetStatusWidgetCtrl($http, $localStorage , $scope) {
    var vm = this;
    vm.refresh = refresh;

    function refresh (){
      $scope.assetStatus.method();
    }


  }
})();
