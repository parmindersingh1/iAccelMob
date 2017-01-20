(function () {
    'use strict';
    angular
        .module('app')
        .factory('checkNetworkFactory', checkNetworkFactory);
    checkNetworkFactory.$inject = ['$cordovaNetwork' , '$ionicPlatform', '$q'];

    function checkNetworkFactory($cordovaNetwork ,$ionicPlatform , $q) {

        var Connection = window.Connection || {
                "CELL": "cellular",
                "CELL_2G": "2g",
                "CELL_3G": "3g",
                "CELL_4G": "4g",
                "ETHERNET": "ethernet",
                "NONE": "none",
                "UNKNOWN": "unknown",
                "WIFI": "wifi"
            };

        var asyncGetConnection = function () {
            var q = $q.defer();
            $ionicPlatform.ready(function () {
                if (navigator.connection) {
                    q.resolve(navigator.connection);
                } else {
                    q.reject('navigator.connection is not defined');
                }
            });
            return q.promise;
        };

        return {
            isOnline: function () {
                return asyncGetConnection().then(function (networkConnection) {
                    var isConnected = false;

                    switch (networkConnection.type) {
                        case Connection.ETHERNET:
                        case Connection.WIFI:
                        case Connection.CELL_2G:
                        case Connection.CELL_3G:
                        case Connection.CELL_4G:
                        case Connection.CELL:
                            isConnected = true;
                            break;
                    }
                    return isConnected;
                });
            }
        };
    }

})();

