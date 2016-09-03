angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {})

.controller('ChatsCtrl', function($scope, Chats, $timeout) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});
  
  $scope.MisMensajes=[];
  var VariableFirebase = new Firebase('https://chathernan.firebaseio.com/usuarios/'); //creo la variable apuntando al proyecto firebase

  VariableFirebase.on('child_added', function (snapshot)
   {
    $timeout(function(){
        var message = snapshot.val();
        $scope.MisMensajes.push(message);
        console.log($scope.MisMensajes);
    });
  });

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {enableFriends: true};
})

.controller('RegisterCtrl', function($scope) {
  $scope.nombre = $('#nameInput').val();
})


.controller('PaisesCtrl', function($scope, $http) {

  $http.get("https://restcountries.eu/rest/v1/region/americas")
  .then(function(respuesta){                //correcto
        console.info("volvio: ",respuesta.data);
        $scope.ListadoPaises = respuesta.data;


    },function(error){                      //incorrecto
        console.info("error: ",error.data);
        $scope.ListadoPaises = [];

    });
})
