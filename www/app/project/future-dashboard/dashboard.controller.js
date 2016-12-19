(function () {
  'use strict';

  angular
    .module('app.dashboard')
    .controller('DashboardController', DashboardController);

  DashboardController.$inject = ['$scope', '$q', 'logger', 'dashboardFactory'];
  /* @ngInject */
  function DashboardController($scope, $q, logger, dashboardFactory ) {
    var vm = this;
    vm.dashboard = {};
    vm.dashboardData = {};
    vm.title = 'Site Dashboard';
    vm.subTitle = "Dwarka, New Delhi, Easyday";
    vm.siteLocation = '';


    activate();

    function activate() {

      var promises = [getDashboard(), getDashboardData(), getData(), getDashboardSites()];
      return $q.all(promises).then(function () {
        // logger.info('Activated Dashboard View');
      });




      // var promises = [getMessageCount(), getPeople()];
      // return $q.all(promises).then(function() {
      //   //logger.info('Activated Dashboard View');
      // });

    }

    function getData() {
      return dashboardFactory.getData()
        .then(function (response) {
          console.log(response);
          vm.boxData = response.data.dashboardData.item;
          vm.BarGraphData = response.data.barGraphData;
          vm.WaveGraphData = response.data.waveGraphData;
          vm.ExpensesGraphData = response.data.expensesGraphData;
          vm.KnobData = response.data.realTimeKnobData;
        })
        .catch(function (error) {
          logger.error(error);
        });
    }

    function getDashboard() {
      return dashboardFactory.getDashboard().then(function (response) {
        console.log(response.data.title);
        vm.dashboard = response.data;
        vm.title = response.data.title;
        return vm.dashboard;
      });
    }

    function getDashboardData() {
      return dashboardFactory.getDashboardData().then(function (response) {
        //console.log(response.data);
        vm.dashboardData = response.data;
        return vm.dashboardData;
      });
    }

    function getDashboardSites() {
      vm.markers = [];
      return dashboardFactory.getDashboardSites().then(function (response) {
        var data = response.data;
        vm.markers = data.markers;
        vm.siteLocation = data.center;
        return null;
      });
    }

  }

})();


angular
  .module('app.dashboard').controller('ConsumptionCtrl', ["$scope" , "dashboardFactory" ,
  function($scope , dashboardFactory) {

    var mains = this;
    mains.temp = {};
    mains.temp2 = {};

    mains.activate = function (){
      dashboardFactory.getMainsData().then(function (response) {

        if(response.data != null) {

          var temp = [];
          temp[0] = response.data.last20DaysConsumptions;
          mains.temp.last20DaysConsumptions = temp;
          mains.temp.assetName = response.data.assetName;
          mains.temp.todayConsumption = response.data.todayConsumption;
          mains.temp.variation = response.data.variation;
          mains.temp.variationPercentage = response.data.variationPercentage;
          mains.data = mains.temp;
        }
      })
        .catch(function (error) {
          logger.error(error);
        });
    }

    mains.activate();

    mains.activateGenset = function (){
      dashboardFactory.getGensetData().then(function (response) {

        if(response.data != null) {

          var temp = [];
          temp[0] = response.data.last20DaysConsumptions;
          mains.temp2.last20DaysConsumptions = temp;
          mains.temp2.assetName = response.data.assetName;
          mains.temp2.todayConsumption = response.data.todayConsumption;
          mains.temp2.variation = response.data.variation;
          mains.temp2.variationPercentage = response.data.variationPercentage;

          mains.dataGenset = mains.temp2;
        }
      })
        .catch(function (error) {
          logger.error(error);
        });
    }

    mains.activateGenset();

  }]);

  angular
    .module('app.dashboard').controller('ActiveHourCtrl', ["$scope", "dashboardFactory" ,
    function($scope , dashboardFactory) {

      var vm = this;

      vm.activate = function (){
        dashboardFactory.getActiveHourData().then(function (response) {

          vm.data = response.data;
        })
          .catch(function (error) {
            logger.error(error);
          });
      }

      vm.activate();

    }]);


    angular
      .module('app.dashboard').controller('TemperatureCtrl', ["$scope", "dashboardFactory" ,
      function($scope , dashboardFactory ) {

        var vm = this;
        vm.temp = {};

        vm.activate = function (){
          dashboardFactory.getTemperatureData().then(function (response) {

            if(response.data != null) {

              vm.temp.ambientTemperature = response.data.ambientTemperature;
              vm.temp.alterenateTemperature = response.data.alterenateTemperature;
              var tempList = [];
              tempList[0] = response.data.ambientTemperatureLsit;
              vm.temp.dateLabels = response.data.dateLabels
              vm.temp.ambientTemperatureLsit = tempList;

              vm.data = vm.temp;
            }

          })
            .catch(function (error) {
              console.error(error);
            });
        }

        vm.activate();

      }]);

      angular
        .module('app.dashboard').controller('MainSupplyCtrl', ["$scope", "dashboardFactory" ,
        function($scope , dashboardFactory ) {

          var vm = this;

          vm.activate = function (){
            dashboardFactory.getSupplyData().then(function (response) {

              vm.data = response.data;
            })
              .catch(function (error) {
                console.error(error);
              });
          }

          vm.activate();

        }]);

        angular
          .module('app.dashboard').controller('AssetStatusCtrl', ["$scope", "dashboardFactory","logger" ,
          function($scope , dashboardFactory, logger) {

            var vm = this;

            vm.activate = function (){
              dashboardFactory.getAssetData().then(function (response) {
                if(response.data != null) {
                  vm.data = response.data;
                }
              })
                .catch(function (error) {
                  logger.error(error);
                });
            }

            vm.activate();

          }]);


          angular
          .module('app.dashboard').controller('AlertsDashboardCtrl', ["$scope", "dashboardFactory","logger" ,
          function($scope , dashboardFactory, logger) {

            var vm = this;

            vm.activate = function (){
              dashboardFactory.getAlertData().then(function (response) {
                if(response.data != null) {
                  vm.data = response.data;
                }
              })
                .catch(function (error) {
                  logger.error(error);
                });
            }

            vm.activate();

          }]);





