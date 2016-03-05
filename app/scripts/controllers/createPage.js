'use strict';

/**
 * @ngdoc function
 * @name instavansPorterAdminApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the instavansPorterAdminApp
 */
angular.module('instavansPorterAdminApp')
  .controller('createPageCtrl', function() {
    var createPage = this;

    var markers = [
      [10, 2, 1],
      [2, 10, 1],
      [1.9, 80, 1],
      [2, 80, 1],
      [1.1, 1.2, 1],
      [30, 1, 1],
      [30, 1.6, 1],
      [30, 1.0, 1],
      [32, 1.3, 1],
      [33, 1.3, 1],
      [34, 1.3, 1],
      [31, 1.3, 1],
      [1.5, 0.4, 1]
    ];
    markers = markers.map(function(t) {
      t.push('<img src="https://angularjs.org/img/AngularJS-small.png"></img>');
      return t;
    });

    createPage.map = {
      center: {
        x: 40.74,
        y: -74.18
      },
      markers: markers
    };
    
    createPage.autocompleteOptions = {
      componentRestrictions: {
        country: 'in'
      },
      types: ['geocode']
    };

    createPage.form = {
      noOfPorters: 1
    };

    createPage.createJob = function() {
      console.log('Form', createPage.form);
    };

  });
