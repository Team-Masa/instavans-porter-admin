'use strict';
angular.module('instavansPorterAdminApp')
  .controller('currentJobsCtrl', function ($scope, $http, $timeout) {
    var jobs = this;
    jobs.current = [];
    var url = window.appUrl || 'http://localhost:1337';
    var socket = io(url);
    var allPorters = [];
    jobs.jobMetadata = {};
    jobs.styleFromJob = function (job) {
      var backgroundColor = 'white';
      var portersAccepted = job.porters.length;
      if (job.portersArriving >= job.portersRequired) {
        backgroundColor = '#A5D6A7';
      } else if (job.portersArriving > 1 || portersAccepted === job.portersRequired) {
        backgroundColor = '#E6EE9C';
      } else {
        backgroundColor = '#EF9A9A';
      }
      return {
        'background-color': backgroundColor
      };
    };

    jobs.prettifyTime = function (dateTime) {
      return moment(dateTime).format('h:mm a');
    };

    jobs.getPorter = function (porterId) {
      return allPorters.filter(porter => porter.porterId === porterId)[0] || {};
    };

    var processJobTime = function () {
      jobs.current.forEach(function (job) {
        var momentTime = moment(job.time);
        job.timeTillStart = momentTime.fromNow();
        job.prettyTime = momentTime.format('MMMM Do YYYY, h:mm a');
      });
    };

    var processPorters = function () {
      jobs.current.forEach(function (job) {
        job.portersAccepted = job.porters.length;
        job.portersArriving = job.porters.filter(porter => !!porter.startTime).length;
        job.portersReached = job.porters.filter(porter => !!porter.endTime).length;
      });
    };

    jobs.getStatusOfPorter = function(porter){
      if(porter.endTime){
        return 'Arrived';
      }
      if(porter.startTime){
        return 'On route';
      }
      return 'Accepted';
    };

    var segregateJobs = function () {
      jobs.fulfilled = jobs.current.filter(job => job.portersReached === job.portersRequired).sort((a, b) => {
        if (new Date(a.time) < new Date(b.time)) {
          return 1;
        }
        return -1;
      });
      jobs.pending = jobs.current.filter(job => job.portersReached !== job.portersRequired);
    };

    var processJobs = function () {
      processJobTime();
      processPorters();
      segregateJobs();
    };

    jobs.pad = function(n, width, z) {
      z = z || '0';
      n = n + '';
      return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
    };

    $http({
        method: 'GET',
        url: url + '/jobs'
      })
      .then(function (response) {
        jobs.current = response.data;
        processJobs();
      });

    $http({
      method: 'GET',
      url: url + '/porters'
    }).then(function (response) {
      allPorters = response.data;
    });

    socket.on('job-update', function (newJobs) {
      jobs.current = newJobs;
      processJobs();
      $scope.$digest();
    });
    $timeout(processJobTime, 1000 * 60);
  });
