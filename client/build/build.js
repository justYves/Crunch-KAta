'use strict';

var app = angular.module('CrunchKata', ['ui.router']);

app.config(function ($urlRouterProvider, $locationProvider) {
   // This turns off hashbang urls (/#about) and changes it to something normal (/about)
   $locationProvider.html5Mode(true);
   // If we go to a URL that ui-router doesn't have registered, go to the "/" url.
   $urlRouterProvider.otherwise('/');
});
'use strict';

app.controller('HomeController', function ($scope, FixturesFactory) {

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

app.controller('ModulesController', function ($scope, $http, ModulesFactory) {

  $scope.$on('$stateChangeSuccess', function () {
    var defaultMessage = 'If you don\'t see a list of links here, you need to seed your database!\nIn your terminal, go to this app\'s directory and run `gulp seedDB`.\nThen try this page again.';

    ModulesFactory.getNodeModules().then(function (modules) {
      $scope.nodeModules = modules;

      if (!$scope.nodeModules.length) {
        $scope.defaultMessage = defaultMessage;
      }
    });
  });
});
'use strict';

app.factory('ModulesFactory', function ($http) {
  return {
    getNodeModules: function getNodeModules() {
      return $http.get('/api/modules/').then(function (res) {
        return res.data;
      });
    }
  };
});
'use strict';

app.config(function ($stateProvider) {
    $stateProvider.state('modules', {
        url: '/modules',
        templateUrl: '/pre-build/modules/modules.html',
        controller: 'ModulesController'
    });
});
'use strict';

app.factory("FixturesFactory", function ($http) {
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
"use strict";

app.directive("catalog", function (FixturesFactory) {
  return {
    restrict: "E",
    templateUrl: "/pre-build/common/directive/catalog/catalog.html",
    link: function link(scope, element, attribute) {
      FixturesFactory.getOrder().then(function (result) {
        scope.order = result.data;
      });
      FixturesFactory.getVariables().then(function (result) {
        scope.variables = result.data;
      });
    }
  };
});
"use strict";

app.directive("navbar", function () {
	return {
		restrict: "E",
		templateUrl: "/pre-build/common/directive/navbar/navbar.html"
	};
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyIsImhvbWUvaG9tZS5jb250cm9sbGVyLmpzIiwiaG9tZS9ob21lLnN0YXRlLmpzIiwibW9kdWxlcy9tb2R1bGVzLmNvbnRyb2xsZXIuanMiLCJtb2R1bGVzL21vZHVsZXMuZmFjdG9yeS5qcyIsIm1vZHVsZXMvbW9kdWxlcy5zdGF0ZS5qcyIsImNvbW1vbi9mYWN0b3J5L2ZpeHR1cmVzLmZhY3RvcnkuanMiLCJjb21tb24vZGlyZWN0aXZlL2NhdGFsb2cvY2F0YWxvZy5kaXJlY3RpdmUuanMiLCJjb21tb24vZGlyZWN0aXZlL25hdmJhci9uYXZiYXIuZGlyZWN0aXZlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsSUFBSSxHQUFHLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxZQUFZLEVBQUUsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDOztBQUV0RCxHQUFHLENBQUMsTUFBTSxDQUFDLFVBQVUsa0JBQWtCLEVBQUUsaUJBQWlCLEVBQUU7O0FBRXpELG9CQUFpQixDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQzs7QUFFbEMscUJBQWtCLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0NBQ3BDLENBQUMsQ0FBQzs7O0FDUEgsR0FBRyxDQUFDLFVBQVUsQ0FBQyxnQkFBZ0IsRUFBRSxVQUFTLE1BQU0sRUFBRSxlQUFlLEVBQUU7Ozs7Ozs7OztDQVVsRSxDQUFDLENBQUM7OztBQ1ZILEdBQUcsQ0FBQyxNQUFNLENBQUMsVUFBUyxjQUFjLEVBQUU7QUFDaEMsa0JBQWMsQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFO0FBQ3pCLFdBQUcsRUFBRSxHQUFHO0FBQ1IsbUJBQVcsRUFBRSwyQkFBMkI7QUFDeEMsa0JBQVUsRUFBRSxnQkFBZ0I7S0FDL0IsQ0FBQyxDQUFDO0NBQ04sQ0FBQyxDQUFDOzs7QUNOSCxHQUFHLENBQUMsVUFBVSxDQUFDLG1CQUFtQixFQUFFLFVBQVMsTUFBTSxFQUFFLEtBQUssRUFBRSxjQUFjLEVBQUU7O0FBRTFFLFFBQU0sQ0FBQyxHQUFHLENBQUMscUJBQXFCLEVBQUUsWUFBWTtBQUM1QyxRQUFJLGNBQWMsR0FBRywwS0FBMEssQ0FBQzs7QUFFaE0sa0JBQWMsQ0FBQyxjQUFjLEVBQUUsQ0FDNUIsSUFBSSxDQUFDLFVBQVMsT0FBTyxFQUFFO0FBQ3RCLFlBQU0sQ0FBQyxXQUFXLEdBQUcsT0FBTyxDQUFDOztBQUU3QixVQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxNQUFNLEVBQUU7QUFDOUIsY0FBTSxDQUFDLGNBQWMsR0FBRyxjQUFjLENBQUM7T0FDeEM7S0FDRixDQUFDLENBQUM7R0FDTixDQUFDLENBQUM7Q0FDSixDQUFDLENBQUM7OztBQ2RILEdBQUcsQ0FBQyxPQUFPLENBQUMsZ0JBQWdCLEVBQUUsVUFBUyxLQUFLLEVBQUU7QUFDNUMsU0FBTztBQUNMLGtCQUFjLEVBQUUsMEJBQVc7QUFDekIsYUFBTyxLQUFLLENBQUMsR0FBRyxDQUFDLGVBQWUsQ0FBQyxDQUM5QixJQUFJLENBQUMsVUFBUyxHQUFHLEVBQUU7QUFDbEIsZUFBTyxHQUFHLENBQUMsSUFBSSxDQUFDO09BQ2pCLENBQUMsQ0FBQztLQUNOO0dBQ0YsQ0FBQztDQUNILENBQUMsQ0FBQzs7O0FDVEgsR0FBRyxDQUFDLE1BQU0sQ0FBQyxVQUFVLGNBQWMsRUFBRTtBQUNqQyxrQkFBYyxDQUFDLEtBQUssQ0FBQyxTQUFTLEVBQUU7QUFDNUIsV0FBRyxFQUFFLFVBQVU7QUFDZixtQkFBVyxFQUFFLGlDQUFpQztBQUM5QyxrQkFBVSxFQUFFLG1CQUFtQjtLQUNsQyxDQUFDLENBQUM7Q0FDTixDQUFDLENBQUM7OztBQ05ILEdBQUcsQ0FBQyxPQUFPLENBQUMsaUJBQWlCLEVBQUUsVUFBUyxLQUFLLEVBQUM7QUFDNUMsTUFBSSxLQUFLLEVBQUUsU0FBUyxDQUFDOztBQUVyQixTQUFPO0FBQ0wsWUFBUSxFQUFFLG9CQUFVO0FBQ2xCLGFBQU8sS0FBSyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQTtLQUMxQjtBQUNGLGdCQUFZLEVBQUcsd0JBQVU7QUFDdkIsYUFBTyxLQUFLLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxDQUFBO0tBQy9CO0dBQ0YsQ0FBQztDQUNILENBQUMsQ0FBQzs7O0FDWEgsR0FBRyxDQUFDLFNBQVMsQ0FBQyxTQUFTLEVBQUUsVUFBUyxlQUFlLEVBQUU7QUFDakQsU0FBTztBQUNMLFlBQVEsRUFBRSxHQUFHO0FBQ2IsZUFBVyxFQUFFLGtEQUFrRDtBQUMvRCxRQUFJLEVBQUUsY0FBUyxLQUFLLEVBQUUsT0FBTyxFQUFFLFNBQVMsRUFBRTtBQUN4QyxxQkFBZSxDQUFDLFFBQVEsRUFBRSxDQUFDLElBQUksQ0FBQyxVQUFTLE1BQU0sRUFBRTtBQUMvQyxhQUFLLENBQUMsS0FBSyxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUM7T0FDM0IsQ0FBQyxDQUFDO0FBQ0gscUJBQWUsQ0FBQyxZQUFZLEVBQUUsQ0FBQyxJQUFJLENBQUMsVUFBUyxNQUFNLEVBQUU7QUFDbkQsYUFBSyxDQUFDLFNBQVMsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDO09BQy9CLENBQUMsQ0FBQztLQUNKO0dBQ0YsQ0FBQztDQUNILENBQUMsQ0FBQzs7O0FDYkgsR0FBRyxDQUFDLFNBQVMsQ0FBQyxRQUFRLEVBQUUsWUFBVTtBQUNqQyxRQUFPO0FBQ04sVUFBUSxFQUFFLEdBQUc7QUFDYixhQUFXLEVBQUUsZ0RBQWdEO0VBQzdELENBQUM7Q0FDRixDQUFDLENBQUMiLCJmaWxlIjoiYnVpbGQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgYXBwID0gYW5ndWxhci5tb2R1bGUoJ0NydW5jaEthdGEnLCBbJ3VpLnJvdXRlciddKTtcblxuYXBwLmNvbmZpZyhmdW5jdGlvbiAoJHVybFJvdXRlclByb3ZpZGVyLCAkbG9jYXRpb25Qcm92aWRlcikge1xuICAgLy8gVGhpcyB0dXJucyBvZmYgaGFzaGJhbmcgdXJscyAoLyNhYm91dCkgYW5kIGNoYW5nZXMgaXQgdG8gc29tZXRoaW5nIG5vcm1hbCAoL2Fib3V0KVxuICAgJGxvY2F0aW9uUHJvdmlkZXIuaHRtbDVNb2RlKHRydWUpO1xuICAgLy8gSWYgd2UgZ28gdG8gYSBVUkwgdGhhdCB1aS1yb3V0ZXIgZG9lc24ndCBoYXZlIHJlZ2lzdGVyZWQsIGdvIHRvIHRoZSBcIi9cIiB1cmwuXG4gICAkdXJsUm91dGVyUHJvdmlkZXIub3RoZXJ3aXNlKCcvJyk7XG59KTsiLCJhcHAuY29udHJvbGxlcignSG9tZUNvbnRyb2xsZXInLCBmdW5jdGlvbigkc2NvcGUsIEZpeHR1cmVzRmFjdG9yeSkge1xuXG4gIC8vIEZpeHR1cmVzRmFjdG9yeS5nZXRPcmRlcigpLnRoZW4oZnVuY3Rpb24oZGF0YSl7XG4gIC8vICAgJHNjb3BlLm9yZGVyID0gZGF0YTtcbiAgLy8gfSk7XG4gIC8vIEZpeHR1cmVzRmFjdG9yeS5nZXRWYXJpYWJsZXMoKS50aGVuKGZ1bmN0aW9uKGRhdGEpe1xuICAvLyAgICRzY29wZS52YXJpYWJsZXMgPSBkYXRhO1xuICAvLyB9KTtcblxuXG59KTsiLCJhcHAuY29uZmlnKGZ1bmN0aW9uKCRzdGF0ZVByb3ZpZGVyKSB7XG4gICAgJHN0YXRlUHJvdmlkZXIuc3RhdGUoJ2hvbWUnLCB7XG4gICAgICAgIHVybDogJy8nLFxuICAgICAgICB0ZW1wbGF0ZVVybDogJy9wcmUtYnVpbGQvaG9tZS9ob21lLmh0bWwnLFxuICAgICAgICBjb250cm9sbGVyOiAnSG9tZUNvbnRyb2xsZXInXG4gICAgfSk7XG59KTsiLCJhcHAuY29udHJvbGxlcignTW9kdWxlc0NvbnRyb2xsZXInLCBmdW5jdGlvbigkc2NvcGUsICRodHRwLCBNb2R1bGVzRmFjdG9yeSkge1xuICBcbiAgJHNjb3BlLiRvbignJHN0YXRlQ2hhbmdlU3VjY2VzcycsIGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgZGVmYXVsdE1lc3NhZ2UgPSAnSWYgeW91IGRvblxcJ3Qgc2VlIGEgbGlzdCBvZiBsaW5rcyBoZXJlLCB5b3UgbmVlZCB0byBzZWVkIHlvdXIgZGF0YWJhc2UhXFxuSW4geW91ciB0ZXJtaW5hbCwgZ28gdG8gdGhpcyBhcHBcXCdzIGRpcmVjdG9yeSBhbmQgcnVuIGBndWxwIHNlZWREQmAuXFxuVGhlbiB0cnkgdGhpcyBwYWdlIGFnYWluLic7XG5cbiAgICBNb2R1bGVzRmFjdG9yeS5nZXROb2RlTW9kdWxlcygpXG4gICAgICAudGhlbihmdW5jdGlvbihtb2R1bGVzKSB7XG4gICAgICAgICRzY29wZS5ub2RlTW9kdWxlcyA9IG1vZHVsZXM7XG4gICAgICAgIFxuICAgICAgICBpZiAoISRzY29wZS5ub2RlTW9kdWxlcy5sZW5ndGgpIHtcbiAgICAgICAgICAkc2NvcGUuZGVmYXVsdE1lc3NhZ2UgPSBkZWZhdWx0TWVzc2FnZTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gIH0pO1xufSk7IiwiYXBwLmZhY3RvcnkoJ01vZHVsZXNGYWN0b3J5JywgZnVuY3Rpb24oJGh0dHApIHtcbiAgcmV0dXJuIHtcbiAgICBnZXROb2RlTW9kdWxlczogZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gJGh0dHAuZ2V0KCcvYXBpL21vZHVsZXMvJylcbiAgICAgICAgLnRoZW4oZnVuY3Rpb24ocmVzKSB7XG4gICAgICAgICAgcmV0dXJuIHJlcy5kYXRhO1xuICAgICAgICB9KTsgICAgXG4gICAgfVxuICB9O1xufSk7IiwiYXBwLmNvbmZpZyhmdW5jdGlvbiAoJHN0YXRlUHJvdmlkZXIpIHtcbiAgICAkc3RhdGVQcm92aWRlci5zdGF0ZSgnbW9kdWxlcycsIHtcbiAgICAgICAgdXJsOiAnL21vZHVsZXMnLFxuICAgICAgICB0ZW1wbGF0ZVVybDogJy9wcmUtYnVpbGQvbW9kdWxlcy9tb2R1bGVzLmh0bWwnLFxuICAgICAgICBjb250cm9sbGVyOiAnTW9kdWxlc0NvbnRyb2xsZXInXG4gICAgfSk7XG59KTsiLCJhcHAuZmFjdG9yeShcIkZpeHR1cmVzRmFjdG9yeVwiLCBmdW5jdGlvbigkaHR0cCl7XG4gIHZhciBvcmRlciwgdmFyaWFibGVzO1xuXG4gIHJldHVybiB7XG4gICAgZ2V0T3JkZXI6IGZ1bmN0aW9uKCl7XG4gICAgICByZXR1cm4gJGh0dHAuZ2V0KCcvb3JkZXInKVxuICAgICB9LFxuICAgIGdldFZhcmlhYmxlcyA6IGZ1bmN0aW9uKCl7XG4gICAgICByZXR1cm4gJGh0dHAuZ2V0KCcvdmFyaWFibGVzJylcbiAgICB9XG4gIH07XG59KTsiLCJhcHAuZGlyZWN0aXZlKFwiY2F0YWxvZ1wiLCBmdW5jdGlvbihGaXh0dXJlc0ZhY3RvcnkpIHtcbiAgcmV0dXJuIHtcbiAgICByZXN0cmljdDogXCJFXCIsXG4gICAgdGVtcGxhdGVVcmw6IFwiL3ByZS1idWlsZC9jb21tb24vZGlyZWN0aXZlL2NhdGFsb2cvY2F0YWxvZy5odG1sXCIsXG4gICAgbGluazogZnVuY3Rpb24oc2NvcGUsIGVsZW1lbnQsIGF0dHJpYnV0ZSkge1xuICAgICAgRml4dHVyZXNGYWN0b3J5LmdldE9yZGVyKCkudGhlbihmdW5jdGlvbihyZXN1bHQpIHtcbiAgICAgICAgc2NvcGUub3JkZXIgPSByZXN1bHQuZGF0YTtcbiAgICAgIH0pO1xuICAgICAgRml4dHVyZXNGYWN0b3J5LmdldFZhcmlhYmxlcygpLnRoZW4oZnVuY3Rpb24ocmVzdWx0KSB7XG4gICAgICAgIHNjb3BlLnZhcmlhYmxlcyA9IHJlc3VsdC5kYXRhO1xuICAgICAgfSk7XG4gICAgfVxuICB9O1xufSk7IiwiYXBwLmRpcmVjdGl2ZShcIm5hdmJhclwiLCBmdW5jdGlvbigpe1xuXHRyZXR1cm4ge1xuXHRcdHJlc3RyaWN0OiBcIkVcIixcblx0XHR0ZW1wbGF0ZVVybDogXCIvcHJlLWJ1aWxkL2NvbW1vbi9kaXJlY3RpdmUvbmF2YmFyL25hdmJhci5odG1sXCJcblx0fTtcbn0pOyJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==