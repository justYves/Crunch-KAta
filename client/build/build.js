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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyIsImhvbWUvaG9tZS5jb250cm9sbGVyLmpzIiwiaG9tZS9ob21lLnN0YXRlLmpzIiwiY29tbW9uL2ZhY3RvcnkvZml4dHVyZXMuZmFjdG9yeS5qcyIsImNvbW1vbi9mYWN0b3J5L3Bvc2l0aW9uLmZhY3RvcnkuanMiLCJjb21tb24vZmFjdG9yeS92YXJpYWJsZS5mYWN0b3J5LmpzIiwiY29tbW9uL2RpcmVjdGl2ZS9ncm91cC9ncm91cC5jb250cm9sbGVyLmpzIiwiY29tbW9uL2RpcmVjdGl2ZS9ncm91cC9ncm91cC5kaXJlY3RpdmUuanMiLCJjb21tb24vZGlyZWN0aXZlL2l0ZW0vaXRlbS5jb250cm9sbGVyLmpzIiwiY29tbW9uL2RpcmVjdGl2ZS9pdGVtL2l0ZW0uZGlyZWN0aXZlLmpzIiwiY29tbW9uL2RpcmVjdGl2ZS9uYXZiYXIvbmF2YmFyLmNvbnRyb2xsZXIuanMiLCJjb21tb24vZGlyZWN0aXZlL25hdmJhci9uYXZiYXIuZGlyZWN0aXZlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsSUFBSSxHQUFHLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxZQUFZLEVBQUUsQ0FBQyxXQUFXLEVBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQzs7QUFFckUsR0FBRyxDQUFDLE1BQU0sQ0FBQyxVQUFVLGtCQUFrQixFQUFFLGlCQUFpQixFQUFFOztBQUV6RCxvQkFBaUIsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUM7O0FBRWxDLHFCQUFrQixDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQztDQUNwQyxDQUFDLENBQUM7OztBQ1BILEdBQUcsQ0FBQyxVQUFVLENBQUMsZ0JBQWdCLEVBQUUsVUFBUyxNQUFNLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUU7O0FBRTVFLFdBQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUM7QUFDNUMsV0FBTyxDQUFDLEdB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ZmlsZSI6ImJ1aWxkLmpzIiwic291cmNlc0NvbnRlbnQiOlsidmFyIGFwcCA9IGFuZ3VsYXIubW9kdWxlKCdDcnVuY2hLYXRhJywgWyd1aS5yb3V0ZXInLCd1aS5ib290c3RyYXAnXSk7XG5cbmFwcC5jb25maWcoZnVuY3Rpb24gKCR1cmxSb3V0ZXJQcm92aWRlciwgJGxvY2F0aW9uUHJvdmlkZXIpIHtcbiAgIC8vIFRoaXMgdHVybnMgb2ZmIGhhc2hiYW5nIHVybHMgKC8jYWJvdXQpIGFuZCBjaGFuZ2VzIGl0IHRvIHNvbWV0aGluZyBub3JtYWwgKC9hYm91dClcbiAgICRsb2NhdGlvblByb3ZpZGVyLmh0bWw1TW9kZSh0cnVlKTtcbiAgIC8vIElmIHdlIGdvIHRvIGEgVVJMIHRoYXQgdWktcm91dGVyIGRvZXNuJ3QgaGF2ZSByZWdpc3RlcmVkLCBnbyB0byB0aGUgXCIvXCIgdXJsLlxuICAgJHVybFJvdXRlclByb3ZpZGVyLm90aGVyd2lzZSgnLycpO1xufSk7IiwiYXBwLmNvbnRyb2xsZXIoJ0hvbWVDb250cm9sbGVyJywgZnVuY3Rpb24oJHNjb3BlLCBGaXh0dXJlcywgUG9zaXRpb24sIFZhcmlhYmxlKSB7XG5cbiAgICBjb25zb2xlLmxvZyhQb3NpdGlvbi5nZXQoXCJSZWNvbW1lbmRhdGlvblwiKSk7IC8vc2hvdWxkIGJlIDBcbiAgICBjb25zb2xlLmxvZyhQb3NpdGlvbi5nZXQoXCJBaWRlZCBBd2FyZW5lc3MgKExvZ28pXCIpKTsgLy9zaG91bGQgYmUgbGFzdFxuXG4gICAgY29uc29sZS5sb2coVmFyaWFibGUuZ2V0KDUpKTtcbiAgICAkc2NvcGUuJG9uKFwic2VsZWN0aW9uXCIsIGZ1bmN0aW9uKCkge1xuICAgICAgJHNjb3BlLnNlbGVjdGVkVmFyID0gRml4dHVyZXMuZ2V0Q3VycmVudFZhcigpO1xuICAgICAgY29uc29sZS5sb2coJHNjb3BlLnNlbGVjdGVkVmFyKTtcbiAgICB9KTtcbn0pO1xuIiwiYXBwLmNvbmZpZyhmdW5jdGlvbigkc3RhdGVQcm92aWRlcikge1xuICAgICRzdGF0ZVByb3ZpZGVyLnN0YXRlKCdob21lJywge1xuICAgICAgICB1cmw6ICcvJyxcbiAgICAgICAgdGVtcGxhdGVVcmw6ICcvcHJlLWJ1aWxkL2hvbWUvaG9tZS5odG1sJyxcbiAgICAgICAgY29udHJvbGxlcjogJ0hvbWVDb250cm9sbGVyJ1xuICAgIH0pO1xufSk7IiwiLy9odHRwIGxheWVyIHRoYXQgcmVxdWVzdCBib3RoIGZpeHR1cmVzXG5hcHAuZmFjdG9yeShcIkZpeHR1cmVzXCIsIGZ1bmN0aW9uKCRodHRwLCRyb290U2NvcGUpe1xuICB2YXIgb3JkZXI7XG4gIHZhciB2YXJpYWJsZXM7XG4gIHZhciBzZWxlY3RlZFZhcjtcblxuICAkaHR0cC5nZXQoJy92YXJpYWJsZXMnKS50aGVuKGZ1bmN0aW9uKHJlcyl7XG4gICAgdmFyaWFibGVzID0gcmVzLmRhdGEuaW5kZXg7XG4gIH0pO1xuXG4gICRodHRwLmdldCgnb3JkZXInKS50aGVuKGZ1bmN0aW9uKHJlcyl7XG4gICAgb3JkZXIgPSByZXMuZGF0YS5ncmFwaDtcbiAgfSk7XG5cbiAgdmFyIGdldE9yZGVyID0gKCkgPT4gJGh0dHAuZ2V0KCcvb3JkZXInKTtcbiAgdmFyIGdldFZhcmlhYmxlcyA9ICgpID0+ICRodHRwLmdldCgnL3ZhcmlhYmxlcycpO1xuICB2YXIgc2V0Q3VycmVudFZhciA9IChpZCkgPT4ge1xuICAgIHNlbGVjdGVkVmFyID0gdmFyaWFibGVzW2lkXTtcbiAgICAkcm9vdFNjb3BlLiRicm9hZGNhc3QoJ3NlbGVjdGlvbicpO1xuICB9O1xuXG5cblxuICByZXR1cm4ge1xuICAgIHZhcmlhYmxlczogKCkgPT4gdmFyaWFibGVzLFxuICAgIG9yZGVyOiAoKSA9PiBvcmRlcixcbiAgICBnZXRPcmRlcjogZ2V0T3JkZXIsXG4gICAgZ2V0VmFyaWFibGVzIDogZ2V0VmFyaWFibGVzLFxuICAgIHNldEN1cnJlbnRWYXIgOiBzZXRDdXJyZW50VmFyLFxuICAgIGdldEN1cnJlbnRWYXIgOiAoKSA9PiBzZWxlY3RlZFZhclxuICB9O1xufSk7IiwiLy9hY2NlcHRzIGEgdmFyaWFibGUncyBuYW1lIGFuZCByZXR1cm5zIHRoZSB2YXJpYWJsZSdzIHBvc2l0aW9uIGluIHRoZSBvcmRlci5cbmFwcC5mYWN0b3J5KFwiUG9zaXRpb25cIiwgZnVuY3Rpb24oRml4dHVyZXMpIHtcbiAgdmFyIHZhcmlhYmxlcyA9IEZpeHR1cmVzLnZhcmlhYmxlcygpO1xuICB2YXIgb3JkZXJzID0gRml4dHVyZXMub3JkZXIoKTtcblxuICAvL3JldHVybnMgcG9zaXRpb24gaW4gdGhlIHZhcmlhYmxlcyBmaXh0dXJlXG4gICAgdmFyIGdldFBvc2l0aW9uID0gKG5hbWUpID0+IHtcbiAgICAgIGxldCBpbmRleCA9IDA7XG4gICAgICAgICAgICBmb3IgKGxldCBpZCBpbiB2YXJpYWJsZXMpIHtcbiAgICAgICAgICAgICAgICBpZiAodmFyaWFibGVzW2lkXS5uYW1lID09PSBuYW1lKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBpbmRleDsgLy9wb3NpdGlvblxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGluZGV4Kys7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICByZXR1cm4ge1xuICAgICAgICBnZXQ6IGdldFBvc2l0aW9uXG4gICAgfTtcbn0pOyIsIi8vYWNjZXB0cyBhIHBvc2l0aW9uIGluIHRoZSBvcmRlciBhbmQgcmV0dXJucyBhIHZhcmlhYmxlLlxuXG5hcHAuZmFjdG9yeShcIlZhcmlhYmxlXCIsIGZ1bmN0aW9uKEZpeHR1cmVzKSB7XG4gIHZhciB2YXJpYWJsZXMgPSBGaXh0dXJlcy52YXJpYWJsZXMoKTtcbiAgdmFyIGtleXMgPSBPYmplY3Qua2V5cyh2YXJpYWJsZXMpO1xuICB2YXIgb3JkZXJzID0gRml4dHVyZXMub3JkZXIoKTtcblxuICAvL3Rha2VzIHBvc2l0aW9uIGluIHRoZSB2YXJpYWJsZXMgZml4dHVyZXNcbiAgICB2YXIgZ2V0VmFyaWFibGUgPSAobnVtKSA9PiB2YXJpYWJsZXNba2V5c1tudW1dXTtcbiAgICByZXR1cm4ge1xuICAgICAgICBnZXQ6IGdldFZhcmlhYmxlXG4gICAgfTtcbn0pOyIsImFwcC5jb250cm9sbGVyKCdncm91cENvbnRyb2xsZXInLCBmdW5jdGlvbigkc2NvcGUpIHtcblxuICAkc2NvcGUudHlwZU9mID0gKG9iaikgPT4gKHR5cGVvZiBvYmopO1xuICAkc2NvcGUuY2F0YWxvZyA9IFtdO1xufSk7IiwiYXBwLmRpcmVjdGl2ZShcImdyb3VwXCIsIGZ1bmN0aW9uKEZpeHR1cmVzKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgcmVzdHJpY3Q6IFwiRVwiLFxuICAgICAgICByZXBsYWNlOiB0cnVlLFxuICAgICAgICBzY29wZToge1xuICAgICAgICAgICAgb3JkZXI6ICc9J1xuICAgICAgICB9LFxuICAgICAgICB0ZW1wbGF0ZVVybDogXCIvcHJlLWJ1aWxkL2NvbW1vbi9kaXJlY3RpdmUvZ3JvdXAvZ3JvdXAuaHRtbFwiLFxuICAgICAgICBjb250cm9sbGVyOiAnZ3JvdXBDb250cm9sbGVyJ1xuICAgIH07XG59KTtcbiIsImFwcC5jb250cm9sbGVyKCdJdGVtQ29udHJvbGxlcicsIGZ1bmN0aW9uKCRzY29wZSwgRml4dHVyZXMpIHtcbiAgICAkc2NvcGUuaXNDb2xsYXBzZWQgPSB0cnVlO1xuXG4gICAgRml4dHVyZXMuZ2V0VmFyaWFibGVzKCkudGhlbihmdW5jdGlvbihyZXN1bHQpIHtcbiAgICAgICAgJHNjb3BlLnZhcmlhYmxlcyA9IHJlc3VsdC5kYXRhLmluZGV4O1xuICAgICAgICAkc2NvcGUuZ2V0TmFtZSA9IChpZCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuICRzY29wZS52YXJpYWJsZXNbaWRdLm5hbWU7XG4gICAgICAgIH07XG4gICAgfSk7XG4gICAgLy9yZXR1cm5zIHRoZSBsZW5ndGggb2YgdGhlIGl0ZW1cbiAgICAkc2NvcGUuZ2V0TGVuZ3RoID0gKGl0ZW0pID0+IHtcbiAgICAgIHJldHVybiBpdGVtLmxlbmd0aDtcbiAgICB9O1xuXG4gICAgJHNjb3BlLnNldEN1cnJlbnRWYXIgPSBGaXh0dXJlcy5zZXRDdXJyZW50VmFyO1xufSk7XG5cbiIsImFwcC5kaXJlY3RpdmUoXCJpdGVtXCIsIGZ1bmN0aW9uKCRjb21waWxlKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgcmVzdHJpY3Q6IFwiRVwiLFxuICAgICAgICAvLyByZXBsYWNlOiB0cnVlLFxuICAgICAgICBzY29wZToge1xuICAgICAgICAgICAgaXRlbTogJz0nLFxuICAgICAgICAgICAga2V5OiAnPSdcbiAgICAgICAgfSxcbiAgICAgICAgY29udHJvbGxlcjogXCJJdGVtQ29udHJvbGxlclwiLFxuICAgICAgICB0ZW1wbGF0ZVVybDogXCIvcHJlLWJ1aWxkL2NvbW1vbi9kaXJlY3RpdmUvaXRlbS9pdGVtLmh0bWxcIixcbiAgICAgICAgbGluazogZnVuY3Rpb24oc2NvcGUsIGVsZW1lbnQsIGF0dHJzKSB7XG4gICAgICAgICAgICBpZiAoYW5ndWxhci5pc0FycmF5KHNjb3BlLml0ZW0pKSB7XG4gICAgICAgICAgICAgICAgLy8gYXBwZW5kIHRoZSBjb2xsZWN0aW9uIGRpcmVjZWxlbWVudCBhbmQgcmVuZGVyIHRoZSBkaXJlY3RpdmVcbiAgICAgICAgICAgICAgICAvLyA8YSBjbGFzcz0nYnRuIGJ0bi1kZWZhdWx0IGJ0bi1ibG9jayc+PC9hPlxuICAgICAgICAgICAgICAgICRjb21waWxlKGBcbiAgICAgICAgICAgICAgICAgICAgPGEgaWQ9J2l0ZW0nIG5nLWNsaWNrPSdpc0NvbGxhcHNlZCA9ICFpc0NvbGxhcHNlZCc+XG4gICAgICAgICAgICAgICAgICAgICAgICA8aSBjbGFzcz0nZmEgZmEtcGx1cycgbmctc2hvdz0naXNDb2xsYXBzZWQnPjwvaT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxpIGNsYXNzPSdmYSBmYS1taW51cyduZy1zaG93PSchaXNDb2xsYXBzZWQnPjwvaT5cbiAgICAgICAgICAgICAgICAgICAgICAgIHt7a2V5fX1cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPSdiYWRnZSBwdWxsLXJpZ2h0Jz57e2dldExlbmd0aChpdGVtKX19PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICA8L2E+XG4gICAgICAgICAgICAgICAgICAgIDx1bCBjb2xsYXBzZT0naXNDb2xsYXBzZWQnPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGdyb3VwIG9yZGVyPSdpdGVtJz48L2dyb3VwPlxuICAgICAgICAgICAgICAgICAgICA8L3VsPlxuICAgICAgICAgICAgICAgICAgICBgKShzY29wZSwgZnVuY3Rpb24oY2xvbmVkLCBzY29wZSkge1xuICAgICAgICAgICAgICAgICAgICBlbGVtZW50LnJlcGxhY2VXaXRoKGNsb25lZCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYoYW5ndWxhci5pc09iamVjdChzY29wZS5pdGVtKSl7XG4gICAgICAgICAgICRjb21waWxlKFwiPGdyb3VwIG9yZGVyPSdpdGVtJz48L2dyb3VwPlwiKShzY29wZSwgZnVuY3Rpb24oY2xvbmVkLCBzY29wZSkge1xuICAgICAgICAgICAgICAgICAgICBlbGVtZW50LnJlcGxhY2VXaXRoKGNsb25lZCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICRjb21waWxlKFwiPGEgbmctY2xpY2s9J3NldEN1cnJlbnRWYXIoaXRlbSknPnt7Z2V0TmFtZShpdGVtKX19PC9hPlwiKShzY29wZSwgZnVuY3Rpb24oY2xvbmVkLCBzY29wZSkge1xuICAgICAgICAgICAgICAgICAgICBlbGVtZW50LnJlcGxhY2VXaXRoKGNsb25lZCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xufSk7XG4iLCJhcHAuY29udHJvbGxlcignTmF2YmFyQ29udHJvbGxlcicsIGZ1bmN0aW9uKCRzY29wZSwgRml4dHVyZXMpIHtcblxuJHNjb3BlLmdldE5hbWUgPSAoaWQpID0+IHtyZXR1cm4gJHNjb3BlLnZhcmlhYmxlc1tpZF19O1xuXG4kc2NvcGUudGVzdD0gKGlkKSA9PiB7cmV0dXJuIFwiaGlcIn07XG5cbn0pOyIsImFwcC5kaXJlY3RpdmUoXCJuYXZiYXJcIiwgZnVuY3Rpb24oRml4dHVyZXMpIHtcbiAgICByZXR1cm4ge1xuICAgICAgICByZXN0cmljdDogXCJFXCIsXG4gICAgICAgIHRlbXBsYXRlVXJsOiBcIi9wcmUtYnVpbGQvY29tbW9uL2RpcmVjdGl2ZS9uYXZiYXIvbmF2YmFyLmh0bWxcIixcbiAgICAgICAgY29udHJvbGxlcjogXCJOYXZiYXJDb250cm9sbGVyXCIsXG4gICAgICAgIGxpbms6IGZ1bmN0aW9uKHNjb3BlLCBlbGVtZW50LCBhdHRyaWJ1dGUpIHtcbiAgICAgICAgICAgIEZpeHR1cmVzLmdldE9yZGVyKCkudGhlbihmdW5jdGlvbihyZXN1bHQpIHtcbiAgICAgICAgICAgICAgICBzY29wZS5vcmRlciA9IHJlc3VsdC5kYXRhLmdyYXBoO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBGaXh0dXJlcy5nZXRWYXJpYWJsZXMoKS50aGVuKGZ1bmN0aW9uKHJlc3VsdCkge1xuICAgICAgICAgICAgICAgIHNjb3BlLnZhcmlhYmxlcyA9IHJlc3VsdC5kYXRhLmluZGV4O1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9O1xufSk7XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=