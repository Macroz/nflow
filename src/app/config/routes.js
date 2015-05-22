(function () {
  'use strict';

  var m = angular.module('nflowExplorer.config.routes', [
    'nflowExplorer.services',
    'ui.router'
  ]);

  m.config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');

    $stateProvider.state('frontPageTab', {
      abstract: true,
      template: '<div ui-view></div>'
    });

    $stateProvider.state('searchTab', {
      abstract: true,
      template: '<div ui-view></div>'
    });

    $stateProvider.state('executorsTab', {
      abstract: true,
      template: '<div ui-view></div>'
    });

    $stateProvider.state('aboutTab', {
      abstract: true,
      template: '<div ui-view></div>'
    });

    $stateProvider
      .state('frontPage', {
        parent: 'frontPageTab',
        url: '/',
        templateUrl: 'app/front-page/frontPage.html',
        controller: 'FrontPageCtrl as ctrl'
      })
      .state('search', {
        parent: 'searchTab',
        url: '/search?type&state&parentWorkflowId',
        templateUrl: 'app/search/search.html',
        controller: 'SearchCtrl as ctrl',
        resolve: {
          definitions: function (WorkflowDefinitions) {
            return WorkflowDefinitions.query().$promise;
          }
        }
      })
      .state('executors', {
        parent: 'executorsTab',
        url: '/executors',
        templateUrl: 'app/executors/executors.html',
        controller: 'ExecutorsCtrl as ctrl'
      })
      .state('about', {
        parent: 'aboutTab',
        url: '/about',
        templateUrl: 'app/about/about.html',
        controller: 'AboutCtrl'
      })
      .state('workflow-stats', {
        parent: 'frontPageTab',
        url: '/workflow-stats?type',
        templateUrl: 'app/workflow-stats/workflowStats.html',
        controller: 'RadiatorCtrl'
      })
      .state('workflow-definition', {
        parent: 'frontPageTab',
        url: '/workflow-definition/:type',
        templateUrl: 'app/workflow-definition/workflowDefinition.html',
        controller: 'WorkflowDefinitionCtrl as ctrl',
        resolve: {
          loadCss: loadCss,
          definition: function (WorkflowDefinitions, $stateParams) {
            return getDefinition(WorkflowDefinitions, $stateParams.type);
          }
        }
      })
      .state('workflow', {
        parent: 'searchTab',
        url: '/workflow/:id',
        templateUrl: 'app/workflow/workflow.html',
        controller: 'WorkflowCtrl as ctrl',
        resolve: {
          loadCss: loadCss,
          workflow: function (Workflows, $stateParams) {
            return Workflows.get({id: $stateParams.id}).$promise;
          },
          definition: function (WorkflowDefinitions, workflow) {
            return getDefinition(WorkflowDefinitions, workflow.type);
          },
          parentWorkflow: function(Workflows, workflow) {
            if(workflow.parentWorkflowId) {
              return Workflows.get({id: workflow.parentWorkflowId}).$promise;
            }
            return undefined;
          },
          childWorkflows: function(WorkflowSearch, $stateParams) {
            return WorkflowSearch.query({parentWorkflowId: $stateParams.id}).$promise;
          }
        }
      });

    function getDefinition(WorkflowDefinitions, type) {
      return WorkflowDefinitions.get({type: type}).$promise.then(_.first);
    }

    function loadCss(GraphService) {
      return GraphService.loadCss();
    }

  });
})();
