/* ---------------------------------------------------- +/

##  ##

Code related to the textEditor template

/+ ---------------------------------------------------- */

Template.textEditor.created = function () {
	var ace = AceEditor.instance("archy",{
	    theme:"twilight", 
	    mode:"html"
	});
};

Template.textEditor.helpers({
  
  myHelper: function () {
    //
  }

});

Template.textEditor.rendered = function () {

};

Template.textEditor.events({

  'click': function(e, instance){

  }

});