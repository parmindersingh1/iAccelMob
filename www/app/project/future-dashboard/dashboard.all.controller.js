(function () {
  'use strict';

  angular
    .module('app.dashboard')
    .controller('DashboardAllController', DashboardAllController);

  DashboardAllController.$inject = ['$q', 'dashboardFactory'];
  /* @ngInject */
  function DashboardAllController($q, dashboardFactory) {
    var vm = this;
    vm.dashboard = {};
    vm.dashboardData = {};
    vm.title = 'Client Dashboard';


    activate();

    function activate() {

      var promises = [getDashboard(), getDashboardData(), getData(), getDashboardSites()];
      return $q.all(promises).then(function () {
         dashboardFactory.allSiteData().then(function (response) {
          console.log(response.data);
          vm.pnpsite = response.data;
        });
       
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
        //console.log(response.data);
        vm.dashboardData = response.data;
        return vm.dashboardData;
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
