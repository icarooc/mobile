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

  //Inserir código aqui embaixo
  $scope.inserirLocal = function(){
    $scope.latLong = {};
    $scope.lat = "";
    $scope.long = "";
    $scope.localizacao= "";
    $scope.jsonLoc = "";
    $scope.locais = [];


    $cordovaGeolocation.getCurrentPosition({timeout: 10000, enableHighAccuracy: false})
    .then(function (position) {
      $scope.latLong = {lat: position.coords.latitude, long: position.coords.longitude};
      $scope.lat = position.coords.latitude;
      $scope.long = position.coords.longitude;
      $scope.localizacao = "https://maps.googleapis.com/maps/api/staticmap?center=" + $scope.lat + "," + $scope.long + "&markers=color:blue%7Clabel:A%7C" + $scope.lat + "," + $scope.long  + "&zoom=16&size=100x100&maptype=hybrid&format=jpg&key=AIzaSyAHE7_INX1beuYLicAWAqnw7W9dFapn9YI";
      console.info($scope.localizacao);
      $scope.jsonLoc = "http://maps.google.com/maps/api/geocode/json?latlng=" + $scope.lat + "," + $scope.long + "&sensor=true&name=%27Kent%20Street%27";

      $http.get($scope.jsonLoc).then(function(resp){
        console.log("passei do get... ");
        $scope.locais = resp.data.results;
        console.log(resp.data.results);
      }, function(err){
        console.error(err)
      });

    }, function(err) {
      // error
    });
  }

})

.controller('ApiCtrl', function($scope, $stateParams, $http, BASE_URL, $ionicLoading, $ionicModal) {

  $scope.dragoes = [];
  $scope.dragon = "";

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
