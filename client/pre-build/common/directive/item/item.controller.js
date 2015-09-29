app.controller('ItemController', function($scope, Fixtures) {
    $scope.isCollapsed = true;

    Fixtures.getVariables().then(function(result) {
        $scope.variables = result.data.index;
        $scope.getName = (id) => {
            return $scope.variables[id].name;
        };
    });
    //returns the length of the item
    $scope.getLength = (item) => {
      return item.length;
    };

    $scope.setCurrentVar = Fixtures.setCurrentVar;
});

