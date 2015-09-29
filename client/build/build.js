'use strict';

var app = angular.module('CrunchKata', ['ui.router', 'ui.bootstrap']);

app.config(function ($urlRouterProvider, $locationProvider) {
   // This turns off hashbang urls (/#about) and changes it to something normal (/about)
   $locationProvider.html5Mode(true);
   // If we go to a URL that ui-router doesn't have registered, go to the "/" url.
   $urlRouterProvider.otherwise('/');
});
'use strict';

app.controller('HomeController', function ($scope, Fixtures) {

  // FixturesFactory.getOrder().then(function(data){
  //   $scope.order = data;
  // });
  // FixturesFactory.getVariables().then(function(data){
  //   $scope.variables = data;
  // });

});
'use strict';

app.config(function ($stateProvider) {
    $stateProvider.state('home', {
        url: '/',
        templateUrl: '/pre-build/home/home.html',
        controller: 'HomeController'
    });
});
'use strict';

app.factory("Fixtures", function ($http) {
  var order, variables;

  return {
    getOrder: function getOrder() {
      return $http.get('/order');
    },
    getVariables: function getVariables() {
      return $http.get('/variables');
    }
  };
});
'use strict';

app.controller('PositionService', function ($scope, Fixtures) {

  this.getPosition = function (name) {};
});
'use strict';

