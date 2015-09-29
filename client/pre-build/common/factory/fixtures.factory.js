app.factory("Fixtures", function($http){
  var order, variables;

  return {
    getOrder: function(){
      return $http.get('/order');
     },
    getVariables : function(){
      return $http.get('/variables');
    }
  };
});