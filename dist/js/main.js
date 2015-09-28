// Declare app level module which depends on filters, and services
angular.module('app', [
  'wfangular',
  'wf.languages'
]);
angular.module('wf.languages', ['wfangular'])
.controller('LanguagesController', ['$scope', 'wfangular3d', function($scope, wayfinder) {
		$scope.languages = {};

		$scope.$on('wf.data.loaded', function(event, data){
			$scope.$apply(function () {
				$scope.languages = wayfinder.getLanguages();
			});
		});
}]);