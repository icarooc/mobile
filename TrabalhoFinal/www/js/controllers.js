angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
})

.controller('LocalizacaoCtrl', function($scope, $stateParams, $cordovaGeolocation) {
  $scope.latLong = {};

  $scope.minhaLatLong = function(){
    $cordovaGeolocation.getCurrentPosition({timeout: 10000, enableHighAccuracy: false})
    .then(function (position) {
      $scope.latLong = {lat: position.coords.latitude, long: position.coords.longitude}
    }, function(err) {
      // error
    });
  }

})

.controller('cadastroCtrl',function($scope, $stateParams,$cordovaCamera, $cordovaGeolocation, BASE_URL, $http, $ionicLoading){

  $scope.fotoBase64 = "";
  $scope.latLong = {};
  $scope.url = "";
  $scope.locais = [];

  $scope.baterFoto = function(){

    var options = {
      quality: 50,
      destinationType: Camera.DestinationType.DATA_URL,
      sourceType: Camera.PictureSourceType.CAMERA,
      allowEdit: true,
      encodingType: Camera.EncodingType.JPEG,
      targetWidth: 100,
      targetHeight: 100,
      popoverOptions: CameraPopoverOptions,
      saveToPhotoAlbum: false,
	    correctOrientation:true
    };


    $cordovaCamera.getPicture(options).then(function(imageData) {

      $scope.fotoBase64 = "data:image/jpeg;base64," + imageData;


    }, function(err) {
      // error
    });

  }

  $scope.minhaLatLong = function(){
    $cordovaGeolocation.getCurrentPosition({timeout: 10000, enableHighAccuracy: false})
    .then(function (position) {

      var xhr = new XMLHttpRequest();
      if (typeof XDomainRequest != "undefined") {
        xhr = new XDomainRequest();
      }

      $scope.latLong = {lat: position.coords.latitude, long: position.coords.longitude};
      $scope.url = BASE_URL + $scope.latLong.lat + "," + $scope.latLong.long;

      console.info($scope.url);
      console.info("chegou aqui");

      /*$http.get($scope.url).then(function(resp){
        $ionicLoading.hide();
        $scope.locais = resp.data;
        console.info($scope.locais);
      }, function(err){
        console.error(err)
      })*/

      xhr.open('GET',$scope.url, true);
      $scope.locais = xhr.responseText;
      console.info(xhr);
      console.info(xhr.data);
      console.info($scope.locais);
      console.info("Acabou");

    }, function(err) {
      // error
    });
  }


})

.controller('ApiCtrl', function($scope, $stateParams, $http, BASE_URL, $ionicLoading, $ionicModal) {

  $scope.dragoes = [];

  $scope.carregar = function(){

    $ionicLoading.show({
      template: 'Carregando...'
    });

    console.log("antes do get... ");
    $http.get(BASE_URL).then(function(resp){
      console.log("passei do get... ");
      $ionicLoading.hide();
      $scope.dragoes = resp.data.items;
      console.log(resp);
      console.log(resp.data);
    }, function(err){
      console.error(err)
    });
  }
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
});
