/* ---------------------------------------------------- +/

## Publications ##

All publications-related code. 

/+ ---------------------------------------------------- */

// Publish all algorithms

Meteor.publish('allAlgorithms', function() {
  return Algorithms.find();
});

// Publish a single algorithm

Meteor.publish('singleAlgorithm', function(id) {
  return Algorithms.find(id);
})