'use strict';

var app = angular.module('CrunchKata', ['ui.router', 'ui.bootstrap']);

app.config(function ($urlRouterProvider, $locationProvider) {
   // This turns off hashbang urls (/#about) and changes it to something normal (/about)
   $locationProvider.html5Mode(true);
   // If we go to a URL that ui-router doesn't have registered, go to the "/" url.
   $urlRouterProvider.otherwise('/');
});
"use strict";

app.controller('HomeController', function ($scope, Fixtures, Position, Variable) {

    $scope.welcomeMsg = "Welcome to Crunch.io!\n    Please select a survey question from the catalog on your left.";

    console.log(Position.get("Recommendation")); //should be 0
    console.log(Position.get("Aided Awareness (Logo)")); //should be last

    console.log(Variable.get(5));
    $scope.$on("selection", function () {
        $scope.selectedVar = Fixtures.getCurrentVar();
        console.log($scope.selectedVar);
    });
});
'use strict';

app.config(function ($stateProvider) {
    $stateProvider.state('home', {
        url: '/',
        templateUrl: '/pre-build/home/home.html',
        controller: 'HomeController'
    });
});
//http layer that request both fixtures
'use strict';

app.factory("Fixtures", function ($http, $rootScope) {
  var _order;
  var _variables;
  var selectedVar;

  $http.get('/variables').then(function (res) {
    _variables = res.data.index;
  });

  $http.get('order').then(function (res) {
    _order = res.data.graph;
  });

  var getOrder = function getOrder() {
    return $http.get('/order');
  };
  var getVariables = function getVariables() {
    return $http.get('/variables');
  };
  var setCurrentVar = function setCurrentVar(id) {
    selectedVar = _variables[id];
    $rootScope.$broadcast('selection');
  };

  return {
    variables: function variables() {
      return _variables;
    },
    order: function order() {
      return _order;
    },
    getOrder: getOrder,
    getVariables: getVariables,
    setCurrentVar: setCurrentVar,
    getCurrentVar: function getCurrentVar() {
      return selectedVar;
    }
  };
});
//accepts a variable's name and returns the variable's position in the order.
"use strict";

app.factory("Position", function (Fixtures) {
    var variables = Fixtures.variables();
    var orders = Fixtures.order();

    //returns position in the variables fixture
    var getPosition = function getPosition(name) {
        var index = 0;
        for (var id in variables) {
            if (variables[id].name === name) {
                return index; //position
            }
            index++;
        }
    };

    return {
        get: getPosition
    };
});
//accepts a position in the order and returns a variable.

"use strict";

app.factory("Variable", function (Fixtures) {
    var variables = Fixtures.variables();
    var keys = Object.keys(variables);
    var orders = Fixtures.order();

    //takes position in the variables fixtures
    var getVariable = function getVariable(num) {
        return variables[keys[num]];
    };
    return {
        get: getVariable
    };
});
'use strict';

app.controller('groupController', function ($scope) {

  $scope.typeOf = function (obj) {
    return typeof obj;
  };
  $scope.catalog = [];
});
"use strict";

app.directive("group", function (Fixtures) {
    return {
        restrict: "E",
        replace: true,
        scope: {
            order: '='
        },
        templateUrl: "/pre-build/common/directive/group/group.html",
        controller: 'groupController'
    };
});
'use strict';

app.controller('ItemController', function ($scope, Fixtures) {
    $scope.isCollapsed = true;

    Fixtures.getVariables().then(function (result) {
        $scope.variables = result.data.index;
        $scope.getName = function (id) {
            return $scope.variables[id].name;
        };
    });
    //returns the length of the item
    $scope.getLength = function (item) {
        return item.length;
    };

    $scope.setCurrentVar = Fixtures.setCurrentVar;
});
"use strict";

