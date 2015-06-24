/* ---------------------------------------------------- +/

## Algorithms ##

All code related to the Algorithms collection goes here. 

/+ ---------------------------------------------------- */

Algorithms = new Meteor.Collection('algorithms');

// Allow/Deny

Algorithms.allow({
  insert: function(userId, doc){
    return can.createAlgorithm(userId);
  },
  update:  function(userId, doc, fieldNames, modifier){
    return can.editAlgorithm(userId, doc);
  },
  remove:  function(userId, doc){
    return can.removeAlgorithm(userId, doc);
  }
});

// Methods

Meteor.methods({
  createAlgorithm: function(algorithm){
    if(can.createAlgorithm(Meteor.user()))
      Algorithms.insert(algorithm);
  },
  removeAlgorithm: function(algorithm){
    if(can.removeAlgorithm(Meteor.user(), algorithm)){
      Algorithms.remove(algorithm._id);
    }else{
      throw new Meteor.Error(403, 'You do not have the rights to delete this item.')
    }
  }
});
