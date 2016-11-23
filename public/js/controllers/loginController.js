angular.module('jobster.login', [])

.controller('loginCtrl', ['$scope','$location', 'authentication', function ($scope, $location, authentication) {
  let s = $scope;
  s.credentials = {
    email: '',
    password: '',
  };
  s.onSubmit  = () => {
    authentication
      .login(s.credentials)
      .error((err) => {
        alert(err);
      })
      .then(() => {
        $location.path('jobs');
      });
  };

}]);
