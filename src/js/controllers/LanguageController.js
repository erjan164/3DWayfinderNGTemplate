/**
 * Created by tonis on 28.09.16.
 */
//var groupsModule = angular.module('wf.groups', ['wfangular']);

//groupsModule.controller('GroupsCtrl', [
wfApp.controller('LanguageController', [
    '$rootScope',
    '$scope',
    '$timeout',
    'wfService',
    'wfangular3d',
    function($rootScope, $scope, $timeout, wfService, wayfinder) {
        $scope.languages = [];
        $scope.activeLanguage = null;

        $scope.getLanguage = function() {
            return wayfinder.getLanguage();
        };

        $scope.$on("wf.language.change", function (event, language) {
            if ($scope.languages.length) {
                angular.forEach($scope.languages, function (lang) {
                    lang.active = lang.name == language;
                    if (lang.active) {
                        $scope.activeLanguage = lang;
                    }
                })
            }
        });

        $scope.setLanguage = function (language) {
            console.debug("setLanguage:", language);
            wayfinder.setLanguage(language.name);
        };

        $scope.$on("wf.data.loaded", function () {
            console.debug("languageController.data.loaded");
            if (!$scope.languages.length) {
                var langs = wayfinder.getLanguages();
                angular.forEach(langs, function (lang) {
                    lang.active = lang.name == wayfinder.getLanguage();
                    $scope.languages.push(lang);
                })
            }
            if (!$scope.activeLanguage) {
                angular.forEach($scope.languages, function (lang) {
                    if (lang.name == wayfinder.getLanguage())
                        $scope.activeLanguage = lang;
                });
            }
            console.debug($scope.languages);
        })
    }
]);