app.directive("item", function ($compile) {
    return {
        restrict: "E",
        // replace: true,
        scope: {
            item: '=',
            key: '='
        },
        controller: "ItemController",
        templateUrl: "/pre-build/common/directive/item/item.html",
        link: function link(scope, element, attrs) {
            if (angular.isArray(scope.item)) {
                // append the collection direcelement and render the directive
                // <a class='btn btn-default btn-block'></a>
                $compile("\n                    <a id='item' ng-click='isCollapsed = !isCollapsed'>\n                        <i class='fa fa-plus' ng-show='isCollapsed'></i>\n                        <i class='fa fa-minus'ng-show='!isCollapsed'></i>\n                        {{key}}\n                        <span class='badge pull-right'>{{getLength(item)}}</span>\n                    </a>\n                    <ul collapse='isCollapsed'>\n                        <group order='item'></group>\n                    </ul>\n                    ")(scope, function (cloned, scope) {
                    element.replaceWith(cloned);
                });
            } else if (angular.isObject(scope.item)) {
                $compile("<group order='item'></group>")(scope, function (cloned, scope) {
                    element.replaceWith(cloned);
                });
            } else {
                $compile("<a ng-click='setCurrentVar(item)'>{{getName(item)}}</a>")(scope, function (cloned, scope) {
                    element.replaceWith(cloned);
                });
            }
        }
    };
});
"use strict";

app.controller('NavbarController', function ($scope, Fixtures) {

  $scope.getName = function (id) {
    return $scope.variables[id];
  };

  $scope.test = function (id) {
    return "hi";
  };
});
"use strict";

