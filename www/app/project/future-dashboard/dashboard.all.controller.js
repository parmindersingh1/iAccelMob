(function () {
  'use strict';

  angular
    .module('app.dashboard')
    .controller('DashboardAllController', DashboardAllController);

  DashboardAllController.$inject = ['$q', 'dashboardFactory','$localStorage'];
  /* @ngInject */
  function DashboardAllController($q, dashboardFactory,$localStorage) {
    var vm = this;
    vm.dashboard = {};
    vm.dashboardData = {};
    vm.title = 'Client Dashboard';
    vm.progress = true;
    vm.siteList = $localStorage._identity.sites;
    vm.siteCurrentActive = [];
//console.log($localStorage._identity.sites);

    activate();

    function activate() {

      var promises = [getDashboard(), getDashboardData(), getData(), getDashboardSites()];
      return $q.all(promises).then(function () {
        dashboardFactory.allSiteData().then(function (response) {
          //console.log(response.data);
          vm.progress = false;
          if (response.data != null) {
            //console.log(response.data)

            for (var index=0 ; index < vm.siteList.length ; index++){
              for (var key in response.data) {
                if (vm.siteList[index].id == key) {
                  vm.siteCurrentActive.push(angular.extend(response.data[key],vm.siteList[index]));
                  break;
                }
              }

            }
          }
        });
       
      });

    }

    function getData() {
      return dashboardFactory.getData()
          .then(function (response) {
            //vm.progress = false;
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
       // vm.progress = false;
        if(response.data != null){
          //console.log(response.data.title);
          vm.dashboard = response.data;
          vm.title = response.data.title;
          return vm.dashboard;
        }
      });
    }

    function getDashboardData() {
      return dashboardFactory.getDashboardData().then(function (response) {
        //vm.progress = false;
        //console.log(response.data);
        vm.dashboardData = response.data;
        return vm.dashboardData;
      });
    }

    function getDashboardSites() {
      vm.markers = [];
      return dashboardFactory.getDashboardSites().then(function (response) {
        //vm.progress = false;
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
