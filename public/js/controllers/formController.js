const jobster = angular.module('jobster.controllers', []);

jobster.controller('formController', ['$scope', '$http', 'authentication', function ($scope, $http, authentication) {
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
    let id = authentication.currentUser().user_id;
    $http({
      method: 'POST',
      url: '/api/job',
      headers: {
        Authorization: 'Bearer '+ authentication.getToken()
      },
      data: {
        user: id,
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

jobster.factory('jobData', ($http, authentication) => {
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
        headers: {
          Authorization: 'Bearer '+ authentication.getToken()
        }
      });
    },
    getUserJobs: () => {
      let id = authentication.currentUser().user_id;
      return $http({
        method: 'GET',
        url: `api/jobs/${id}`,
        headers: {
          Authorization: 'Bearer '+ authentication.getToken()
        }
      });
    },
    getJob: (id) => {
      return $http({
        method: 'GET',
        url: `api/job/${id}`,
        headers: {
          Authorization: 'Bearer '+ authentication.getToken()
        }
      });
    },
  };
});


jobster.controller('jobDisplayController', ['$scope', 'jobData', ($scope, jobData) => {
  const s = $scope;
  jobData.getUserJobs()
    .success((data) => {
      s.jobs = data;
    });
  s.storeId = (id) => {
    jobData.storeId(id);
  };
}]);

jobster.controller('jobDetailsController', ['$scope','$http', 'jobData', 'authentication', ($scope, $http, jobData, authentication) => {
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
    let uid = authentication.currentUser().user_id;
    $http({
      method: 'PUT',
      url: `api/job/${id}`,
      headers: {
        Authorization: 'Bearer '+ authentication.getToken()
      },
      data: {
        user: uid,
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

  jobDeleted = () => {
    s.deleted = true;
  };

  s.deleteJob = (id) => {
    let url = `api/job/${id}`;
    $http.delete(url,{
      method: 'DELETE',
      url: url,
      headers: {
        Authorization: 'Bearer '+ authentication.getToken()
      }
    })
    .success(() => {
      jobDeleted();
    });
  };
}]);
