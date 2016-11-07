const jobster = angular.module('jobster', []);

jobster.controller('formController', ['$scope', '$http', ($scope, $http) => {
  const s = $scope;
  const clearForm = () => {
    s.company = '';
    s.title = '';
    s.description = '';
    s.city = '';
    s.state = '';
    s.compensation = '';
    s.rangeh = '';
    s.rangel = '';
    s.siteFound = '';
    s.siteApplied = '';
    s.coverLetter = '';
  };
  s.addJob = () => {
    $http({
      method: 'POST',
      url: '/api/job',
      data: {
        company: s.company,
        title: s.title,
        description: s.description,
        city: s.city,
        state: s.state,
        compensation: s.compensation,
        rangeh: s.rangeh,
        rangel: s.rangel,
        siteFound: s.site_found,
        siteApplied: s.site_applied,
        coverLetter: s.cover_letter,
      },
    })
    .success((result) => {
      console.log(result);
      clearForm();
    })
    .error((data, status) => {
      console.log(status);
    });
  };
}]);
