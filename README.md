##Crunch Kata

Welcome to the Crunch Kata! The purpose of this exercise is evaluate your
skills in the following areas:

1. Automated Testing
2. Problem solving
3. AngularJS

##Problem description

You're working on a startup developing an application that allows to visualize
complex surveys datasets. These surveys usually contain many questions and derived data (all of them represented by *variables*). In order to ease the visualization of these variables, another team is implementinga tool that allows users to group and order them.

Your job is to develop a web component that displays these variables following the order previously defined by the dataset's owner.

The backend team has provided two test fixtures that you can use to start developing the feature. The first one, `variables.json`, contains the catalog of variables. The 2nd, `order.json` ,represents the order in which these variables should be displayed. For example, the following order defines a group "Net Promoter" that contains five variables ordered according to their position in the array:

```json
{
    "Net Promoter": [
        "1193e911122742be874251c7501f5b44/",
        "e2c3647faf594f36ac8263b8bf68d0e8/",
        "94402c3a10974bf799a1ab740288d781/",
        "a603c924903f4c0ba0b446ec0e12565b/",
        "be6cb6b488fa4bcb9a0162bd7f3c3367/"
    ]
}
```

Each id is mapped to an object `variables.json`.

##Instructions

The deliverable should contain the following:

1. An AngularJS directive that display the variables catalog following its hierarchical order. It should be easy to infer to which group a variable belongs, i.e.
    
    ![HVL](https://raw.githubusercontent.com/Crunch-io/crunch-kata/master/hvl.png)

2. A service that accepts a variable's name and returns the variable's position in the order.
3. A service that accepts a position in the order and returns a variable.
3. An HTTP layer that requests the two fixtures.

It goes without saying that automated testing is really important for us. We want to appreciate your skills in this area.

##About the tools

We only have one hard requirement: AngularJS.

##Deliverable

Publish your work in a GitHub repository.
