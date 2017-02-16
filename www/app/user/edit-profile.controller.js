(function () {
  'use strict';

  angular
    .module('app.user')
    .controller('EditProfileController', EditProfileController);

  EditProfileController.$inject = ['$q', 'userProfileFactory', '$state', '$http', 'logger', 'validationHelperFactory','$stateParams', '$localStorage', '$cordovaCamera', '$ionicLoading', '$ionicHistory', '$rootScope','$cordovaFileTransfer'];

  function EditProfileController($q, userProfileFactory, $state, $http, logger, validationHelperFactory, $stateParams, $localStorage, $cordovaCamera, $ionicLoading, $ionicHistory , $rootScope, $cordovaFileTransfer) {
    var vm = this;
      vm.progress = true;

    // vm.imgURI = "https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg";


    var userID = $localStorage._identity.userDetails.id;

    activate(userID);

    function activate(id) {
      userProfileFactory.alluser(id).then(function (response) {
          vm.progress = false;
          if (response.status == 200) {
            vm.master = response.data;
            vm.user = angular.copy(vm.master);
          }
          else if (response.status == 404) {
            logger.error('User not found', 'error');
            console.error(response);
          }
          else if (response.status == -1) {
            logger.error('Network Error', 'error');
            console.error(response);
          }
          else {
            logger.error('Backend error', 'error');
            console.error(response);
          }
        });
    }

      vm.takePhoto = function () {
          var options = {
            quality: 75,
            destinationType: Camera.DestinationType.DATA_URL,
            sourceType: Camera.PictureSourceType.CAMERA,
            allowEdit: true,
            encodingType: Camera.EncodingType.JPEG,
            targetWidth: 300,
            targetHeight: 300,
            popoverOptions: CameraPopoverOptions,
            saveToPhotoAlbum: false
        };

            $cordovaCamera.getPicture(options).then(function (imageData) {
                vm.imgURI = "data:image/jpeg;base64," + imageData;
            }, function (err) {
                // An error occured. Show a message to the user
                console.log("Error: "+err);
            });
        };

        vm.choosePhoto = function () {
          var options = {
            quality: 75,
            destinationType: Camera.DestinationType.DATA_URL,
            sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
            allowEdit: true,
            encodingType: Camera.EncodingType.JPEG,
            targetWidth: 300,
            targetHeight: 300,
            popoverOptions: CameraPopoverOptions,
            saveToPhotoAlbum: false
        };

            $cordovaCamera.getPicture(options).then(function (imageData) {
                vm.imgURI = "data:image/jpeg;base64," + imageData;

                var server = __env.userServerUrl + "/uploadImage",
                    filePath = imageData;

                var date = new Date();

                var options = {
                    fileKey: "file",
                    fileName: imageData.substr(imageData.lastIndexOf('/') + 1),
                    chunkedMode: false,
                    mimeType: "image/jpg"
                };

                $cordovaFileTransfer.upload(server, filePath, options , function(header){
                    return headers['authorization'] = 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX25hbWUiOiJ1c2VyMEBkYXRpb3QuY29tIiwic2NvcGUiOlsicmVhZCIsIndyaXRlIl0sImV4cCI6MTQ4NjExMzcwNSwidXNlckRldGFpbHMiOnsiaWQiOiI1ODAwNWMxNmU4NTUxNjFmN2QzODhkMWEiLCJjbGllbnRJZCI6bnVsbCwibW9iaWxlIjoiNzIwNjAwMDA0MCIsImVtYWlsIjoidXNlcjBAZGF0aW90LmNvbSIsInVzZXJSb2xlcyI6W3sicm9sZSI6eyJpZCI6IjU4NmZiNDM3NGEyYjFmN2NkY2QzNmY4OSIsIm5hbWUiOiJST0xFX1NVUEVSX0FETUlOIiwicHJpdmlsZWdlcyI6WyJMaXN0IEFzc2V0cyIsIlZpZXcgT3RoZXIgQXNzZXQgTGV2ZWwgRGFzaGJvYXJkL1JlcG9ydHMiLCJWaWV3IE90aGVyIFJlZ2lvbiBMZXZlbCBEYXNoYm9hcmQvUmVwb3J0cyIsIkFkZCBTaXRlIiwiRWRpdCBDbGllbnQiLCJEaXNhYmxlIFJlZ2lvbiIsIkRpc2FibGUgQXNzZXRzIiwiRWRpdCBVc2VyIiwiQ2FuIFNhdmUgQXNzZXQgU3RhdHVzIiwiQ3JlYXRlIFVzZXIiLCJFbmFibGUgQ2xpZW50IiwiQWRkIEFzc2V0IChvbiBib2FyZCkiLCJMaXN0IFJlZ2lvbnMiLCJBZGQgUmVnaW9uIiwiVmlldyBTZWxmIFJlZ2lvbiBMZXZlbCBEYXNoYm9hcmQvUmVwb3J0cyIsIkVuYWJsZSBBc3NldHMiLCJFZGl0X0Fzc2V0IiwiVmlldyBPdGhlciBTaXRlIExldmVsIERhc2hib2FyZC9SZXBvcnRzIiwiRW5hYmxlIFJlZ2lvbiIsIkVkaXQgUmVnaW9uIiwiVmlldyBPdGhlciBDbGllbnQgTGV2ZWwgRGFzaGJvYXJkL1JlcG9ydHMiLCJWaWV3IFNlbGYgQ2xpZW50IExldmVsIERhc2hib2FyZC9SZXBvcnRzIiwiRGlzYWJsZSBDbGllbnQiLCJFZGl0IFNpdGUiLCJFbmFibGUgVXNlciIsIlZpZXcgU2VsZiBTaXRlIExldmVsIERhc2hib2FyZC9SZXBvcnRzIiwiVmlldyBTZWxmIEFzc2V0IExldmVsIERhc2hib2FyZC9SZXBvcnRzIiwiRW5hYmxlIFNpdGUiLCJMaXN0IFNpdGVzIiwiRGlzYWJsZSBTaXRlIiwiQWRkIENsaWVudCJdfSwiZW50aXR5Ijp7ImVudGl0eUlkIjoiNTgwMDVjMTZlODU1MTYxZjdkMzg4ZDE1IiwiZW50aXR5VHlwZSI6IlNVUEVSX0FETUlOIn19XSwiZmlyc3RuYW1lIjoiRGF0aW90IGciLCJsYXN0bmFtZSI6IkFkbWluIiwiZ2VuZGVyIjoiRmVtYWxlIiwiYWRkcmVzcyI6IlNhbXBsZSBBZGRyZXNzIDDigqzCoyYiLCJwcm9maWxlUGljdHVyZVVybCI6ImltYWdlcy81ODAwNWMxNmU4NTUxNjFmN2QzODhkMWEuanBnIn0sImF1dGhvcml0aWVzIjpbIkxpc3QgQXNzZXRzIiwiVmlldyBPdGhlciBBc3NldCBMZXZlbCBEYXNoYm9hcmQvUmVwb3J0cyIsIlZpZXcgT3RoZXIgUmVnaW9uIExldmVsIERhc2hib2FyZC9SZXBvcnRzIiwiQWRkIFNpdGUiLCJFZGl0IENsaWVudCIsIkRpc2FibGUgUmVnaW9uIiwiRGlzYWJsZSBBc3NldHMiLCJFZGl0IFVzZXIiLCJDYW4gU2F2ZSBBc3NldCBTdGF0dXMiLCJDcmVhdGUgVXNlciIsIkVuYWJsZSBDbGllbnQiLCJBZGQgQXNzZXQgKG9uIGJvYXJkKSIsIkxpc3QgUmVnaW9ucyIsIkFkZCBSZWdpb24iLCJWaWV3IFNlbGYgUmVnaW9uIExldmVsIERhc2hib2FyZC9SZXBvcnRzIiwiRW5hYmxlIEFzc2V0cyIsIkVkaXRfQXNzZXQiLCJWaWV3IE90aGVyIFNpdGUgTGV2ZWwgRGFzaGJvYXJkL1JlcG9ydHMiLCJFbmFibGUgUmVnaW9uIiwiRWRpdCBSZWdpb24iLCJWaWV3IE90aGVyIENsaWVudCBMZXZlbCBEYXNoYm9hcmQvUmVwb3J0cyIsIlZpZXcgU2VsZiBDbGllbnQgTGV2ZWwgRGFzaGJvYXJkL1JlcG9ydHMiLCJEaXNhYmxlIENsaWVudCIsIkVkaXQgU2l0ZSIsIkVuYWJsZSBVc2VyIiwiVmlldyBTZWxmIFNpdGUgTGV2ZWwgRGFzaGJvYXJkL1JlcG9ydHMiLCJWaWV3IFNlbGYgQXNzZXQgTGV2ZWwgRGFzaGJvYXJkL1JlcG9ydHMiLCJFbmFibGUgU2l0ZSIsIkxpc3QgU2l0ZXMiLCJEaXNhYmxlIFNpdGUiLCJBZGQgQ2xpZW50Il0sImp0aSI6ImNlMDVmYTFkLTUzYWYtNDQxNy1hZjRiLTY1YmEyODE4YmJiYSIsImNsaWVudF9pZCI6InVpU2VydmVyIn0.nC0NTATlC7fgxRFoTtPDbmV2stJ3234Pn6XcZTtYszE7oQEC2P9BpG9W30zt-FmjwKK8Yo37dh0q9sP7Jrfqe_kggY1drRaZxb4a7a8JAgCLaZKKtQGteoNFNBwWsEiVtYJ2U7mVNieMBBZUjWujQwUfFuWbs1ZxbOkfRZGsy83WzoN652P6cM1KeaveVh7AA9VXvWamDZL9uN3gpAM35QIzj3oif2Fxz-REeTzO6DeritY3TJprV1F5k0_XKum7MFataN_8dpu0sWBZb-rZTjfZCDHeTaLwltUZ0Kli44beJvp5TcRsh3zN-WziKL6HQNsOzYqV7qFmJcygMLQylg","token_type":"bearer","refresh_token":"eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX25hbWUiOiJ1c2VyMEBkYXRpb3QuY29tIiwic2NvcGUiOlsicmVhZCIsIndyaXRlIl0sImF0aSI6ImNlMDVmYTFkLTUzYWYtNDQxNy1hZjRiLTY1YmEyODE4YmJiYSIsImV4cCI6MTQ4ODM0NTcwNSwidXNlckRldGFpbHMiOnsiaWQiOiI1ODAwNWMxNmU4NTUxNjFmN2QzODhkMWEiLCJjbGllbnRJZCI6bnVsbCwibW9iaWxlIjoiNzIwNjAwMDA0MCIsImVtYWlsIjoidXNlcjBAZGF0aW90LmNvbSIsInVzZXJSb2xlcyI6W3sicm9sZSI6eyJpZCI6IjU4NmZiNDM3NGEyYjFmN2NkY2QzNmY4OSIsIm5hbWUiOiJST0xFX1NVUEVSX0FETUlOIiwicHJpdmlsZWdlcyI6WyJMaXN0IEFzc2V0cyIsIlZpZXcgT3RoZXIgQXNzZXQgTGV2ZWwgRGFzaGJvYXJkL1JlcG9ydHMiLCJWaWV3IE90aGVyIFJlZ2lvbiBMZXZlbCBEYXNoYm9hcmQvUmVwb3J0cyIsIkFkZCBTaXRlIiwiRWRpdCBDbGllbnQiLCJEaXNhYmxlIFJlZ2lvbiIsIkRpc2FibGUgQXNzZXRzIiwiRWRpdCBVc2VyIiwiQ2FuIFNhdmUgQXNzZXQgU3RhdHVzIiwiQ3JlYXRlIFVzZXIiLCJFbmFibGUgQ2xpZW50IiwiQWRkIEFzc2V0IChvbiBib2FyZCkiLCJMaXN0IFJlZ2lvbnMiLCJBZGQgUmVnaW9uIiwiVmlldyBTZWxmIFJlZ2lvbiBMZXZlbCBEYXNoYm9hcmQvUmVwb3J0cyIsIkVuYWJsZSBBc3NldHMiLCJFZGl0X0Fzc2V0IiwiVmlldyBPdGhlciBTaXRlIExldmVsIERhc2hib2FyZC9SZXBvcnRzIiwiRW5hYmxlIFJlZ2lvbiIsIkVkaXQgUmVnaW9uIiwiVmlldyBPdGhlciBDbGllbnQgTGV2ZWwgRGFzaGJvYXJkL1JlcG9ydHMiLCJWaWV3IFNlbGYgQ2xpZW50IExldmVsIERhc2hib2FyZC9SZXBvcnRzIiwiRGlzYWJsZSBDbGllbnQiLCJFZGl0IFNpdGUiLCJFbmFibGUgVXNlciIsIlZpZXcgU2VsZiBTaXRlIExldmVsIERhc2hib2FyZC9SZXBvcnRzIiwiVmlldyBTZWxmIEFzc2V0IExldmVsIERhc2hib2FyZC9SZXBvcnRzIiwiRW5hYmxlIFNpdGUiLCJMaXN0IFNpdGVzIiwiRGlzYWJsZSBTaXRlIiwiQWRkIENsaWVudCJdfSwiZW50aXR5Ijp7ImVudGl0eUlkIjoiNTgwMDVjMTZlODU1MTYxZjdkMzg4ZDE1IiwiZW50aXR5VHlwZSI6IlNVUEVSX0FETUlOIn19XSwiZmlyc3RuYW1lIjoiRGF0aW90IGciLCJsYXN0bmFtZSI6IkFkbWluIiwiZ2VuZGVyIjoiRmVtYWxlIiwiYWRkcmVzcyI6IlNhbXBsZSBBZGRyZXNzIDDigqzCoyYiLCJwcm9maWxlUGljdHVyZVVybCI6ImltYWdlcy81ODAwNWMxNmU4NTUxNjFmN2QzODhkMWEuanBnIn0sImF1dGhvcml0aWVzIjpbIkxpc3QgQXNzZXRzIiwiVmlldyBPdGhlciBBc3NldCBMZXZlbCBEYXNoYm9hcmQvUmVwb3J0cyIsIlZpZXcgT3RoZXIgUmVnaW9uIExldmVsIERhc2hib2FyZC9SZXBvcnRzIiwiQWRkIFNpdGUiLCJFZGl0IENsaWVudCIsIkRpc2FibGUgUmVnaW9uIiwiRGlzYWJsZSBBc3NldHMiLCJFZGl0IFVzZXIiLCJDYW4gU2F2ZSBBc3NldCBTdGF0dXMiLCJDcmVhdGUgVXNlciIsIkVuYWJsZSBDbGllbnQiLCJBZGQgQXNzZXQgKG9uIGJvYXJkKSIsIkxpc3QgUmVnaW9ucyIsIkFkZCBSZWdpb24iLCJWaWV3IFNlbGYgUmVnaW9uIExldmVsIERhc2hib2FyZC9SZXBvcnRzIiwiRW5hYmxlIEFzc2V0cyIsIkVkaXRfQXNzZXQiLCJWaWV3IE90aGVyIFNpdGUgTGV2ZWwgRGFzaGJvYXJkL1JlcG9ydHMiLCJFbmFibGUgUmVnaW9uIiwiRWRpdCBSZWdpb24iLCJWaWV3IE90aGVyIENsaWVudCBMZXZlbCBEYXNoYm9hcmQvUmVwb3J0cyIsIlZpZXcgU2VsZiBDbGllbnQgTGV2ZWwgRGFzaGJvYXJkL1JlcG9ydHMiLCJEaXNhYmxlIENsaWVudCIsIkVkaXQgU2l0ZSIsIkVuYWJsZSBVc2VyIiwiVmlldyBTZWxmIFNpdGUgTGV2ZWwgRGFzaGJvYXJkL1JlcG9ydHMiLCJWaWV3IFNlbGYgQXNzZXQgTGV2ZWwgRGFzaGJvYXJkL1JlcG9ydHMiLCJFbmFibGUgU2l0ZSIsIkxpc3QgU2l0ZXMiLCJEaXNhYmxlIFNpdGUiLCJBZGQgQ2xpZW50Il0sImp0aSI6IjAwZWQyODRmLWNiYTEtNGFiMy1hNjJmLWRjN2EyMTA0OTlhNCIsImNsaWVudF9pZCI6InVpU2VydmVyIn0.vzoWPQXNuZRcfxLHh4XccPsKADTyDKF5k37tFfpxIDYLopT1eJNO9eLnGF4aPJ8GAUKxLD3pyE3emLu3KSgGe2fbBn4IKq425vgeFJmCVOdbxPd6wrWJ9jaqBObFpQO5PzfCEsmcBvUtUGUb4AzZB0wP3VOgnwpTb_Ua5xptVKxX_k5WF3tUPtn_J5TabEI5pkwRHz25r0ci1a1mqDtkOnJv33nwi0cBSvqDLx32LKd3n5afmVGnBaxjjsgvUITTsv9LzMkcb1fYHK3G33Xn5zglWaPfruT8Bbl-_kHvjv1-bcLAMQY7YoDY5KB2sepMC78jBDiugh9EpWGe8-E_OA","expires_in":359998,"scope":"read write","userDetails":{"id":"58005c16e855161f7d388d1a","clientId":null,"mobile":"7206000040","email":"user0@datiot.com","userRoles":[{"role":{"id":"586fb4374a2b1f7cdcd36f89","name":"ROLE_SUPER_ADMIN","privileges":["List Assets","View Other Asset Level Dashboard/Reports","View Other Region Level Dashboard/Reports","Add Site","Edit Client","Disable Region","Disable Assets","Edit User","Can Save Asset Status","Create User","Enable Client","Add Asset (on board)","List Regions","Add Region","View Self Region Level Dashboard/Reports","Enable Assets","Edit_Asset","View Other Site Level Dashboard/Reports","Enable Region","Edit Region","View Other Client Level Dashboard/Reports","View Self Client Level Dashboard/Reports","Disable Client","Edit Site","Enable User","View Self Site Level Dashboard/Reports","View Self Asset Level Dashboard/Reports","Enable Site","List Sites","Disable Site","Add Client"]},"entity":{"entityId":"58005c16e855161f7d388d15","entityType":"SUPER_ADMIN"}}],"firstname":"Datiot g","lastname":"Admin","gender":"Female","address":"Sample Address 0€£&","profilePictureUrl":"images/58005c16e855161f7d388d1a.jpg"},"jti":"ce05fa1d-53af-4417-af4b-65ba2818bbba'
                }).then(function(result) {
                    console.log("SUCCESS: " + JSON.stringify(result.response));
                    console.log('Result_' + result.response[0] + '_ending');
                    alert("success");
                    alert(JSON.stringify(result.response));

                }, function(err) {
                    console.log("ERROR: " + JSON.stringify(err));
                    //alert(JSON.stringify(err));
                }, function (progress) {
                    // constant progress updates
                });
            }, function (err) {
                // An error occured. Show a message to the user
                console.log("Error: "+err);
            });
        };


      // vm.saveImage = function() {
      //   var formData = new FormData();
      //   formData.append('file', vm.obj.flow.files[0].file);
      //   $http.post(__env.userServerUrl + "/uploadImage", formData, {
      //       data: formData,
      //       transformRequest : angular.identity,
      //       headers : {
      //         'Content-Type' : undefined
      //       }
      //   }).success(function() {
      //     console.success("File uploaded successfully", "Status");
      //   }).error(function() {
      //     console.success("File upload error", "Status");
      //   });
      // };

      vm.submit = function () {
        var firstError = null;
        if (vm.Form.$invalid) {
          validationHelperFactory.manageValidationFailed(vm.Form);
          return;
        }
        else {
          userProfileFactory.edit(vm.user).then(function (response) {
              vm.progress = false;
            if (response.status == 200) {
              logger.info('Profile Updated', 'default');
              $localStorage._identity.userDetails = response.data;
              $state.go('app.dashboard');
            }
            else if (response.status == -1) {
              logger.error('Network Error');
              console.error(response);
            }
            else if (response.status == 400) {
              logger.error(response.data.errors[0].message);
              console.error(response);
            }
            else {
              logger.error('Some problem');
              console.error(response);
            }
          });

        }
      };

      vm.onCancel = function() {
        $ionicHistory.nextViewOptions({
            disableBack: true
        });
        $state.go("app.userProfile");
      }

  }
}());
