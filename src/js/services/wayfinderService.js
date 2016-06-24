wayfinderApp.factory('wayfinderService', ['$rootScope', function($scope) {
    $scope.groups = null;
    $scope.poiObjects = null;
    $scope.floorsPOIs = null;
    $scope.atozLetters = null;

    $scope.tabs = [{
        name: 'search',
        icon: 'icon-search',
        link: '#/search',
        active: false
    }, {
        name: 'topics',
        icon: 'icon-topics',
        link: '#/topics',
        active: false
    }, {
        name: 'atoz',
        icon: 'icon-atoz',
        link: '#/atoz',
        active: false
    }, {
        name: 'floors',
        //icon: 'icon-floors',
        icon: 'fa fa-list-ol',
        link: '#/floors',
        active: false
    }];

    $scope.$watch('atozLetters', function(newVal, oldVal) {
        console.log("watching atozLetters:", oldVal, '->',
            newVal);
    });

    function extractGroups(groups) {
        var arr = [];
        for (var key in groups) {
            // add hasOwnPropertyCheck if needed
            var group = groups[key];
            if (group.showInMenu) {
                //$scope.collapsedGroup.push(false);
                group.image = getGroupImage(group);
                group.colorHEX = getGroupColorHEX(group);
                group.colorRGBA = getGroupColorRGBA(group);
                group.active = false;
                arr.push(group);
            };
        };
        //console.log("extractGroups.arr:", arr);
        return arr;
    };

    function extractPOIs(pois) {
        var arr = [];
        for (var i = pois.length - 1; i >= 0; i--) {
            var poi = pois[i];
            if (poi.showInMenu) {
                arr.push(poi);
            }
        };
        //console.log("extractPOIs.arr:", arr);
        return arr;
    };

    function extractPOIsByFloor(floors) {
        var arr = {};
        for (var i in floors) {
            //$scope.collapsedFloor.push(false);
            arr[floors[i].index] = [];
            for (var j in floors[i].pois) {
                arr[floors[i].index].push(floors[i].pois[j]);
            }
        }
        return arr;
    };

    function getAtoZLetters(pois, language) {
        var arr = [];
        var arr1 = [];
        for (var i in pois) {
            if (pois[i].showInMenu) {
                if (arr.indexOf(pois[i].getName(language)
                        .toLowerCase().charAt(0)) == -1) {
                    //console.log("letter", pois[i].getName(wayfinder.getLanguage()).toLowerCase().charAt(0), "exists? :", (arr.indexOf(pois[i].getName(wayfinder.getLanguage()).toLowerCase().charAt(0)) == -1));
                    arr.push(pois[i].getName(language)
                        .toLowerCase().charAt(0));
                }
            }
        }
        for (var key in arr) arr1.push({ name: arr[key], active: false });
        //console.log("getAtoZLetters.arr1:", arr1);
        return arr1;
    };

    function getGroupColorHEX(group) {
        //Function to convert hex format to a rgb textColor
        if (!group) return;
        var rgb = group.getColor();
        var r = rgb["r"];
        var g = rgb["g"];
        var b = rgb["b"];
        var a = rgb["a"];
        var textColor = "#" + r.toString(16).slice(-2) + g.toString(
            16).slice(-2) + b.toString(16).slice(-2);
        return textColor;
    };

    function getGroupColorRGBA(group) {
        //Function to convert hex format to a rgb textColor
        if (!group) return;
        var rgb = group.getColor();
        var r = rgb["r"];
        var g = rgb["g"];
        var b = rgb["b"];
        var a = rgb["a"];
        var textColor = "rgba(" + parseInt(r.toString(10) * 255) +
            "," + parseInt(g.toString(10) * 255) + "," +
            parseInt(b.toString(10) * 255) + "," + parseInt(a.toString(
                10) * 255) + ")";
        return textColor;
    };

    function getGroupImage(group) {
        if (!group) return false;
        if (group.imageID)
            return WayfinderAPI.getURL("images", "get", [group.imageID]);
    };

    return {
        getTabs: function() {
            return $scope.tabs;
        },
        getGroups: function() {
            return $scope.groups;
        },
        setGroups: function(groups) {
            console.log("wayfinderService.setGroups");
            $scope.groups = extractGroups(groups);
        },
        getPOIs: function() {
            return $scope.poiObjects;
        },
        setPOIs: function(pois) {
            console.log("wayfinderService.setPOIs");
            $scope.poiObjects = extractPOIs(pois);
        },
        getFloorsPOIs: function() {
            return $scope.floorsPOIs;
        },
        setFloorsPOIs: function(floors) {
            console.log("wayfinderService.setFloorsPOIs");
            $scope.floorsPOIs = extractPOIsByFloor(floors);
        },
        getAtozLetters: function() {
            return $scope.atozLetters;
        },
        setAtozLetters: function(pois, language) {
            console.log("wayfinderService.setAtozLetters");
            $scope.atozLetters = getAtoZLetters(pois, language);
        }
    };
}]);
