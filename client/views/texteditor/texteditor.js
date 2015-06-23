/* ---------------------------------------------------- +/

##  ##

Code related to the texteditor template

/+ ---------------------------------------------------- */

Template.texteditor.created = function () {
	var ace = AceEditor.instance("archy",{
	    theme:"twilight", 
	    mode:"html"
	});
};

Template.texteditor.helpers({
  
  myHelper: function () {
    //
  }

});

Template.texteditor.rendered = function () {

};

Template.texteditor.events({

  'click': function(e, instance){

  }

});