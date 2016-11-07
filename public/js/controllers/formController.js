const jobster = angular.module('jobster', []);

jobster.controller('formController', ['$scope', '$http', ($scope, $http) => {
  const s = $scope;

  const clearForm = () => {
    s.status = '';
    s.company = '';
    s.title = '';
    s.description = '';
    s.link = '';
    s.city = '';
    s.state = '';
    s.application_date = '';
    s.compensation = '';
    s.rangeh = '';
    s.rangel = '';
    s.site_found = '';
    s.site_applied = '';
    s.cover_letter = '';
  };
  s.addJob = () => {
    $http({
      method: 'POST',
      url: '/api/job',
      data: {
        company: s.company,
        title: s.title,
        description: s.description,
        link: s.link,
        city: s.city,
        state: s.state,
        applyDate: s.application_date,
        compensation: s.compensation,
        rangeh: s.rangeh,
        rangel: s.rangel,
        siteFound: s.site_found,
        siteApplied: s.site_applied,
        coverLetter: s.cover_letter,
        status: s.status,
      },
    })
    .success((result) => {
      console.log(result);
      clearForm();
    })
    .error((data, status) => {
      console.log(data, status);
    });
  };
}]);

jobster.controller('jobDisplayController', ['$scope', '$http', ($scope, $http) => {
  const s = $scope;
  $http({
    method: 'GET',
    url: 'api/job',
  })
  .then((result) => {
    s.jobs = result.data;
    console.log(result.data);
  });
}]);
