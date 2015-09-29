app.controller('ItemController', function($scope, Fixtures) {

    Fixtures.getVariables().then(function(result) {
        $scope.variables = result.data.index;
        $scope.getName = (id) => {
            return $scope.variables[id].name
        };
    });

    $scope.isCollapsed = true;

});

