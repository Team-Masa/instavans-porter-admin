'use strict';

/**
 * @ngdoc overview
 * @name instavansPorterAdminApp
 * @description
 * # instavansPorterAdminApp
 *
 * Main module of the application.
 */

angular
  .module('instavansPorterAdminApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'jkuri.timepicker',
    'fiestah.money',
    'google.places',
    'Firestitch.angular-counter',
    'clustered.map'
  ])
  .config(function($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/createPage.html',
        controller: 'createPageCtrl',
        controllerAs: 'createPage',
        activetab: 'createPage'
      })
      .when('/current-jobs', {
        templateUrl: 'views/currentJobs.html',
        controller: 'currentJobsCtrl',
        controllerAs: 'jobs',
        activetab: 'jobs'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
