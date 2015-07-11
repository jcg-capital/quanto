/* ---------------------------------------------------- +/

## Algorithm ##

Code related to the algorithm template

/+ ---------------------------------------------------- */

Template.algorithm.created = function () {
  //
};

Template.registerHelper('rowMaker',function(){
    console.log('rowmaker:',arguments);
});

Template.algorithm.helpers({
  myHelper: function () {
    //
  },
});

Template.algorithm.rendered = function () {
  //
};

Template.algorithm.events({
  //*************************************//
  // delete algo button event
  //*************************************//
  'click .delete': function(e, instance){
    var algorithm = this;
    e.preventDefault();
    Meteor.call('removeAlgorithm', algorithm, function(error, result){
      alert('Algorithm deleted.');
      Router.go('/algorithms');
    });
  },
  //*************************************//
  // Clone Algorithm Button Event
  //*************************************//
  'click #clone-algo': function(e, instance){
    var algorithm = this;
    e.preventDefault();
    Session.set('clonedAlgo', algorithm.body)
    Router.go('combinedViews')
  }  

});