angular.module('jobster.register', [])
.controller('registerCtrl', ['$scope', '$location', 'authentication', function ($scope, $location, authentication) {
  let s = $scope;
  s.credentials = {
    name: '',
    password: '',
    email: '',
  };
  s.onSubmit = () => {
    authentication
    .register(s.credentials)
    .error((err) => {
      alert(err);
    })
    .then(() => {
      $location.path('profile');
    });
  };
}]);
