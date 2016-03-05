'use strict';
angular.module('instavansPorterAdminApp')
  .controller('currentJobsCtrl', function ($scope, $http, $timeout) {
      var jobs = this;
      jobs.current = [];
      var url = window.appUrl || 'http://localhost:1337';
      var socket = io(url);
      socket.on('job-update', function(newJobs) {
        jobs.current = newJobs;
        console.log(jobs.current);
        $scope.$digest();
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

      var processJobTime = function(){
        jobs.current.forEach(function(job){
          var momentTime = moment(job.time);
          job.timeTillStart = momentTime.fromNow();
          job.prettyTime = momentTime.format('MMMM Do YYYY, h:mm a');
        });
      };

      var processPorters = function(){
        jobs.current.forEach(function(job){
          job.portersAccepted = job.porters.length;
          job.portersArriving = job.porters.filter(porter => !!porter.startTime).length;
          job.portersReached = job.porters.filter(porter => !!porter.endTime).length;
        });
      };

      var processJobs = function(){
        processJobTime();
        processPorters();
      };

      $http({
        method : 'GET',
        url : url + '/jobs'
      })
      .then(function(response){
        jobs.current = response.data;
        processJobs();
      });
      $timeout(processJobTime, 1000 * 60);
  });
