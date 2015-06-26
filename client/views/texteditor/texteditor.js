/* ---------------------------------------------------- +/

##  ##

Code related to the textEditor template

/+ ---------------------------------------------------- */

Template.textEditor.created = function () {

};

Template.textEditor.helpers({
  
  myHelper: function () {
    //
  }

});

Template.textEditor.rendered = function () {
  var algo = Session.get('clonedAlgo');
  var options = {
      theme:"twilight", 
      mode:"javascript",
  };
  
  var ace = AceEditor.instance("archy", options, function(editor){
    console.log(editor);
    editor.insert(algo);
  });
  
};

Template.textEditor.events({

  'click': function(e, instance){

  }

});