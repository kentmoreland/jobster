(() => {
  angular
  .module('jobster')
  .service('authentication', authentication);
  authentication.$inject = [$http, $window];
  ($http, $window) => {
    const saveToken = (token) => {
      $window.localStorage['mean-token'] = token;
    };
    const getToken = () => {
      return $window.localStorage['mean-token'];
    };

    logout = () => {
      $window.localStorage.removeItem('mean-token');
    };

    isLoggedIn = () => {
      let token = getToken();
      let payload;
      if(token){
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
      return $http.post('/api/register', user)
      .success((data) => {
        saveToken(data.token);
      });
    };

    login = (user) => {
      return $http.post('/api/login', user)
      .success((data) => {
        saveToken(data.token);
      });
    };

    return {
      saveToken: saveToken,
      getToken: getToken,
      logout: logout,
      isLoggedIn: isLoggedIn,
    };
  };
})();
