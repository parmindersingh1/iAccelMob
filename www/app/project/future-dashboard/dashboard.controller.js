(function () {
  'use strict';

  angular
    .module('app.dashboard')
    .controller('DashboardController', DashboardController);

  DashboardController.$inject = ['$scope', '$q', 'logger', 'dashboardFactory','$stateParams'];
  /* @ngInject */
  function DashboardController($scope, $q, logger, dashboardFactory,$stateParams) {
    var vm = this;
    vm.dashboard = {};
    vm.dashboardData = {};
    vm.siteLocation = '';
    vm.progress = true;
    dashboardFactory.get($stateParams.id).then(function (response) {
      vm.title = response.data.name;
    });

    dashboardFactory.get($stateParams.id).then(function (response) {
      vm.subTitle = response.data.address;
      vm.mapLatitude = response.data.lattitude;
      vm.mapLongitude = response.data.longitude;
    });
    activate();

    function activate() {

      var promises = [getDashboard(), getDashboardData(), getData(), getDashboardSites()];
      return $q.all(promises).then(function () {
        vm.progress = false;
        // logger.info('Activated Dashboard View');
      });



    }

    function getData() {
      return dashboardFactory.getData()
        .then(function (response) {
          if(response.data != null){
            vm.boxData = response.data.dashboardData.item;
            vm.BarGraphData = response.data.barGraphData;
            vm.WaveGraphData = response.data.waveGraphData;
            vm.ExpensesGraphData = response.data.expensesGraphData;
            vm.KnobData = response.data.realTimeKnobData;
          }
        })
        .catch(function (error) {
          logger.error(error);
        });
    }

    function getDashboard() {
      return dashboardFactory.getDashboard().then(function (response) {
        if(response.data != null){
          console.log(response.data.title);
          vm.dashboard = response.data;
          vm.title = response.data.title;
          return vm.dashboard;
        }
      });
    }

    function getDashboardData() {
      return dashboardFactory.getDashboardData().then(function (response) {
        if(response.data != null) {
          //console.log(response.data);
          vm.dashboardData = response.data;
          return vm.dashboardData;
        }
      });
    }

    function getDashboardSites() {
      vm.markers = [];
      return dashboardFactory.getDashboardSites().then(function (response) {
        if (response.data != null){
          var data = response.data;
          vm.markers = data.markers;
          vm.siteLocation = data.center;
          return null;
        }
      });
    }

  }

})();


angular
  .module('app.dashboard').controller('ConsumptionCtrl', ["$scope" , "dashboardFactory",'$stateParams' ,
  function($scope , dashboardFactory,$stateParams) {

    var mains = this;
    mains.siteId = $stateParams.id;
    mains.temp = {};
    mains.temp2 = {};

    mains.activate = function (){
      dashboardFactory.getMainsData(mains.siteId).then(function (response) {

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
      dashboardFactory.getGensetData(mains.siteId).then(function (response) {

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
    .module('app.dashboard').controller('ActiveHourCtrl', ["$scope", "dashboardFactory" ,"$interval","DASHBOARD_REFRESH_RATE",'$stateParams',
    function($scope , dashboardFactory,$interval, DASHBOARD_REFRESH_RATE,$stateParams) {

      var vm = this;
      vm.siteId = $stateParams.id;

      vm.activate = function (){
        dashboardFactory.getActiveHourData(vm.siteId).then(function (response) {
          //console.log(response.data);
          vm.progress = false;
          if(response.data != null) {
            vm.data = response.data;
          }
        })
          .catch(function (error) {
            logger.error(error);
          });
      }

      vm.activate();

      var myInterval = $interval(function () {
        vm.activate();
      }, DASHBOARD_REFRESH_RATE.TIME_INTERVAL);

      $scope.$on('$destroy', function(){
        $interval.cancel(myInterval)
      });


    }]);


    angular
      .module('app.dashboard').controller('TemperatureCtrl', ["$scope", "dashboardFactory" ,"$interval","DASHBOARD_REFRESH_RATE",'$stateParams',
      function($scope , dashboardFactory,$interval, DASHBOARD_REFRESH_RATE, $stateParams ) {

        var vm = this;
        vm.siteId = $stateParams.id;
        vm.temp = {};

        vm.activate = function (){
          dashboardFactory.getTemperatureData(vm.siteId).then(function (response) {

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
        var myInterval = $interval(function () {
          vm.activate();
        }, DASHBOARD_REFRESH_RATE.TIME_INTERVAL);

        $scope.$on('$destroy', function(){
          $interval.cancel(myInterval)
        });

      }]);

      angular
        .module('app.dashboard').controller('MainSupplyCtrl', ["$scope", "dashboardFactory",'$stateParams',
        function($scope , dashboardFactory, $stateParams ) {

          var vm = this;
          vm.siteId = $stateParams.id;
          vm.activate = function (){
            dashboardFactory.getSupplyData(vm.siteId).then(function (response) {
              if(response.data != null) {
                vm.data = response.data;
              }
            })
              .catch(function (error) {
                console.error(error);
              });
          }

          vm.activate();

        }]);

        angular
          .module('app.dashboard').controller('AssetStatusCtrl', ["$scope", "dashboardFactory","logger" ,"$interval","DASHBOARD_REFRESH_RATE",'$stateParams',
          function($scope , dashboardFactory, logger,$interval, DASHBOARD_REFRESH_RATE,$stateParams) {

            var vm = this;
            vm.siteId = $stateParams.id;
            console.log(vm.siteId);
            vm.activate = function (){
              dashboardFactory.getAssetData(vm.siteId).then(function (response) {
                if (response.data != null) {
                  vm.master = angular.copy(response.data);
                  for (var index=0 ; index < vm.master.length; index++){
                    if(vm.master[index].status == "1"){
                      vm.master[index].status = "ON";
                    }
                    else{
                      vm.master[index].status = "OFF";
                    }
                  }
                  vm.data = angular.copy(vm.master);
                }
              })
                  .catch(function (error) {
                    logger.error(error);
                  });
            }

            vm.activate();
            var myInterval = $interval(function () {
              vm.activate();
            }, DASHBOARD_REFRESH_RATE.TIME_INTERVAL);

            $scope.$on('$destroy', function(){
              $interval.cancel(myInterval)
            });

          }]);


          angular
          .module('app.dashboard').controller('AlertsDashboardCtrl', ["$scope", "dashboardFactory","logger" ,"$interval","DASHBOARD_REFRESH_RATE",'$stateParams',
          function($scope , dashboardFactory, logger, $interval, DASHBOARD_REFRESH_RATE,$stateParams) {

            var vm = this;
            vm.siteId = $stateParams.id;
            vm.activate = function (){
              dashboardFactory.getAlertData(vm.siteId).then(function (response) {
                if(response.data != null) {
                  vm.data = response.data;
                  //console.log(response.data)
                }
              })
                .catch(function (error) {
                  logger.error(error);
                });
            }

            vm.activate();
            var myInterval = $interval(function () {
              vm.activate();
            }, DASHBOARD_REFRESH_RATE.TIME_INTERVAL);

            $scope.$on('$destroy', function(){
              $interval.cancel(myInterval)
            });

          }]);