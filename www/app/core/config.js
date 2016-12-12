(function () {
  'use strict';

  var core = angular.module('app.core');


  core.config(localStorageProviderConfig);

  localStorageProviderConfig.$inject = ['$localStorageProvider'];

  /* @ngInject */
  function localStorageProviderConfig ($localStorageProvider) {
    $localStorageProvider.setKeyPrefix('iAccel : ');
  }

  core.config(httpConfigurer);

  httpConfigurer.$inject = ['$httpProvider'];

  function httpConfigurer($httpProvider) {
    $httpProvider.defaults.headers.common["X-Requested-With"] = 'XMLHttpRequest';
  }

  core.config(function(toastrConfig) {
    angular.extend(toastrConfig, {
      positionClass: 'toast-bottom-center',      
    });
});



})();

// startup
(function () {
  'use strict';

  angular
    .module('app.core')
    .run(trySettingHeader);

  trySettingHeader.$inject = ['$localStorage', '$http', 'principal'];

  function trySettingHeader($localStorage, $http, principal) {
    if(principal.isAuthenticated())
      $http.defaults.headers.common['Authorization'] = 'Bearer ' + $localStorage._identity.access_token;
  }

})();
