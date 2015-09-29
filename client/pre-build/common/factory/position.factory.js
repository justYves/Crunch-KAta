//accepts a variable's name and returns the variable's position in the order.
app.factory("Position", function(Fixtures) {
  var variables = Fixtures.variables();
  var orders = Fixtures.order();

  //returns position in the variables fixture
    var getPosition = (name) => {
      let index = 0;
            for (let id in variables) {
                if (variables[id].name === name) {
                    return index; //position
                }
            index++;
            }
        };

    return {
        get: getPosition
    };
});