app.controller('ItemController', function ($scope, Fixtures) {

    Fixtures.getVariables().then(function (result) {
        $scope.variables = result.data.index;
        $scope.getName = function (id) {
            return $scope.variables[id].name;
        };
    });

    $scope.isCollapsed = true;
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
        // templateUrl: "/pre-build/common/directive/item/item.html",
        link: function link(scope, element, attrs) {
            if (angular.isArray(scope.item)) {
                // append the collection direcelement and render the directive
                // <a class='btn btn-default btn-block'></a>
                $compile("\n                    <a id='item' ng-click='isCollapsed = !isCollapsed'>\n                        <i class='fa fa-plus' ng-show='isCollapsed'></i> \n                        <i class='fa fa-minus'ng-show='!isCollapsed'></i> \n                        {{key}} \n                        <span class='badge pull-right'>1,118</span>\n                    </a>  \n                    <ul collapse='isCollapsed'>\n                        <group order='item'></group>\n                    </ul>\n                    ")(scope, function (cloned, scope) {
                    element.replaceWith(cloned);
                });
            } else if (angular.isObject(scope.item)) {
                $compile("<group order='item'></group>")(scope, function (cloned, scope) {
                    element.replaceWith(cloned);
                });
            } else {
                $compile("<a>{{getName(item)}}</a>")(scope, function (cloned, scope) {
                    element.replaceWith(cloned);
                });
            }
        }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyIsImhvbWUvaG9tZS5jb250cm9sbGVyLmpzIiwiaG9tZS9ob21lLnN0YXRlLmpzIiwiY29tbW9uL2ZhY3RvcnkvZml4dHVyZXMuZmFjdG9yeS5qcyIsImNvbW1vbi9zZXJ2aWNlcy9wb3NpdGlvbi5zZXJ2aWNlLmpzIiwiY29tbW9uL2RpcmVjdGl2ZS9pdGVtL2l0ZW0uY29udHJvbGxlci5qcyIsImNvbW1vbi9kaXJlY3RpdmUvaXRlbS9pdGVtLmRpcmVjdGl2ZS5qcyIsImNvbW1vbi9kaXJlY3RpdmUvZ3JvdXAvZ3JvdXAuY29udHJvbGxlci5qcyIsImNvbW1vbi9kaXJlY3RpdmUvZ3JvdXAvZ3JvdXAuZGlyZWN0aXZlLmpzIiwiY29tbW9uL2RpcmVjdGl2ZS9uYXZiYXIvbmF2YmFyLmNvbnRyb2xsZXIuanMiLCJjb21tb24vZGlyZWN0aXZlL25hdmJhci9uYXZiYXIuZGlyZWN0aXZlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsSUFBSSxHQUFHLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxZQUFZLEVBQUUsQ0FBQyxXQUFXLEVBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQzs7QUFFckUsR0FBRyxDQUFDLE1BQU0sQ0FBQyxVQUFVLGtCQUFrQixFQUFFLGlCQUFpQixFQUFFOztBQUV6RCxvQkFBaUIsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUM7O0FBRWxDLHFCQUFrQixDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQztDQUNwQyxDQUFDLENBQUM7OztBQ1BILEdBQUcsQ0FBQyxVQUFVLENBQUMsZ0JBQWdCLEVBQUUsVUFBUyxNQUFNLEVBQUUsUUFBUSxFQUFFOzs7Ozs7Ozs7Q0FVM0QsQ0FBQyxDQUFDOzs7QUNWSCxHQUFHLENBQUMsTUFBTSxDQUFDLFVBQVMsY0FBYyxFQUFFO0FBQ2hDLGtCQUFjLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRTtBQUN6QixXQUFHLEVBQUUsR0FBRztBQUNSLG1CQUFXLEVBQUUsMkJB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ZXNDb250ZW50IjpbInZhciBhcHAgPSBhbmd1bGFyLm1vZHVsZSgnQ3J1bmNoS2F0YScsIFsndWkucm91dGVyJywndWkuYm9vdHN0cmFwJ10pO1xuXG5hcHAuY29uZmlnKGZ1bmN0aW9uICgkdXJsUm91dGVyUHJvdmlkZXIsICRsb2NhdGlvblByb3ZpZGVyKSB7XG4gICAvLyBUaGlzIHR1cm5zIG9mZiBoYXNoYmFuZyB1cmxzICgvI2Fib3V0KSBhbmQgY2hhbmdlcyBpdCB0byBzb21ldGhpbmcgbm9ybWFsICgvYWJvdXQpXG4gICAkbG9jYXRpb25Qcm92aWRlci5odG1sNU1vZGUodHJ1ZSk7XG4gICAvLyBJZiB3ZSBnbyB0byBhIFVSTCB0aGF0IHVpLXJvdXRlciBkb2Vzbid0IGhhdmUgcmVnaXN0ZXJlZCwgZ28gdG8gdGhlIFwiL1wiIHVybC5cbiAgICR1cmxSb3V0ZXJQcm92aWRlci5vdGhlcndpc2UoJy8nKTtcbn0pOyIsImFwcC5jb250cm9sbGVyKCdIb21lQ29udHJvbGxlcicsIGZ1bmN0aW9uKCRzY29wZSwgRml4dHVyZXMpIHtcblxuICAvLyBGaXh0dXJlc0ZhY3RvcnkuZ2V0T3JkZXIoKS50aGVuKGZ1bmN0aW9uKGRhdGEpe1xuICAvLyAgICRzY29wZS5vcmRlciA9IGRhdGE7XG4gIC8vIH0pO1xuICAvLyBGaXh0dXJlc0ZhY3RvcnkuZ2V0VmFyaWFibGVzKCkudGhlbihmdW5jdGlvbihkYXRhKXtcbiAgLy8gICAkc2NvcGUudmFyaWFibGVzID0gZGF0YTtcbiAgLy8gfSk7XG5cblxufSk7IiwiYXBwLmNvbmZpZyhmdW5jdGlvbigkc3RhdGVQcm92aWRlcikge1xuICAgICRzdGF0ZVByb3ZpZGVyLnN0YXRlKCdob21lJywge1xuICAgICAgICB1cmw6ICcvJyxcbiAgICAgICAgdGVtcGxhdGVVcmw6ICcvcHJlLWJ1aWxkL2hvbWUvaG9tZS5odG1sJyxcbiAgICAgICAgY29udHJvbGxlcjogJ0hvbWVDb250cm9sbGVyJ1xuICAgIH0pO1xufSk7IiwiYXBwLmZhY3RvcnkoXCJGaXh0dXJlc1wiLCBmdW5jdGlvbigkaHR0cCl7XG4gIHZhciBvcmRlciwgdmFyaWFibGVzO1xuXG4gIHJldHVybiB7XG4gICAgZ2V0T3JkZXI6IGZ1bmN0aW9uKCl7XG4gICAgICByZXR1cm4gJGh0dHAuZ2V0KCcvb3JkZXInKTtcbiAgICAgfSxcbiAgICBnZXRWYXJpYWJsZXMgOiBmdW5jdGlvbigpe1xuICAgICAgcmV0dXJuICRodHRwLmdldCgnL3ZhcmlhYmxlcycpO1xuICAgIH1cbiAgfTtcbn0pOyIsImFwcC5jb250cm9sbGVyKCdQb3NpdGlvblNlcnZpY2UnLCBmdW5jdGlvbigkc2NvcGUsIEZpeHR1cmVzKSB7XG5cbiAgdGhpcy5nZXRQb3NpdGlvbiA9IChuYW1lKSA9PiB7XG5cbiAgfVxuXG59KTsiLCJhcHAuY29udHJvbGxlcignSXRlbUNvbnRyb2xsZXInLCBmdW5jdGlvbigkc2NvcGUsIEZpeHR1cmVzKSB7XG5cbiAgICBGaXh0dXJlcy5nZXRWYXJpYWJsZXMoKS50aGVuKGZ1bmN0aW9uKHJlc3VsdCkge1xuICAgICAgICAkc2NvcGUudmFyaWFibGVzID0gcmVzdWx0LmRhdGEuaW5kZXg7XG4gICAgICAgICRzY29wZS5nZXROYW1lID0gKGlkKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gJHNjb3BlLnZhcmlhYmxlc1tpZF0ubmFtZVxuICAgICAgICB9O1xuICAgIH0pO1xuXG4gICAgJHNjb3BlLmlzQ29sbGFwc2VkID0gdHJ1ZTtcblxufSk7XG5cbiIsImFwcC5kaXJlY3RpdmUoXCJpdGVtXCIsIGZ1bmN0aW9uKCRjb21waWxlKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgcmVzdHJpY3Q6IFwiRVwiLFxuICAgICAgICAvLyByZXBsYWNlOiB0cnVlLFxuICAgICAgICBzY29wZToge1xuICAgICAgICAgICAgaXRlbTogJz0nLFxuICAgICAgICAgICAga2V5OiAnPSdcbiAgICAgICAgfSxcbiAgICAgICAgY29udHJvbGxlcjogXCJJdGVtQ29udHJvbGxlclwiLFxuICAgICAgICAvLyB0ZW1wbGF0ZVVybDogXCIvcHJlLWJ1aWxkL2NvbW1vbi9kaXJlY3RpdmUvaXRlbS9pdGVtLmh0bWxcIixcbiAgICAgICAgbGluazogZnVuY3Rpb24oc2NvcGUsIGVsZW1lbnQsIGF0dHJzKSB7XG4gICAgICAgICAgICBpZiAoYW5ndWxhci5pc0FycmF5KHNjb3BlLml0ZW0pKSB7XG4gICAgICAgICAgICAgICAgLy8gYXBwZW5kIHRoZSBjb2xsZWN0aW9uIGRpcmVjZWxlbWVudCBhbmQgcmVuZGVyIHRoZSBkaXJlY3RpdmVcbiAgICAgICAgICAgICAgICAvLyA8YSBjbGFzcz0nYnRuIGJ0bi1kZWZhdWx0IGJ0bi1ibG9jayc+PC9hPlxuICAgICAgICAgICAgICAgICRjb21waWxlKGBcbiAgICAgICAgICAgICAgICAgICAgPGEgaWQ9J2l0ZW0nIG5nLWNsaWNrPSdpc0NvbGxhcHNlZCA9ICFpc0NvbGxhcHNlZCc+XG4gICAgICAgICAgICAgICAgICAgICAgICA8aSBjbGFzcz0nZmEgZmEtcGx1cycgbmctc2hvdz0naXNDb2xsYXBzZWQnPjwvaT4gXG4gICAgICAgICAgICAgICAgICAgICAgICA8aSBjbGFzcz0nZmEgZmEtbWludXMnbmctc2hvdz0nIWlzQ29sbGFwc2VkJz48L2k+IFxuICAgICAgICAgICAgICAgICAgICAgICAge3trZXl9fSBcbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPSdiYWRnZSBwdWxsLXJpZ2h0Jz4xLDExODwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgPC9hPiAgXG4gICAgICAgICAgICAgICAgICAgIDx1bCBjb2xsYXBzZT0naXNDb2xsYXBzZWQnPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGdyb3VwIG9yZGVyPSdpdGVtJz48L2dyb3VwPlxuICAgICAgICAgICAgICAgICAgICA8L3VsPlxuICAgICAgICAgICAgICAgICAgICBgKShzY29wZSwgZnVuY3Rpb24oY2xvbmVkLCBzY29wZSkge1xuICAgICAgICAgICAgICAgICAgICBlbGVtZW50LnJlcGxhY2VXaXRoKGNsb25lZCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYoYW5ndWxhci5pc09iamVjdChzY29wZS5pdGVtKSl7XG4gICAgICAgICAgICRjb21waWxlKFwiPGdyb3VwIG9yZGVyPSdpdGVtJz48L2dyb3VwPlwiKShzY29wZSwgZnVuY3Rpb24oY2xvbmVkLCBzY29wZSkge1xuICAgICAgICAgICAgICAgICAgICBlbGVtZW50LnJlcGxhY2VXaXRoKGNsb25lZCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICRjb21waWxlKFwiPGE+e3tnZXROYW1lKGl0ZW0pfX08L2E+XCIpKHNjb3BlLCBmdW5jdGlvbihjbG9uZWQsIHNjb3BlKSB7XG4gICAgICAgICAgICAgICAgICAgIGVsZW1lbnQucmVwbGFjZVdpdGgoY2xvbmVkKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG59KTtcbiIsImFwcC5jb250cm9sbGVyKCdncm91cENvbnRyb2xsZXInLCBmdW5jdGlvbigkc2NvcGUpIHtcblxuICAkc2NvcGUudHlwZU9mID0gKG9iaikgPT4gKHR5cGVvZiBvYmopO1xuICAkc2NvcGUuY2F0YWxvZyA9IFtdO1xufSk7IiwiYXBwLmRpcmVjdGl2ZShcImdyb3VwXCIsIGZ1bmN0aW9uKEZpeHR1cmVzKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgcmVzdHJpY3Q6IFwiRVwiLFxuICAgICAgICByZXBsYWNlOiB0cnVlLFxuICAgICAgICBzY29wZToge1xuICAgICAgICAgICAgb3JkZXI6ICc9J1xuICAgICAgICB9LFxuICAgICAgICB0ZW1wbGF0ZVVybDogXCIvcHJlLWJ1aWxkL2NvbW1vbi9kaXJlY3RpdmUvZ3JvdXAvZ3JvdXAuaHRtbFwiLFxuICAgICAgICBjb250cm9sbGVyOiAnZ3JvdXBDb250cm9sbGVyJ1xuICAgIH07XG59KTtcbiIsImFwcC5jb250cm9sbGVyKCdOYXZiYXJDb250cm9sbGVyJywgZnVuY3Rpb24oJHNjb3BlLCBGaXh0dXJlcykge1xuXG4kc2NvcGUuZ2V0TmFtZSA9IChpZCkgPT4ge3JldHVybiAkc2NvcGUudmFyaWFibGVzW2lkXX07XG5cbiRzY29wZS50ZXN0PSAoaWQpID0+IHtyZXR1cm4gXCJoaVwifTtcblxufSk7IiwiYXBwLmRpcmVjdGl2ZShcIm5hdmJhclwiLCBmdW5jdGlvbihGaXh0dXJlcykge1xuICAgIHJldHVybiB7XG4gICAgICAgIHJlc3RyaWN0OiBcIkVcIixcbiAgICAgICAgdGVtcGxhdGVVcmw6IFwiL3ByZS1idWlsZC9jb21tb24vZGlyZWN0aXZlL25hdmJhci9uYXZiYXIuaHRtbFwiLFxuICAgICAgICBjb250cm9sbGVyOiBcIk5hdmJhckNvbnRyb2xsZXJcIixcbiAgICAgICAgbGluazogZnVuY3Rpb24oc2NvcGUsIGVsZW1lbnQsIGF0dHJpYnV0ZSkge1xuICAgICAgICAgICAgRml4dHVyZXMuZ2V0T3JkZXIoKS50aGVuKGZ1bmN0aW9uKHJlc3VsdCkge1xuICAgICAgICAgICAgICAgIHNjb3BlLm9yZGVyID0gcmVzdWx0LmRhdGEuZ3JhcGg7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIEZpeHR1cmVzLmdldFZhcmlhYmxlcygpLnRoZW4oZnVuY3Rpb24ocmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgc2NvcGUudmFyaWFibGVzID0gcmVzdWx0LmRhdGEuaW5kZXg7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH07XG59KTtcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==