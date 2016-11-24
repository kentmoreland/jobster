angular.module('jobster', []);
jobster.service('authentication', ['$rootScope','$http', '$window', function ($rootScope, $http, $window) {

  saveToken = (token) => {
    $window.localStorage['mean-token'] = token;
  };
  getToken = () => {
    return $window.localStorage['mean-token'];
  };

  logout = () => {
    $rootScope.loggedIn = false;
    $window.localStorage.removeItem('mean-token');

  };

  isLoggedIn = () => {
    let token = getToken();
    let payload;
    if(token){
      $rootScope.loggedIn = true;
      payload = token.split('.')[1];
      payload = $window.atob(payload);
      payload = JSON.parse(payload);
      return payload.exp > Date.now() / 1000;
    } else {
      return false;
    }
  };

  currentUser = () => {
    if(isLoggedIn()){
      $rootScope.loggedIn = true;
      let token = getToken();
      let payload = token.split('.')[1];
      payload = $window.atob(payload);
      payload = JSON.parse(payload);
      return {
        email: payload.email,
        name: payload.name
      };
    }
  };

  register = (user) => {
    $rootScope.loggedIn = true;
    return $http.post('/api/register', user)
    .success((data) => {
      saveToken(data.token);
    });
  };

  login = (user) => {
    $rootScope.loggedIn = true;
    return $http.post('/api/login', user)
    .success((data) => {
      saveToken(data.token);
    });
  };

  return {
    currentUser: currentUser,
    register: register,
    login: login,
    saveToken: saveToken,
    getToken: getToken,
    logout: logout,
    isLoggedIn: isLoggedIn,
  };

}]);