app.directive("navbar", function (Fixtures) {
    return {
        restrict: "E",
        templateUrl: "/pre-build/common/directive/navbar/navbar.html",
        controller: "NavbarController",
        link: function link(scope, element, attribute) {
            Fixtures.getOrder().then(function (result) {
                scope.order = result.data.graph;
            });
            Fixtures.getVariables().then(function (result) {
                scope.variables = result.data.index;
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyIsImhvbWUvaG9tZS5jb250cm9sbGVyLmpzIiwiaG9tZS9ob21lLnN0YXRlLmpzIiwiY29tbW9uL2ZhY3RvcnkvZml4dHVyZXMuZmFjdG9yeS5qcyIsImNvbW1vbi9mYWN0b3J5L3Bvc2l0aW9uLmZhY3RvcnkuanMiLCJjb21tb24vZmFjdG9yeS92YXJpYWJsZS5mYWN0b3J5LmpzIiwiY29tbW9uL2RpcmVjdGl2ZS9ncm91cC9ncm91cC5jb250cm9sbGVyLmpzIiwiY29tbW9uL2RpcmVjdGl2ZS9ncm91cC9ncm91cC5kaXJlY3RpdmUuanMiLCJjb21tb24vZGlyZWN0aXZlL2l0ZW0vaXRlbS5jb250cm9sbGVyLmpzIiwiY29tbW9uL2RpcmVjdGl2ZS9pdGVtL2l0ZW0uZGlyZWN0aXZlLmpzIiwiY29tbW9uL2RpcmVjdGl2ZS9uYXZiYXIvbmF2YmFyLmNvbnRyb2xsZXIuanMiLCJjb21tb24vZGlyZWN0aXZlL25hdmJhci9uYXZiYXIuZGlyZWN0aXZlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsSUFBSSxHQUFHLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxZQUFZLEVBQUUsQ0FBQyxXQUFXLEVBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQzs7QUFFckUsR0FBRyxDQUFDLE1BQU0sQ0FBQyxVQUFVLGtCQUFrQixFQUFFLGlCQUFpQixFQUFFOztBQUV6RCxvQkFBaUIsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUM7O0FBRWxDLHFCQUFrQixDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQztDQUNwQyxDQUFDLENBQUM7OztBQ1BILEdBQUcsQ0FBQyxVQUFVLENBQUMsZ0JBQWdCLEVBQUUsVUFBUyxNQUFNLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUU7O0FBRTVFLFVBQU0sQ0FBQyxVQUFVLDhGQUM4QyxDQUFDOztBQUloRSxXQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsZ0JBQWdC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QztTQUNOO0tBQ0osQ0FBQztDQUNMLENBQUMsQ0FBQyIsImZpbGUiOiJidWlsZC5qcyIsInNvdXJjZXNDb250ZW50IjpbInZhciBhcHAgPSBhbmd1bGFyLm1vZHVsZSgnQ3J1bmNoS2F0YScsIFsndWkucm91dGVyJywndWkuYm9vdHN0cmFwJ10pO1xuXG5hcHAuY29uZmlnKGZ1bmN0aW9uICgkdXJsUm91dGVyUHJvdmlkZXIsICRsb2NhdGlvblByb3ZpZGVyKSB7XG4gICAvLyBUaGlzIHR1cm5zIG9mZiBoYXNoYmFuZyB1cmxzICgvI2Fib3V0KSBhbmQgY2hhbmdlcyBpdCB0byBzb21ldGhpbmcgbm9ybWFsICgvYWJvdXQpXG4gICAkbG9jYXRpb25Qcm92aWRlci5odG1sNU1vZGUodHJ1ZSk7XG4gICAvLyBJZiB3ZSBnbyB0byBhIFVSTCB0aGF0IHVpLXJvdXRlciBkb2Vzbid0IGhhdmUgcmVnaXN0ZXJlZCwgZ28gdG8gdGhlIFwiL1wiIHVybC5cbiAgICR1cmxSb3V0ZXJQcm92aWRlci5vdGhlcndpc2UoJy8nKTtcbn0pOyIsImFwcC5jb250cm9sbGVyKCdIb21lQ29udHJvbGxlcicsIGZ1bmN0aW9uKCRzY29wZSwgRml4dHVyZXMsIFBvc2l0aW9uLCBWYXJpYWJsZSkge1xuXG4gICAgJHNjb3BlLndlbGNvbWVNc2cgPSBgV2VsY29tZSB0byBDcnVuY2guaW8hXG4gICAgUGxlYXNlIHNlbGVjdCBhIHN1cnZleSBxdWVzdGlvbiBmcm9tIHRoZSBjYXRhbG9nIG9uIHlvdXIgbGVmdC5gO1xuXG5cblxuICAgIGNvbnNvbGUubG9nKFBvc2l0aW9uLmdldChcIlJlY29tbWVuZGF0aW9uXCIpKTsgLy9zaG91bGQgYmUgMFxuICAgIGNvbnNvbGUubG9nKFBvc2l0aW9uLmdldChcIkFpZGVkIEF3YXJlbmVzcyAoTG9nbylcIikpOyAvL3Nob3VsZCBiZSBsYXN0XG5cbiAgICBjb25zb2xlLmxvZyhWYXJpYWJsZS5nZXQoNSkpO1xuICAgICRzY29wZS4kb24oXCJzZWxlY3Rpb25cIiwgZnVuY3Rpb24oKSB7XG4gICAgICAkc2NvcGUuc2VsZWN0ZWRWYXIgPSBGaXh0dXJlcy5nZXRDdXJyZW50VmFyKCk7XG4gICAgICBjb25zb2xlLmxvZygkc2NvcGUuc2VsZWN0ZWRWYXIpO1xuICAgIH0pO1xufSk7XG4iLCJhcHAuY29uZmlnKGZ1bmN0aW9uKCRzdGF0ZVByb3ZpZGVyKSB7XG4gICAgJHN0YXRlUHJvdmlkZXIuc3RhdGUoJ2hvbWUnLCB7XG4gICAgICAgIHVybDogJy8nLFxuICAgICAgICB0ZW1wbGF0ZVVybDogJy9wcmUtYnVpbGQvaG9tZS9ob21lLmh0bWwnLFxuICAgICAgICBjb250cm9sbGVyOiAnSG9tZUNvbnRyb2xsZXInXG4gICAgfSk7XG59KTsiLCIvL2h0dHAgbGF5ZXIgdGhhdCByZXF1ZXN0IGJvdGggZml4dHVyZXNcbmFwcC5mYWN0b3J5KFwiRml4dHVyZXNcIiwgZnVuY3Rpb24oJGh0dHAsJHJvb3RTY29wZSl7XG4gIHZhciBvcmRlcjtcbiAgdmFyIHZhcmlhYmxlcztcbiAgdmFyIHNlbGVjdGVkVmFyO1xuXG4gICRodHRwLmdldCgnL3ZhcmlhYmxlcycpLnRoZW4oZnVuY3Rpb24ocmVzKXtcbiAgICB2YXJpYWJsZXMgPSByZXMuZGF0YS5pbmRleDtcbiAgfSk7XG5cbiAgJGh0dHAuZ2V0KCdvcmRlcicpLnRoZW4oZnVuY3Rpb24ocmVzKXtcbiAgICBvcmRlciA9IHJlcy5kYXRhLmdyYXBoO1xuICB9KTtcblxuICB2YXIgZ2V0T3JkZXIgPSAoKSA9PiAkaHR0cC5nZXQoJy9vcmRlcicpO1xuICB2YXIgZ2V0VmFyaWFibGVzID0gKCkgPT4gJGh0dHAuZ2V0KCcvdmFyaWFibGVzJyk7XG4gIHZhciBzZXRDdXJyZW50VmFyID0gKGlkKSA9PiB7XG4gICAgc2VsZWN0ZWRWYXIgPSB2YXJpYWJsZXNbaWRdO1xuICAgICRyb290U2NvcGUuJGJyb2FkY2FzdCgnc2VsZWN0aW9uJyk7XG4gIH07XG5cblxuXG4gIHJldHVybiB7XG4gICAgdmFyaWFibGVzOiAoKSA9PiB2YXJpYWJsZXMsXG4gICAgb3JkZXI6ICgpID0+IG9yZGVyLFxuICAgIGdldE9yZGVyOiBnZXRPcmRlcixcbiAgICBnZXRWYXJpYWJsZXMgOiBnZXRWYXJpYWJsZXMsXG4gICAgc2V0Q3VycmVudFZhciA6IHNldEN1cnJlbnRWYXIsXG4gICAgZ2V0Q3VycmVudFZhciA6ICgpID0+IHNlbGVjdGVkVmFyXG4gIH07XG59KTsiLCIvL2FjY2VwdHMgYSB2YXJpYWJsZSdzIG5hbWUgYW5kIHJldHVybnMgdGhlIHZhcmlhYmxlJ3MgcG9zaXRpb24gaW4gdGhlIG9yZGVyLlxuYXBwLmZhY3RvcnkoXCJQb3NpdGlvblwiLCBmdW5jdGlvbihGaXh0dXJlcykge1xuICB2YXIgdmFyaWFibGVzID0gRml4dHVyZXMudmFyaWFibGVzKCk7XG4gIHZhciBvcmRlcnMgPSBGaXh0dXJlcy5vcmRlcigpO1xuXG4gIC8vcmV0dXJucyBwb3NpdGlvbiBpbiB0aGUgdmFyaWFibGVzIGZpeHR1cmVcbiAgICB2YXIgZ2V0UG9zaXRpb24gPSAobmFtZSkgPT4ge1xuICAgICAgbGV0IGluZGV4ID0gMDtcbiAgICAgICAgICAgIGZvciAobGV0IGlkIGluIHZhcmlhYmxlcykge1xuICAgICAgICAgICAgICAgIGlmICh2YXJpYWJsZXNbaWRdLm5hbWUgPT09IG5hbWUpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGluZGV4OyAvL3Bvc2l0aW9uXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgaW5kZXgrKztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgIHJldHVybiB7XG4gICAgICAgIGdldDogZ2V0UG9zaXRpb25cbiAgICB9O1xufSk7IiwiLy9hY2NlcHRzIGEgcG9zaXRpb24gaW4gdGhlIG9yZGVyIGFuZCByZXR1cm5zIGEgdmFyaWFibGUuXG5cbmFwcC5mYWN0b3J5KFwiVmFyaWFibGVcIiwgZnVuY3Rpb24oRml4dHVyZXMpIHtcbiAgdmFyIHZhcmlhYmxlcyA9IEZpeHR1cmVzLnZhcmlhYmxlcygpO1xuICB2YXIga2V5cyA9IE9iamVjdC5rZXlzKHZhcmlhYmxlcyk7XG4gIHZhciBvcmRlcnMgPSBGaXh0dXJlcy5vcmRlcigpO1xuXG4gIC8vdGFrZXMgcG9zaXRpb24gaW4gdGhlIHZhcmlhYmxlcyBmaXh0dXJlc1xuICAgIHZhciBnZXRWYXJpYWJsZSA9IChudW0pID0+IHZhcmlhYmxlc1trZXlzW251bV1dO1xuICAgIHJldHVybiB7XG4gICAgICAgIGdldDogZ2V0VmFyaWFibGVcbiAgICB9O1xufSk7IiwiYXBwLmNvbnRyb2xsZXIoJ2dyb3VwQ29udHJvbGxlcicsIGZ1bmN0aW9uKCRzY29wZSkge1xuXG4gICRzY29wZS50eXBlT2YgPSAob2JqKSA9PiAodHlwZW9mIG9iaik7XG4gICRzY29wZS5jYXRhbG9nID0gW107XG59KTsiLCJhcHAuZGlyZWN0aXZlKFwiZ3JvdXBcIiwgZnVuY3Rpb24oRml4dHVyZXMpIHtcbiAgICByZXR1cm4ge1xuICAgICAgICByZXN0cmljdDogXCJFXCIsXG4gICAgICAgIHJlcGxhY2U6IHRydWUsXG4gICAgICAgIHNjb3BlOiB7XG4gICAgICAgICAgICBvcmRlcjogJz0nXG4gICAgICAgIH0sXG4gICAgICAgIHRlbXBsYXRlVXJsOiBcIi9wcmUtYnVpbGQvY29tbW9uL2RpcmVjdGl2ZS9ncm91cC9ncm91cC5odG1sXCIsXG4gICAgICAgIGNvbnRyb2xsZXI6ICdncm91cENvbnRyb2xsZXInXG4gICAgfTtcbn0pO1xuIiwiYXBwLmNvbnRyb2xsZXIoJ0l0ZW1Db250cm9sbGVyJywgZnVuY3Rpb24oJHNjb3BlLCBGaXh0dXJlcykge1xuICAgICRzY29wZS5pc0NvbGxhcHNlZCA9IHRydWU7XG5cbiAgICBGaXh0dXJlcy5nZXRWYXJpYWJsZXMoKS50aGVuKGZ1bmN0aW9uKHJlc3VsdCkge1xuICAgICAgICAkc2NvcGUudmFyaWFibGVzID0gcmVzdWx0LmRhdGEuaW5kZXg7XG4gICAgICAgICRzY29wZS5nZXROYW1lID0gKGlkKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gJHNjb3BlLnZhcmlhYmxlc1tpZF0ubmFtZTtcbiAgICAgICAgfTtcbiAgICB9KTtcbiAgICAvL3JldHVybnMgdGhlIGxlbmd0aCBvZiB0aGUgaXRlbVxuICAgICRzY29wZS5nZXRMZW5ndGggPSAoaXRlbSkgPT4ge1xuICAgICAgcmV0dXJuIGl0ZW0ubGVuZ3RoO1xuICAgIH07XG5cbiAgICAkc2NvcGUuc2V0Q3VycmVudFZhciA9IEZpeHR1cmVzLnNldEN1cnJlbnRWYXI7XG59KTtcblxuIiwiYXBwLmRpcmVjdGl2ZShcIml0ZW1cIiwgZnVuY3Rpb24oJGNvbXBpbGUpIHtcbiAgICByZXR1cm4ge1xuICAgICAgICByZXN0cmljdDogXCJFXCIsXG4gICAgICAgIC8vIHJlcGxhY2U6IHRydWUsXG4gICAgICAgIHNjb3BlOiB7XG4gICAgICAgICAgICBpdGVtOiAnPScsXG4gICAgICAgICAgICBrZXk6ICc9J1xuICAgICAgICB9LFxuICAgICAgICBjb250cm9sbGVyOiBcIkl0ZW1Db250cm9sbGVyXCIsXG4gICAgICAgIHRlbXBsYXRlVXJsOiBcIi9wcmUtYnVpbGQvY29tbW9uL2RpcmVjdGl2ZS9pdGVtL2l0ZW0uaHRtbFwiLFxuICAgICAgICBsaW5rOiBmdW5jdGlvbihzY29wZSwgZWxlbWVudCwgYXR0cnMpIHtcbiAgICAgICAgICAgIGlmIChhbmd1bGFyLmlzQXJyYXkoc2NvcGUuaXRlbSkpIHtcbiAgICAgICAgICAgICAgICAvLyBhcHBlbmQgdGhlIGNvbGxlY3Rpb24gZGlyZWNlbGVtZW50IGFuZCByZW5kZXIgdGhlIGRpcmVjdGl2ZVxuICAgICAgICAgICAgICAgIC8vIDxhIGNsYXNzPSdidG4gYnRuLWRlZmF1bHQgYnRuLWJsb2NrJz48L2E+XG4gICAgICAgICAgICAgICAgJGNvbXBpbGUoYFxuICAgICAgICAgICAgICAgICAgICA8YSBpZD0naXRlbScgbmctY2xpY2s9J2lzQ29sbGFwc2VkID0gIWlzQ29sbGFwc2VkJz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxpIGNsYXNzPSdmYSBmYS1wbHVzJyBuZy1zaG93PSdpc0NvbGxhcHNlZCc+PC9pPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGkgY2xhc3M9J2ZhIGZhLW1pbnVzJ25nLXNob3c9JyFpc0NvbGxhcHNlZCc+PC9pPlxuICAgICAgICAgICAgICAgICAgICAgICAge3trZXl9fVxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9J2JhZGdlIHB1bGwtcmlnaHQnPnt7Z2V0TGVuZ3RoKGl0ZW0pfX08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgIDwvYT5cbiAgICAgICAgICAgICAgICAgICAgPHVsIGNvbGxhcHNlPSdpc0NvbGxhcHNlZCc+XG4gICAgICAgICAgICAgICAgICAgICAgICA8Z3JvdXAgb3JkZXI9J2l0ZW0nPjwvZ3JvdXA+XG4gICAgICAgICAgICAgICAgICAgIDwvdWw+XG4gICAgICAgICAgICAgICAgICAgIGApKHNjb3BlLCBmdW5jdGlvbihjbG9uZWQsIHNjb3BlKSB7XG4gICAgICAgICAgICAgICAgICAgIGVsZW1lbnQucmVwbGFjZVdpdGgoY2xvbmVkKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0gZWxzZSBpZihhbmd1bGFyLmlzT2JqZWN0KHNjb3BlLml0ZW0pKXtcbiAgICAgICAgICAgJGNvbXBpbGUoXCI8Z3JvdXAgb3JkZXI9J2l0ZW0nPjwvZ3JvdXA+XCIpKHNjb3BlLCBmdW5jdGlvbihjbG9uZWQsIHNjb3BlKSB7XG4gICAgICAgICAgICAgICAgICAgIGVsZW1lbnQucmVwbGFjZVdpdGgoY2xvbmVkKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgJGNvbXBpbGUoXCI8YSBuZy1jbGljaz0nc2V0Q3VycmVudFZhcihpdGVtKSc+e3tnZXROYW1lKGl0ZW0pfX08L2E+XCIpKHNjb3BlLCBmdW5jdGlvbihjbG9uZWQsIHNjb3BlKSB7XG4gICAgICAgICAgICAgICAgICAgIGVsZW1lbnQucmVwbGFjZVdpdGgoY2xvbmVkKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG59KTtcbiIsImFwcC5jb250cm9sbGVyKCdOYXZiYXJDb250cm9sbGVyJywgZnVuY3Rpb24oJHNjb3BlLCBGaXh0dXJlcykge1xuXG4kc2NvcGUuZ2V0TmFtZSA9IChpZCkgPT4ge3JldHVybiAkc2NvcGUudmFyaWFibGVzW2lkXX07XG5cbiRzY29wZS50ZXN0PSAoaWQpID0+IHtyZXR1cm4gXCJoaVwifTtcblxufSk7IiwiYXBwLmRpcmVjdGl2ZShcIm5hdmJhclwiLCBmdW5jdGlvbihGaXh0dXJlcykge1xuICAgIHJldHVybiB7XG4gICAgICAgIHJlc3RyaWN0OiBcIkVcIixcbiAgICAgICAgdGVtcGxhdGVVcmw6IFwiL3ByZS1idWlsZC9jb21tb24vZGlyZWN0aXZlL25hdmJhci9uYXZiYXIuaHRtbFwiLFxuICAgICAgICBjb250cm9sbGVyOiBcIk5hdmJhckNvbnRyb2xsZXJcIixcbiAgICAgICAgbGluazogZnVuY3Rpb24oc2NvcGUsIGVsZW1lbnQsIGF0dHJpYnV0ZSkge1xuICAgICAgICAgICAgRml4dHVyZXMuZ2V0T3JkZXIoKS50aGVuKGZ1bmN0aW9uKHJlc3VsdCkge1xuICAgICAgICAgICAgICAgIHNjb3BlLm9yZGVyID0gcmVzdWx0LmRhdGEuZ3JhcGg7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIEZpeHR1cmVzLmdldFZhcmlhYmxlcygpLnRoZW4oZnVuY3Rpb24ocmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgc2NvcGUudmFyaWFibGVzID0gcmVzdWx0LmRhdGEuaW5kZXg7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH07XG59KTtcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==