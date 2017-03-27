angular.module('jobster.login', [])

.controller('loginCtrl', ['$rootScope', '$scope','$location', 'authentication', function ($rootScope, $scope, $location, authentication) {
  let s = $scope;
  s.credentials = {
    email: '',
    password: '',
  };

  s.onSubmit  = () => {
    authentication
      .login(s.credentials)
      .then(() => {
        $location.path('jobs');
      }).catch((err) => {
        s.invalidLogin = true;
      })
  };

}]);
