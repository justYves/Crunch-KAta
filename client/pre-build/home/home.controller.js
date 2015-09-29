app.controller('HomeController', function($scope, Fixtures, Position, Variable) {

    console.log(Position.get("Recommendation")); //should be 0
    console.log(Position.get("Aided Awareness (Logo)")); //should be last

    console.log(Variable.get(5));
    $scope.$on("selection", function() {
      $scope.selectedVar = Fixtures.getCurrentVar();
      console.log($scope.selectedVar);
    });
});
