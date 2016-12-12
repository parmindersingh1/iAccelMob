(function () {
  'use strict';

  angular.module('app.widgets').directive('dtExpensesGraph', dtExpensesGraph);

  function dtExpensesGraph() {
    var directive = {
      templateUrl: 'app/widgets/expensesGraph.html',
      restrict: 'E',
      scope: {
        expensesgraphdata: '='
      },
      controller: ExpensesGraphCtrl,
      controllerAs: 'vm',
      bindToController: true
    };
    return directive;
  }

  ExpensesGraphCtrl.$inject = ['$scope'];

  function ExpensesGraphCtrl($scope) {
    var vm = this;

    activate();

    function activate() {

      vm.colors = [{
        backgroundColor : 'rgba(154,137,181,0.6)'
      }];

      vm.options = {
                // Sets the chart to be responsive
               responsive: true,
               maintainAspectRatio: true,
               elements: {
                   rectangle: {
                       borderWidth: 0
                   }
                 },
                 scales: {
                   yAxes: [
                     {
                       display: false,
                       position: 'left',
                       ticks: {
                           beginAtZero:true
                       }
                     },
                     {
                       display: false,
                       position: 'right',
                       ticks: {
                           beginAtZero:true
                       }
                     }
                   ],
                   xAxes: [
                     {
                       barPercentage: 0.8,
                       display: false
                     }
                   ]
                 }
                //  ,
                //  elements: {
                //    rectangle: {
                //        borderWidth: 1,
                //        borderColor: 'rgba(255,255,244,0.1)'
                //    }
                //  }


             };

    }

  }
})();
