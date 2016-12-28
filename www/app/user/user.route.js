(function() {
  'use strict';

  angular
    .module('app.user')
    .run(appRun);

  appRun.$inject = ['routerHelper'];
  /* @ngInject */
  function appRun(routerHelper) {
    routerHelper.configureStates(getStates());
  }

  function getStates() {
    return [
      {
        state: 'app.userProfile',
        config: {
          url: '/user-profile',
          views: {
            'menuContent': {
              controller:'userProfileController',
              controllerAs:'vm',
              templateUrl: 'app/user/user-profile.html',
              data: {
                roles: ['User']
              }
            }
          }
        }
      },
      {
        state: 'app.editProfile',
        config: {
          url: '/edit-profile',
          views: {
            'menuContent': {
              controller:'EditProfileController',
              controllerAs:'vm',
              templateUrl: 'app/user/edit-profile.html',
              data: {
                roles: ['User']
              }
            }
          }
        }
      },
      {
        state: 'app.changepassword',
        config: {
          url: '/changepassword',
          views: {
            'menuContent': {
              controller:'ChangePasswordController',
              controllerAs:'vm',
              templateUrl: 'app/user/changePassword.html'
            }
          }
        }
      }
    ];

  }
})();
