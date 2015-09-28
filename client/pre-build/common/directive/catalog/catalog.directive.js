app.directive("catalog", function(FixturesFactory) {
  return {
    restrict: "E",
    templateUrl: "/pre-build/common/directive/catalog/catalog.html",
    link: function(scope, element, attribute) {
      FixturesFactory.getOrder().then(function(result) {
        scope.order = result.data;
      });
      FixturesFactory.getVariables().then(function(result) {
        scope.variables = result.data;
      });
    }
  };
});