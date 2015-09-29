app.controller('NavbarController', function($scope, Fixtures) {

$scope.getName = (id) => {return $scope.variables[id]};

$scope.test= (id) => {return "hi"};

});