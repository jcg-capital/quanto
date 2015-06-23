/* ---------------------------------------------------- +/

## Algorithm ##

Code related to the algorithm template

/+ ---------------------------------------------------- */

Template.algorithm.created = function () {
  //
};

Template.algorithm.helpers({
  
  myHelper: function () {
    //
  }

});

Template.algorithm.rendered = function () {
  //
};

Template.algorithm.events({

  'click .delete': function(e, instance){
    var algorithm = this;
    e.preventDefault();
    Meteor.call('removeAlgorithm', algorithm, function(error, result){
      alert('Algorithm deleted.');
      Router.go('/algorithms');
    });
  }

});