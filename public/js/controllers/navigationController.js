angular.module('jobster.nav', [])
.controller('navigationCtrl', ['$scope', '$location', 'authentication', function ($scope, $location, authentication) {
  let s = $scope;
  s.isLoggedIn = authentication.isLoggedIn();
  s.currentUser = authentication.currentUser();
  s.logout = () => {
    authentication
    .logout();
  };
}]);
