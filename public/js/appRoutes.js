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
  });
}]);
