'use strict';
angular.module('instavansPorterAdminApp')
  .controller('analyticsCtrl', function ($scope, $http, $timeout) {
    var url = window.appUrl || 'http://localhost:1337';

    $http.get(url + '/jobs')
      .then(function (response) {
        var data = response.data;
        data.forEach(d => {
          d.formattedDate = moment(d.time).format('YYYY-MM-DD')
        });

        var groupedData = _.groupBy(data, 'formattedDate');

        var dates = data.map(d => d.formattedDate);

        var jobsPerDay = dates.map(eachDate => groupedData[eachDate].length);

        var workersLatePerJob = dates.map((eachDate, i) => {
          var lateWorkers = 0;

        });

        dates.unshift('x');
        jobsPerDay.unshift('No. of jobs');
        var chart = c3.generate({
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
                rotate : 60
              }
            },
            y : {
              tick : {
                values : [0,1,2,3,4,5,6]
              }
            }
          }
        });
      }, 1);
  });
