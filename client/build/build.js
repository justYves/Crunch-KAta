'use strict';

var app = angular.module('CrunchKata', ['ui.router']);

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

    Fixtures.getVariables().then(function (result) {
        $scope.variables = result.data.index;
        $scope.getName = function (id) {
            return $scope.variables[id].name;
        };
    });
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

            // check
            // if this member has children
            console.log(scope.item);
            if (angular.isArray(scope.item)) {
                // append the collection direcelement and render the directive
                // <a class='btn btn-default btn-block'></a>
                $compile("<a id='item'>{{key}} <span class='badge pull-right'>1,118</span></a>  <ul><group order='item'></group></ul>")(scope, function (cloned, scope) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyIsImhvbWUvaG9tZS5jb250cm9sbGVyLmpzIiwiaG9tZS9ob21lLnN0YXRlLmpzIiwiY29tbW9uL2ZhY3RvcnkvZml4dHVyZXMuZmFjdG9yeS5qcyIsImNvbW1vbi9kaXJlY3RpdmUvZ3JvdXAvZ3JvdXAuY29udHJvbGxlci5qcyIsImNvbW1vbi9kaXJlY3RpdmUvZ3JvdXAvZ3JvdXAuZGlyZWN0aXZlLmpzIiwiY29tbW9uL2RpcmVjdGl2ZS9pdGVtL2l0ZW0uY29udHJvbGxlci5qcyIsImNvbW1vbi9kaXJlY3RpdmUvaXRlbS9pdGVtLmRpcmVjdGl2ZS5qcyIsImNvbW1vbi9kaXJlY3RpdmUvbmF2YmFyL25hdmJhci5jb250cm9sbGVyLmpzIiwiY29tbW9uL2RpcmVjdGl2ZS9uYXZiYXIvbmF2YmFyLmRpcmVjdGl2ZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLElBQUksR0FBRyxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsWUFBWSxFQUFFLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQzs7QUFFdEQsR0FBRyxDQUFDLE1BQU0sQ0FBQyxVQUFVLGtCQUFrQixFQUFFLGlCQUFpQixFQUFFOztBQUV6RCxvQkFBaUIsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUM7O0FBRWxDLHFCQUFrQixDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQztDQUNwQyxDQUFDLENBQUM7OztBQ1BILEdBQUcsQ0FBQyxVQUFVLENBQUMsZ0JBQWdCLEVBQUUsVUFBUyxNQUFNLEVBQUUsUUFBUSxFQUFFOzs7Ozs7Ozs7Q0FVM0QsQ0FBQyxDQUFDOzs7QUNWSCxHQUFHLENBQUMsTUFBTSxDQUFDLFVBQVMsY0FBYyxFQUFFO0FBQ2hDLGtCQUFjLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRTtBQUN6QixXQUFHLEVBQUUsR0FBRztBQUNSLG1CQUFXLEVBQUUsMkJBQTJCO0FBQ3hDLGtCQUFVLEVBQUUsZ0JBQWdCO0tBQy9CLENBQUMsQ0FBQztDQUNO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QUM7OztBQ2hDSCxHQUFHLENBQUMsVUFBVSxDQUFDLGtCQUFrQixFQUFFLFVBQVMsTUFBTSxFQUFFLFFBQVEsRUFBRTs7QUFFOUQsUUFBTSxDQUFDLE9BQU8sR0FBRyxVQUFDLEVBQUUsRUFBSztBQUFDLFdBQU8sTUFBTSxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsQ0FBQTtHQUFDLENBQUM7O0FBRXZELFFBQU0sQ0FBQyxJQUFJLEdBQUUsVUFBQyxFQUFFLEVBQUs7QUFBQyxXQUFPLElBQUksQ0FBQTtHQUFDLENBQUM7Q0FFbEMsQ0FBQyxDQUFDOzs7QUNOSCxHQUFHLENBQUMsU0FBUyxDQUFDLFFBQVEsRUFBRSxVQUFTLFFBQVEsRUFBRTtBQUN2QyxXQUFPO0FBQ0gsZ0JBQVEsRUFBRSxHQUFHO0FBQ2IsbUJBQVcsRUFBRSxnREFBZ0Q7QUFDN0Qsa0JBQVUsRUFBRSxrQkFBa0I7QUFDOUIsWUFBSSxFQUFFLGNBQVMsS0FBSyxFQUFFLE9BQU8sRUFBRSxTQUFTLEVBQUU7QUFDdEMsb0JBQVEsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxJQUFJLENBQUMsVUFBUyxNQUFNLEVBQUU7QUFDdEMscUJBQUssQ0FBQyxLQUFLLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7YUFDbkMsQ0FBQyxDQUFDO0FBQ0gsb0JBQVEsQ0FBQyxZQUFZLEVBQUUsQ0FBQyxJQUFJLENBQUMsVUFBUyxNQUFNLEVBQUU7QUFDMUMscUJBQUssQ0FBQyxTQUFTLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7YUFDdkMsQ0FBQyxDQUFDO1NBQ047S0FDSixDQUFDO0NBQ0wsQ0FBQyxDQUFDIiwiZmlsZSI6ImJ1aWxkLmpzIiwic291cmNlc0NvbnRlbnQiOlsidmFyIGFwcCA9IGFuZ3VsYXIubW9kdWxlKCdDcnVuY2hLYXRhJywgWyd1aS5yb3V0ZXInXSk7XG5cbmFwcC5jb25maWcoZnVuY3Rpb24gKCR1cmxSb3V0ZXJQcm92aWRlciwgJGxvY2F0aW9uUHJvdmlkZXIpIHtcbiAgIC8vIFRoaXMgdHVybnMgb2ZmIGhhc2hiYW5nIHVybHMgKC8jYWJvdXQpIGFuZCBjaGFuZ2VzIGl0IHRvIHNvbWV0aGluZyBub3JtYWwgKC9hYm91dClcbiAgICRsb2NhdGlvblByb3ZpZGVyLmh0bWw1TW9kZSh0cnVlKTtcbiAgIC8vIElmIHdlIGdvIHRvIGEgVVJMIHRoYXQgdWktcm91dGVyIGRvZXNuJ3QgaGF2ZSByZWdpc3RlcmVkLCBnbyB0byB0aGUgXCIvXCIgdXJsLlxuICAgJHVybFJvdXRlclByb3ZpZGVyLm90aGVyd2lzZSgnLycpO1xufSk7IiwiYXBwLmNvbnRyb2xsZXIoJ0hvbWVDb250cm9sbGVyJywgZnVuY3Rpb24oJHNjb3BlLCBGaXh0dXJlcykge1xuXG4gIC8vIEZpeHR1cmVzRmFjdG9yeS5nZXRPcmRlcigpLnRoZW4oZnVuY3Rpb24oZGF0YSl7XG4gIC8vICAgJHNjb3BlLm9yZGVyID0gZGF0YTtcbiAgLy8gfSk7XG4gIC8vIEZpeHR1cmVzRmFjdG9yeS5nZXRWYXJpYWJsZXMoKS50aGVuKGZ1bmN0aW9uKGRhdGEpe1xuICAvLyAgICRzY29wZS52YXJpYWJsZXMgPSBkYXRhO1xuICAvLyB9KTtcblxuXG59KTsiLCJhcHAuY29uZmlnKGZ1bmN0aW9uKCRzdGF0ZVByb3ZpZGVyKSB7XG4gICAgJHN0YXRlUHJvdmlkZXIuc3RhdGUoJ2hvbWUnLCB7XG4gICAgICAgIHVybDogJy8nLFxuICAgICAgICB0ZW1wbGF0ZVVybDogJy9wcmUtYnVpbGQvaG9tZS9ob21lLmh0bWwnLFxuICAgICAgICBjb250cm9sbGVyOiAnSG9tZUNvbnRyb2xsZXInXG4gICAgfSk7XG59KTsiLCJhcHAuZmFjdG9yeShcIkZpeHR1cmVzXCIsIGZ1bmN0aW9uKCRodHRwKXtcbiAgdmFyIG9yZGVyLCB2YXJpYWJsZXM7XG5cbiAgcmV0dXJuIHtcbiAgICBnZXRPcmRlcjogZnVuY3Rpb24oKXtcbiAgICAgIHJldHVybiAkaHR0cC5nZXQoJy9vcmRlcicpO1xuICAgICB9LFxuICAgIGdldFZhcmlhYmxlcyA6IGZ1bmN0aW9uKCl7XG4gICAgICByZXR1cm4gJGh0dHAuZ2V0KCcvdmFyaWFibGVzJyk7XG4gICAgfVxuICB9O1xufSk7IiwiYXBwLmNvbnRyb2xsZXIoJ2dyb3VwQ29udHJvbGxlcicsIGZ1bmN0aW9uKCRzY29wZSkge1xuXG4gICRzY29wZS50eXBlT2YgPSAob2JqKSA9PiAodHlwZW9mIG9iaik7XG4gICRzY29wZS5jYXRhbG9nID0gW107XG59KTsiLCJhcHAuZGlyZWN0aXZlKFwiZ3JvdXBcIiwgZnVuY3Rpb24oRml4dHVyZXMpIHtcbiAgICByZXR1cm4ge1xuICAgICAgICByZXN0cmljdDogXCJFXCIsXG4gICAgICAgIHJlcGxhY2U6IHRydWUsXG4gICAgICAgIHNjb3BlOiB7XG4gICAgICAgICAgICBvcmRlcjogJz0nXG4gICAgICAgIH0sXG4gICAgICAgIHRlbXBsYXRlVXJsOiBcIi9wcmUtYnVpbGQvY29tbW9uL2RpcmVjdGl2ZS9ncm91cC9ncm91cC5odG1sXCIsXG4gICAgICAgIGNvbnRyb2xsZXI6ICdncm91cENvbnRyb2xsZXInXG4gICAgfTtcbn0pO1xuIiwiYXBwLmNvbnRyb2xsZXIoJ0l0ZW1Db250cm9sbGVyJywgZnVuY3Rpb24oJHNjb3BlLCBGaXh0dXJlcykge1xuXG4gICAgRml4dHVyZXMuZ2V0VmFyaWFibGVzKCkudGhlbihmdW5jdGlvbihyZXN1bHQpIHtcbiAgICAgICAgJHNjb3BlLnZhcmlhYmxlcyA9IHJlc3VsdC5kYXRhLmluZGV4O1xuICAgICAgICAkc2NvcGUuZ2V0TmFtZSA9IChpZCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuICRzY29wZS52YXJpYWJsZXNbaWRdLm5hbWVcbiAgICAgICAgfTtcbiAgICB9KTtcbn0pO1xuXG4iLCJhcHAuZGlyZWN0aXZlKFwiaXRlbVwiLCBmdW5jdGlvbigkY29tcGlsZSkge1xuICAgIHJldHVybiB7XG4gICAgICAgIHJlc3RyaWN0OiBcIkVcIixcbiAgICAgICAgLy8gcmVwbGFjZTogdHJ1ZSxcbiAgICAgICAgc2NvcGU6IHtcbiAgICAgICAgICAgIGl0ZW06ICc9JyxcbiAgICAgICAgICAgIGtleTogJz0nXG4gICAgICAgIH0sXG4gICAgICAgIGNvbnRyb2xsZXI6IFwiSXRlbUNvbnRyb2xsZXJcIixcbiAgICAgICAgLy8gdGVtcGxhdGVVcmw6IFwiL3ByZS1idWlsZC9jb21tb24vZGlyZWN0aXZlL2l0ZW0vaXRlbS5odG1sXCIsXG4gICAgICAgIGxpbms6IGZ1bmN0aW9uKHNjb3BlLCBlbGVtZW50LCBhdHRycykge1xuXG4gICAgICAgICAgICAvLyBjaGVja1xuICAgICAgICAgICAgLy8gaWYgdGhpcyBtZW1iZXIgaGFzIGNoaWxkcmVuXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhzY29wZS5pdGVtKTtcbiAgICAgICAgICAgIGlmIChhbmd1bGFyLmlzQXJyYXkoc2NvcGUuaXRlbSkpIHtcbiAgICAgICAgICAgICAgICAvLyBhcHBlbmQgdGhlIGNvbGxlY3Rpb24gZGlyZWNlbGVtZW50IGFuZCByZW5kZXIgdGhlIGRpcmVjdGl2ZVxuICAgICAgICAgICAgICAgIC8vIDxhIGNsYXNzPSdidG4gYnRuLWRlZmF1bHQgYnRuLWJsb2NrJz48L2E+XG4gICAgICAgICAgICAgICAgJGNvbXBpbGUoXCI8YSBpZD0naXRlbSc+e3trZXl9fSA8c3BhbiBjbGFzcz0nYmFkZ2UgcHVsbC1yaWdodCc+MSwxMTg8L3NwYW4+PC9hPiAgPHVsPjxncm91cCBvcmRlcj0naXRlbSc+PC9ncm91cD48L3VsPlwiKShzY29wZSwgZnVuY3Rpb24oY2xvbmVkLCBzY29wZSkge1xuICAgICAgICAgICAgICAgICAgICBlbGVtZW50LnJlcGxhY2VXaXRoKGNsb25lZCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYoYW5ndWxhci5pc09iamVjdChzY29wZS5pdGVtKSl7XG4gICAgICAgICAgICRjb21waWxlKFwiPGdyb3VwIG9yZGVyPSdpdGVtJz48L2dyb3VwPlwiKShzY29wZSwgZnVuY3Rpb24oY2xvbmVkLCBzY29wZSkge1xuICAgICAgICAgICAgICAgICAgICBlbGVtZW50LnJlcGxhY2VXaXRoKGNsb25lZCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICRjb21waWxlKFwiPGE+e3tnZXROYW1lKGl0ZW0pfX08L2E+XCIpKHNjb3BlLCBmdW5jdGlvbihjbG9uZWQsIHNjb3BlKSB7XG4gICAgICAgICAgICAgICAgICAgIGVsZW1lbnQucmVwbGFjZVdpdGgoY2xvbmVkKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG59KTtcbiIsImFwcC5jb250cm9sbGVyKCdOYXZiYXJDb250cm9sbGVyJywgZnVuY3Rpb24oJHNjb3BlLCBGaXh0dXJlcykge1xuXG4kc2NvcGUuZ2V0TmFtZSA9IChpZCkgPT4ge3JldHVybiAkc2NvcGUudmFyaWFibGVzW2lkXX07XG5cbiRzY29wZS50ZXN0PSAoaWQpID0+IHtyZXR1cm4gXCJoaVwifTtcblxufSk7IiwiYXBwLmRpcmVjdGl2ZShcIm5hdmJhclwiLCBmdW5jdGlvbihGaXh0dXJlcykge1xuICAgIHJldHVybiB7XG4gICAgICAgIHJlc3RyaWN0OiBcIkVcIixcbiAgICAgICAgdGVtcGxhdGVVcmw6IFwiL3ByZS1idWlsZC9jb21tb24vZGlyZWN0aXZlL25hdmJhci9uYXZiYXIuaHRtbFwiLFxuICAgICAgICBjb250cm9sbGVyOiBcIk5hdmJhckNvbnRyb2xsZXJcIixcbiAgICAgICAgbGluazogZnVuY3Rpb24oc2NvcGUsIGVsZW1lbnQsIGF0dHJpYnV0ZSkge1xuICAgICAgICAgICAgRml4dHVyZXMuZ2V0T3JkZXIoKS50aGVuKGZ1bmN0aW9uKHJlc3VsdCkge1xuICAgICAgICAgICAgICAgIHNjb3BlLm9yZGVyID0gcmVzdWx0LmRhdGEuZ3JhcGg7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIEZpeHR1cmVzLmdldFZhcmlhYmxlcygpLnRoZW4oZnVuY3Rpb24ocmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgc2NvcGUudmFyaWFibGVzID0gcmVzdWx0LmRhdGEuaW5kZXg7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH07XG59KTtcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==