const routerApp = angular.module('jobster.router', ['ui.router']);
routerApp.config(['$stateProvider', '$urlRouterProvider', ($stateProvider, $urlRouterProvider) => {
  $urlRouterProvider.otherwise('/home');
  $stateProvider
  .state('home', {
    url: '/home',
    templateUrl: 'views/home.html',
  })
  .state('jobs', {
    url: '/jobs',
    templateUrl: 'views/jobs.html',
  })
  .state('job', {
    url: '/job',
    templateUrl: 'views/job.html',
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
