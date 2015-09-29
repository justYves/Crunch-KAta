//http layer that request both fixtures
app.factory("Fixtures", function($http,$rootScope){
  var order;
  var variables;
  var selectedVar;

  $http.get('/variables').then(function(res){
    variables = res.data.index;
  });

  $http.get('order').then(function(res){
    order = res.data.graph;
  });

  var getOrder = () => $http.get('/order');
  var getVariables = () => $http.get('/variables');
  var setCurrentVar = (id) => {
    selectedVar = variables[id];
    $rootScope.$broadcast('selection');
  };



  return {
    variables: () => variables,
    order: () => order,
    getOrder: getOrder,
    getVariables : getVariables,
    setCurrentVar : setCurrentVar,
    getCurrentVar : () => selectedVar
  };
});