// angular
//   .module('app.dashboard').controller('BarCtrl', ["$scope",
//   function($scope) {
//     $scope.labels = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'a', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'i', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
//     $scope.series = ['dataset'];
//     $scope.data = [[65, 59, 80, 81, 56, 55, 40, 65, 59, 80, 81, 56, 55, 40, 65, 59, 80, 81, 56, 55, 40, 65, 59, 80, 81, 56, 80, 81]];
//     $scope.colors = [{
//       fillColor : 'rgba(154,137,181,0.6)',
//       highlightFill : 'rgba(154,137,181,0.9)'
//     }];
//     // Chart.js Options - complete list at http://www.chartjs.org/docs/
//     $scope.options = {
//       maintainAspectRatio : false,
//       showScale : false,
//       barDatasetSpacing : 0,
//       tooltipFontSize : 11,
//       tooltipFontFamily : "'Helvetica', 'Arial', sans-serif",
//       responsive : true,
//       scaleBeginAtZero : true,
//       scaleShowGridLines : false,
//       scaleLineColor : 'transparent',
//       barShowStroke : false,
//       barValueSpacing : 5
//     };
//
//   }]);
//
// angular
//   .module('app.dashboard').controller('SalesCtrl', ["$scope",
//   function($scope) {
//     $scope.labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
//     $scope.series = ['First', 'Second'];
//     $scope.data = [[65, 59, 80, 81, 56, 55, 40], [28, 48, 40, 19, 86, 27, 90]];
//     $scope.colors = [{
//       fillColor : 'rgba(148,116,153,0.7)',
//       highlightFill : 'rgba(148,116,153,1)'
//     }, {
//       fillColor : 'rgba(127,140,141,0.7)',
//       highlightFill : 'rgba(127,140,141,1)'
//     }];
//     // Chart.js Options - complete list at http://www.chartjs.org/docs/
//     $scope.options = {
//       maintainAspectRatio : false,
//       tooltipFontSize : 11,
//       tooltipFontFamily : "'Helvetica', 'Arial', sans-serif",
//       responsive : true,
//       scaleFontFamily : "'Helvetica', 'Arial', sans-serif",
//       scaleFontSize : 11,
//       scaleFontColor : "#aaa",
//       scaleBeginAtZero : true,
//       tooltipTitleFontFamily : "'Helvetica', 'Arial', sans-serif",
//       tooltipTitleFontSize : 12,
//       scaleShowGridLines : true,
//       scaleLineColor : 'transparent',
//       scaleShowVerticalLines : false,
//       scaleGridLineColor : "rgba(0,0,0,.05)",
//       scaleGridLineWidth : 1,
//       barShowStroke : false,
//       barStrokeWidth : 2,
//       barValueSpacing : 5,
//       barDatasetSpacing : 1
//     };
//
//   }]);
//
// angular
//   .module('app.dashboard').controller('LineCtrl', ["$scope",
//   function($scope) {
//     $scope.labels = ['a', 'b', 'c', 'd', 'e', 'f', 'g'];
//     $scope.series = ['dataset'];
//     $scope.data = [[65, 59, 80, 81, 56, 95, 100]];
//     $scope.colors = [{
//       fillColor: 'rgba(0,0,0,0)',
//       strokeColor: 'rgba(0,0,0,0.2)'
//     }];
//     // Chart.js Options - complete list at http://www.chartjs.org/docs/
//     $scope.options = {
//       maintainAspectRatio: false,
//       showScale: false,
//       scaleLineWidth: 0,
//       responsive: true,
//       scaleFontFamily: "'Helvetica', 'Arial', sans-serif",
//       scaleFontSize: 11,
//       scaleFontColor: "#aaa",
//       scaleShowGridLines: true,
//       tooltipFontSize: 11,
//       tooltipFontFamily: "'Helvetica', 'Arial', sans-serif",
//       tooltipTitleFontFamily: "'Helvetica', 'Arial', sans-serif",
//       tooltipTitleFontSize: 12,
//       scaleGridLineColor: 'rgba(0,0,0,.05)',
//       scaleGridLineWidth: 1,
//       bezierCurve: false,
//       bezierCurveTension: 0.2,
//       scaleLineColor: 'transparent',
//       scaleShowVerticalLines: false,
//       pointDot: true,
//       pointDotRadius: 4,
//       pointDotStrokeWidth: 1,
//       pointHitDetectionRadius: 20,
//       datasetStroke: true,
//       datasetStrokeWidth: 2,
//       datasetFill: true,
//       animationEasing: "easeInOutExpo"
//     };
//
//   }]);

