app.directive("navbar", function(Fixtures) {
    return {
        restrict: "E",
        templateUrl: "/pre-build/common/directive/navbar/navbar.html",
        controller: "NavbarController",
        link: function(scope, element, attribute) {
            Fixtures.getOrder().then(function(result) {
                scope.order = result.data.graph;
            });
            Fixtures.getVariables().then(function(result) {
                scope.variables = result.data.index;
            });
        }
    };
});
