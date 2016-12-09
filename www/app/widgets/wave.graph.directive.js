(function () {
  'use strict';

  angular.module('app.widgets').directive('dtWaveGraph', dtWaveGraph);

  function dtWaveGraph() {
    var directive = {
      templateUrl: 'app/widgets/waveGraph.html',
      restrict: 'E',
      scope: {
        wavegraphdata: '='
      },
      controller: WaveGraphCtrl,
      controllerAs: 'vm',
      bindToController: true
    };
    return directive;
  }

  WaveGraphCtrl.$inject = ['$scope'];

  function WaveGraphCtrl($scope) {
    var vm = this;

    activate();

    function activate() {
      // vm.datasetOverride = [{ yAxisID: 'y-axis-1' }, { yAxisID: 'y-axis-2' }];
      vm.colors = [{
        backgroundColor : 'rgba(90,135,112,0.6)',
        borderColor : 'rgba(90,135,112,1)',
        pointBackgroundColor : 'rgba(90,135,112,1)'
      }, {
        backgroundColor : 'rgba(127,140,141,0.6)',
        borderColor : 'rgba(127,140,141,1)',
        pointBackgroundColor : 'rgba(127,140,141,1)'
      }, {
        backgroundColor : 'rgba(148,116,153,0.6)',
        borderColor : 'rgba(148,116,153,1)',
        pointBackgroundColor : 'rgba(148,116,153,1)'
      }];


    vm.options = {
        responsive: true,
        maintainAspectRatio: true,
        elements: {
            point: {
                radius: 0,
                borderWidth: 0,
                hoverRadius: 0
            },
        },
        animation: {
            //easing: 'easeInQuad',
            duration: 1000
        }
      };

    }

  }
})();
