'use strict';
angular.module('instavansPorterAdminApp')
  .controller('analyticsCtrl', function ($scope, $http, $timeout) {
    $timeout(function () {
      var chart = c3.generate({
        bindto: '#chart',
        data: {
          columns: [
            ['data1', 30, 200, 100, 400, 150, 250],
            ['data2', 50, 20, 10, 40, 15, 25]
          ]
        }
      });
    }, 1);
  });
