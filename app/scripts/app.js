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
    'google.places'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/createPage.html',
        controller: 'createPageCtrl',
        controllerAs: 'createPage'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
