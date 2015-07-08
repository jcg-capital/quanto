Template.productPage.created = function () {
  //
};

Template.productPage.helpers({
  
  myHelper: function () {
    //
  }

});

Template.productPage.rendered = function () {

};

Template.productPage.events({

  'click .left-arrow': function(e, instance){
    alert('Left Arrow')
  },
  'click .right-arrow': function(e, instance){
    Router.go('combinedViews')
  },
});