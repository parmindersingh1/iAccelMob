(function () {
    'use strict';
    angular
        .module('app')
        .factory('checkNetworkFactory', checkNetworkFactory);
    checkNetworkFactory.$inject = ['$cordovaNetwork'];

    function checkNetworkFactory($cordovaNetwork) {

        var service = {};

        service.connectionType = function (){
            var networkState = navigator.connection.type;

            var states = {};
            states[Connection.UNKNOWN] = 'Unknown connection';
            states[Connection.ETHERNET] = 'Ethernet connection';
            states[Connection.WIFI] = 'WiFi connection';
            states[Connection.CELL_2G] = 'Cell 2G connection';
            states[Connection.CELL_3G] = 'Cell 3G connection';
            states[Connection.CELL_4G] = 'Cell 4G connection';
            states[Connection.CELL] = 'Cell generic connection';
            states[Connection.NONE] = 'No network connection';

            console.log('Connection type: ' + states[networkState]);
        };
        return service;
    }

})();

