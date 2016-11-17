const jobster = angular.module('jobster.controllers', []);

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
    .success(() => {
      clearForm();
    })
    .error(() => {
    });
  };
}]);

jobster.factory('jobData', ($http) => {
  return {
    storeId: (id) => {
      localStorage.setItem('currid', id);
    },
    getId: () => {
      return localStorage.getItem('currid');
    },
    getJobs: () => {
      return $http({
        method: 'GET',
        url: 'api/job',
      });
    },
    getJob: (id) => {
      return $http({
        method: 'GET',
        url: `api/job/${id}`,
      });
    },
  };
});


jobster.controller('jobDisplayController', ['$scope', 'jobData', ($scope, jobData) => {
  const s = $scope;
  jobData.getJobs()
    .success((data) => {
      s.jobs = data;
    });
  s.storeId = (id) => {
    jobData.storeId(id);
  };
}]);

jobster.controller('jobDetailsController', ['$scope','$http', 'jobData', ($scope, $http, jobData) => {
  const s = $scope;
  const id = jobData.getId();
  const getJobDetails = (jid) => {
    jobData.getJob(jid)
    .success((response) => {
      s.jobDetails = response;
    });
  };
  getJobDetails(id);

  s.updateJob = (id) => {
    $http({
      method: 'PUT',
      url: `api/job/${id}`,
      data: {
        status: s.status,
        company: s.company,
        title: s.title,
        link: s.link,
        city: s.city,
        state: s.state,
        applyDate: s.application_date,
        compensation: s.compensation,
        rangeh: s.rangeh,
        rangel: s.rangel,
        siteFound: s.site_found,
        siteApplied: s.site_applied,
        description: s.description,
      },
    })
      .success(() => {
        getJobDetails(id);
      });
  };

  s.deleteJob = (id) => {
    let url = `api/job/${id}`;
    $http.delete(url)
        .success(() => {
        });
  };
}]);
