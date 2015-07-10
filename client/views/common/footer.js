Template.footer.helpers({

})

Template.footer.events({
  'click #homeButton': function(){
    console.log('clicked home');
    Router.go('productPage');
  }
})