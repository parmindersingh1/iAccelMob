(function () {
  'use strict';

  angular
    .module('app.user')
    .controller('EditProfileController', EditProfileController);

  EditProfileController.$inject = ['$q', 'userProfileFactory', '$state', '$http', 'validationHelperFactory','$stateParams', '$localStorage', '$cordovaCamera', '$ionicLoading' ];

  function EditProfileController($q, userProfileFactory, $state, $http, validationHelperFactory, $stateParams, $localStorage, $cordovaCamera, $ionicLoading) {
    var vm = this;

    vm.imgURI = "https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg";


    var userID = $localStorage._identity.userDetails.id;

    activate(userID);

    function activate(id) {
      userProfileFactory.alluser(id).then(function (response) {
          if (response.status == 200) {
            vm.master = response.data;
            vm.user = angular.copy(vm.master);
          }
          else if (response.status == 404) {
            console.error('User not found', 'error');
            console.error(response);
          }
          else if (response.status == -1) {
            console.error('Network Error', 'error');
            console.error(response);
          }
          else {
            console.error('Backend error', 'error');
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
            }, function (err) {
                // An error occured. Show a message to the user
                console.log("Error: "+err);
            });
        };



      vm.saveImage = function() {
        var formData = new FormData();
        formData.append('file', vm.obj.flow.files[0].file);
        $http.post(__env.userServerUrl + "/uploadImage", formData, {
            data: formData,
            transformRequest : angular.identity,
            headers : {
              'Content-Type' : undefined
            }
        }).success(function() {
          console.success("File uploaded successfully", "Status");
        }).error(function() {
          console.success("File upload error", "Status");
        });
      };

      vm.submit = function () {
        var firstError = null;
        if (vm.Form.$invalid) {
          validationHelperFactory.manageValidationFailed(vm.Form);
          return;
        }
        else {
          userProfileFactory.edit(vm.user).then(function (response) {
            if (response.status == 200) {
              $localStorage._identity.userDetails = response.data;
              $state.go('app.dashboard');
            }
            else if (response.status == -1) {
              console.log('Network Error');
              console.error(response);
            }
            else if (response.status == 400) {
              console.log(response.data.errors[0].message);
              console.error(response);
            }
            else {
              console.log('Some problem');
              console.error(response);
            }
          });

        }
      };

  }
}());
