/* ---------------------------------------------------- +/

##  ##

Code related to the combinedViews template

/+ ---------------------------------------------------- */

Template.combinedViews.created = function () {
};

Template.combinedViews.helpers({
  
  myHelper: function () {
    //
  }

});

Template.combinedViews.rendered = function () {
};

Template.combinedViews.events({

  'click #algo-tab': function(e, instance){
    e.preventDefault();
    console.log(e)
  }

});