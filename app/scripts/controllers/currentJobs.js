'use strict';
angular.module('instavansPorterAdminApp')
  .controller('currentJobsCtrl', function ($scope, $http) {
      var jobs = this;
      jobs.current = [];
      var url = 'http://localhost:1337';
      var socket = io(url);
      socket.on('job-update', function(newJobs) {
        jobs.current = newJobs;
        console.log(jobs.current);
        $scope.$digest();
      });

      $http({
        method : 'GET',
        url : url + '/jobs'
      })
      .then(function(response){
        jobs.current = response.data;
      });

      jobs.styleFromJob = function(job){
        var backgroundColor = 'white';
        var fraction = job.porters.length / job.portersRequired;
        if(fraction >= 1){
          backgroundColor = '#A5D6A7';
        }
        else if(fraction > 0.333){
          backgroundColor = '#E6EE9C';
        }
        else {
          backgroundColor = '#EF9A9A';
        }
        return {
          'background-color' : backgroundColor
        };
      };
  });
