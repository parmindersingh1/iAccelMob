(function () {
  'use strict';

  angular.module('app.widgets').directive('dtBarGraph', dtBarGraph);

  function dtBarGraph() {
    var directive = {
      templateUrl: 'app/widgets/barGraph.html',
      restrict: 'E',
      scope: {
        bargraphdata: '='
      },
      controller: BarGraphCtrl,
      controllerAs: 'vm',
      bindToController: true
    };
    return directive;
  }

  BarGraphCtrl.$inject = ['$scope'];

  function BarGraphCtrl($scope) {
    var vm = this;

    activate();

    function activate() {
          vm.colors = [{backgroundColor: 'rgba(148,116,153,0.7)'},{backgroundColor: 'rgba(127,140,141,0.7)'}];

          vm.options = {
             // Sets the chart to be responsive
            responsive: true,
            maintainAspectRatio: true,
            elements: {
                rectangle: {
                    borderWidth: 1
                }
              },
              scales: {
                  yAxes:[{
                    ticks: {
                        beginAtZero:true
                    }
                  }]
                }

          };

    }

  }
})();
