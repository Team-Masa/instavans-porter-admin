'use strict';

/**
 * @ngdoc function
 * @name instavansPorterAdminApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the instavansPorterAdminApp
 */
angular.module('instavansPorterAdminApp')
  .controller('createPageCtrl', function($timeout) {
    var createPage = this;

    createPage.form = {
      noOfPorters: 1
    };

    createPage.autocompleteOptions = {
      componentRestrictions: {
        country: 'in'
      },
      types: ['geocode']
    };

    createPage.map = {
      available: false
    };

    var randomMarkerGenerator = function(radius, original_lat, original_lng) {
      var r = radius / 111300,
        y0 = original_lat,
        x0 = original_lng,
        u = Math.random(),
        v = Math.random(),
        w = r * Math.sqrt(u),
        t = 2 * Math.PI * v,
        x = w * Math.cos(t),
        y1 = w * Math.sin(t),
        x1 = x / Math.cos(y0);

      var newY = y0 + y1;
      var newX = x0 + x1;
      return [newY, newX, 1];
    };

    createPage.updateMapParams = function() {
      var markers = [];
      for (var i = 0; i < 100; ++i) {
        markers.push(randomMarkerGenerator(5000, (createPage.form.location) ? createPage.form.location.geometry.location.lat() : 32, (createPage.form.location) ? createPage.form.location.geometry.location.lng() : 32));
      }

      markers = markers.map(function(t) {
        t.push('<img src="https://angularjs.org/img/AngularJS-small.png"></img>');
        return t;
      });

      createPage.map = {
        available: false,
        center: {
          x: (createPage.form.location) ? createPage.form.location.geometry.location.lat() : 0,
          y: (createPage.form.location) ? createPage.form.location.geometry.location.lng() : 0
        },
        markers: markers
      };
      $timeout(function() {
        createPage.map.available = true;
        $timeout(function () {
          var latLang = new google.maps.LatLng(createPage.map.center.x,createPage.map.center.y);
          window.map.panTo(latLang);
        }, 100);
      }, 200);
    };

    createPage.createJob = function() {
      console.log('Form', createPage.form);
    };

  });
