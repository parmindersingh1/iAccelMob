(function() {
  'use strict';

  angular
    .module('app.project')
    .run(appRun);

  appRun.$inject = ['routerHelper'];
  /* @ngInject */
  function appRun(routerHelper) {
    var otherwise = 'app/dashboardAll';
    routerHelper.configureStates(getStates(), otherwise);
  }

  function getStates() {
    return [
      {
        state: 'app',
        config: {
          url: '/app',
          //template: '<div ui-view class="fade-in-up"></div>',
          templateUrl: 'app/layouts/side-menu.html',
          abstract: 'true',
          resolve: {
            authorize: ['authorization',
              function(authorization) {
                return authorization.authorize();
              }
            ]
          },
          controller: 'sideMenuController',
          controllerAs: 'vm',
          cache: false
        }
      },
      {
        state: 'app.dashboard',
        config: {
          url: '/:id/dashboard',
          views: {
            'menuContent': {
                templateUrl: 'app/project/future-dashboard/dashboard.html',
                data: {
                  roles: ['User']
                },
                controller: 'DashboardController',
                controllerAs: 'vm',
                bindToController : true,
                title: 'Site Dashboard',
                cache: false
              }
            }
        }
      },
      {
        state: 'app.command',
        config: {
          url: '/:id/command',
          views: {
            'menuContent': {
                templateUrl: 'app/project/future-dashboard/settings.html',
                data: {
                  roles: ['User']
                },
                controller: 'ControlAsset',
                controllerAs: 'vm',
                bindToController : true
              }
            }
      }
      },
        {
            state: 'app.notification',
            config: {
                url: '/notification',
                views: {
                    'menuContent': {
                        templateUrl: 'app/project/future-dashboard/notification.html',
                        data: {
                            roles: ['User']
                        },
                        controller: 'NotificationController',
                        controllerAs: 'vm',
                        bindToController : true
                    }
                }
            }
        },
      {
        state: 'app.dashboardAll',
        config: {
          url: '/dashboardAll',
          views: {
            'menuContent': {
                templateUrl: 'app/project/future-dashboard/dashboard-all.html',
                data: {
                  roles: ['User']
                },
                controller: 'DashboardAllController',
                controllerAs: 'vm',
                bindToController : true,
                title: 'Client Dashboard'
              }
            }
        }
      },
        {
            state: 'app.settingsListAll',
            config: {
                url: '/settingsListAll',
                views: {
                    'menuContent': {
                        templateUrl: 'app/project/future-dashboard/settingsListAll.html',
                        data: {
                            roles: ['User']
                        },
                        controller: 'ControlAsset',
                        controllerAs: 'vm',
                        bindToController : true,
                        title: 'Client Dashboard'
                    }
                }
            }
        }

    ];
  }
})();
