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
      .error((err) => {
        s.invalidLogin = true;
      })
      .then(() => {
        $location.path('jobs');
      });
  };

}]);
