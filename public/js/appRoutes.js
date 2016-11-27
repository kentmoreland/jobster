const routerApp = angular.module('jobster.router', ['ui.router']);
routerApp.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', ($stateProvider, $urlRouterProvider, $locationProvider) => {
  $urlRouterProvider.otherwise('/');
  $stateProvider
  .state('/', {
    url: '/home',
    templateUrl: 'views/register.html',
  })
  .state('form', {
    url: '/form',
    templateUrl: 'views/form.html',
  })
  .state('jobs', {
    url: '/jobs',
    templateUrl: 'views/jobs.html',
    test: 'true',
  })
  .state('job', {
    url: '/job',
    templateUrl: 'views/job.html',
    test: 'true',
  })
  .state('register', {
    url:'/register',
    templateUrl: 'views/register.html',
  })
  .state('login', {
    url: '/login',
    templateUrl: 'views/login.html',
  });



}]);

routerApp.run(['$rootScope', '$state', 'authentication', ($rootScope, $state, authentication) => {
  $rootScope.$on('$stateChangeStart', (event, toState, toParams) => {
    if (toState.test && !authentication.isLoggedIn()){
      event.preventDefault();
      $state.go('login');
    }
  });
}]);

// routerApp.run(['$rootScope', '$location', 'authentication', ($rootScope, $location, authentication) => {
//   run = ($rootScope, $location, authentication) => {
//     $rootScope.$on('$stateChangeStart', (event, nextRoute, currentRoute) => {
//       if($location.path() === '/jobs' && !authentication.isLoggedIn()) {
//         $location.path('/login');
//       }
//     });
//   };
//
// }]);
