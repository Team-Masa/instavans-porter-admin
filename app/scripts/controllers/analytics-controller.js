'use strict';
angular.module('instavansPorterAdminApp')
  .controller('analyticsCtrl', function ($scope, $http, $timeout) {
    var url = window.appUrl || 'http://localhost:1337';

    $http.get(url + '/jobs')
      .then(function (response) {
        var data = response.data;
        var totalWorkers = 0;

        data.forEach(d => {
          d.formattedDate = moment(d.time).format('YYYY-MM-DD');
          totalWorkers += d.porters.length;
        });

        var groupedData = _.groupBy(data, 'formattedDate');
        var dates = data.map(d => d.formattedDate);
        var jobsPerDay = dates.map(eachDate => groupedData[eachDate].length);

        var workersLatePerJob = dates.map((eachDate, i) => {
          var lateWorkers = 0;
          groupedData[eachDate].forEach(job => {
            lateWorkers += job.porters.filter(porter => new Date(porter.endTime) > new Date(job.time)).length;
          });
          return lateWorkers;
        });

        var percentageWorkersLate = _.sum(workersLatePerJob) / totalWorkers;
        $scope.percentageWorkersLate = Math.floor(percentageWorkersLate * 1000) / 10;

        dates.unshift('x');
        jobsPerDay.unshift('No. of jobs');
        workersLatePerJob.unshift('Porters late per job');

        $scope.map = {
          markers : data.map(job => [job.location.lat, job.location.lng, 1]),
          center : {
            y : 77.7137305999999,
            x : 13.2417155
          }
        };

        var chart1 = c3.generate({
          bindto: '#chart',
          data: {
            x: 'x',
            columns: [
              dates,
              jobsPerDay
            ]
          },
          axis: {
            x: {
              type: 'timeseries',
              tick: {
                format: '%Y-%m-%d',
                rotate: 60
              }
            },
            y: {
              tick: {
                values: [0, 1, 2, 3, 4, 5, 6]
              }
            }
          }
        });

        var chart2 = c3.generate({
          bindto: '#chart2',
          data: {
            colors: {
              'Porters late per job': '#EF5350'
            },
            x: 'x',
            columns: [
              dates,
              workersLatePerJob
            ]
          },
          axis: {
            x: {
              type: 'timeseries',
              tick: {
                format: '%Y-%m-%d',
                rotate: 60
              }
            },
            y: {
              tick: {
                values: [0, 1, 2, 3, 4, 5, 6]
              }
            }
          }
        });
      }, 1);


  });
