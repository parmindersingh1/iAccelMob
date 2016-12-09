/* global toastr:false, moment:false */
(function () {
  'use strict';

  var env = {};
  if(window){
    env = window.__env;
  }

  angular
    .module('app.core')
    // .constant('GCM_SENDER_ID', '173383874361')
    .constant('__env', env)
    .constant('ACCESS_LEVEL', {
      'SUPER_ADMIN': 100000,
      'CLIENT_ADMIN': 10000,
      'REGION_ADMIN': 1000,
      'SITE_ADMIN': 100,
      'ASSET_GROUP_ADMIN': 10,
      'ASSET_ADMIN': 1
    });

})();
