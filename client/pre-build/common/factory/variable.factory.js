//accepts a position in the order and returns a variable.

app.factory("Variable", function(Fixtures) {
  var variables = Fixtures.variables();
  var keys = Object.keys(variables);
  var orders = Fixtures.order();

  //takes position in the variables fixtures
    var getVariable = (num) => variables[keys[num]];
    return {
        get: getVariable
    };
});