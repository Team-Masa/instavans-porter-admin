'use strict';
angular.module('instavansPorterAdminApp')
  .controller('currentJobsCtrl', function () {
      var jobs = this;
      jobs.current = 'currrent';
      var url = 'http://localhost:1337';
      var socket = io(url);


  });
