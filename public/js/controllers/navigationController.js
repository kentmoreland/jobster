angular.module('jobster.nav', [])
.controller('navigationCtrl', ['$rootScope','$scope', '$location', 'authentication', function ($rootScope, $scope, $location, authentication) {
  let s = $scope;
  s.isLoggedIn = authentication.isLoggedIn();
  s.currentUser = authentication.currentUser();
  s.logout = () => {
    $rootScope.currentUserSignedIn = false;
    authentication.logout();
  };
}]);
