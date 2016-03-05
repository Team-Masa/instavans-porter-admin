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
    createPage.autocompleteOptions = {
      componentRestrictions: {
        country: 'in'
      },
      types: ['geocode']
    };

    createPage.form = {

    };

    createPage.createJob = function(){
        console.log('Form',createPage.form);
    };
  });
