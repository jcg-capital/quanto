
Template.combinedViews.rendered = function () {
};

Template.combinedViews.events({
  'click #algo-tab': function(e, instance){
    e.preventDefault();
    console.log(e);
  }
});
