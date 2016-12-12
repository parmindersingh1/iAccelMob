(function () {
  'use strict';

  angular.module('app.widgets').directive('dtMapMarkers', dtMapMarkers);

  function dtMapMarkers() {
    var directive = {
      templateUrl: 'app/widgets/mapMarkers.html',
      restrict: 'E',
      scope: {
        markers: '=',
        center: '@'
      },
      controller: MapMarkersCtrl,
      controllerAs: 'vm',
      bindToController: true
    };
    return directive;
  }

  MapMarkersCtrl.$inject = ['$scope', 'NgMap'];

  function MapMarkersCtrl($scope, NgMap) {
    var vm = this;
    var markers = [];

    activate();

    function activate() {
      NgMap.getMap('multiple-markers').then(function(map) {
          // map.setCenter(data.center);
          for (var i = 0; i < vm.markers.length; i++) {
            markers[i] = new google.maps.Marker({ title: vm.markers[i].title });
            var loc = new google.maps.LatLng(vm.markers[i].lat, vm.markers[i].lng);
            markers[i].setPosition(loc);
            markers[i].setMap(map);
          }
        }, 1000);
    }


  }
})();
