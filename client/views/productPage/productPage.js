Template.productPage.created = function () {
  //
};

Template.productPage.helpers({
  
  myHelper: function () {
    //
  }

});

Template.productPage.rendered = function () {
    $('#product-page-carousel').carousel({
        interval: 3000
    });
    $('#product-page-carousel').carousel('cycle');
};

Template.productPage.events({

  'click .left-arrow': function(e, instance){
    Router.go('teamView')
  },
  'click .right-arrow': function(e, instance){
    Router.go('combinedViews')
  },
});