Template.productPage.created = function () {
  //
};

Template.productPage.helpers({
  
  myHelper: function () {
    //
  }

});

Template.productPage.rendered = function () {
  //
  // (function(){
  var parallax = document.querySelectorAll(".parallax"),
      speed = 0.9;

  window.onscroll = function(){
    [].slice.call(parallax).forEach(function(el,i){

      var windowYOffset = window.pageYOffset,
          elBackgrounPos = "0 " + (windowYOffset * speed) + "px";
      
      el.style.backgroundPosition = elBackgrounPos;

    });
  };
  // })();
};

Template.productPage.events({

  'click': function(e, instance){

  }

});