/* ---------------------------------------------------- +/

##  ##

Code related to the spreadsheet template

/+ ---------------------------------------------------- */

Template.spreadsheet.created = function () {

};

Template.spreadsheet.helpers({
  myHelper: function () {
    //
  }

});

Template.spreadsheet.rendered = function () {
  // var tmp = [
  //     ['', 'Kia', 'Nissan', 'Toyota', 'Honda', 'Mazda', 'Ford', 'Kia', 'Nissan', 'Toyota', 'Honda', 'Mazda', 'Ford'],
  //     ['2012', 10, 11, 12, 13, 15, 16, 10, 11, 12, 13, 15, 16],
  //     ['2012', 10, 11, 12, 13, 15, 16, 10, 11, 12, 13, 15, 16],
  //     ['2012', 10, 11, 12, 13, 15, 16, 10, 11, 12, 13, 15, 16],
  //     ['2012', 10, 11, 12, 13, 15, 16, 10, 11, 12, 13, 15, 16],
  //     ['2012', 10, 11, 12, 13, 15, 16, 10, 11, 12, 13, 15, 16],
  //     ['2013', 10, 11, 12, 13, 15, 16],
  //     ['2014', 10, 11, 12, 13, 15, 16],
  //     ['2015', 10, 11, 12, 13, 15, 16],
  //     ['2016', 10, 11, 12, 13, 15, 16]
  //   ];
  // var data = Session.set('dataStore', tmp);
  // var data = Session.get('dataStore')

  // Instead of creating a new Handsontable instance
  // with the container element passed as an argument,
  // you can simply call .handsontable method on a jQuery DOM object.
  var $container = $("#spreadsheet-div");
  
  $container.handsontable({
    data: Session.get('dataStore'),
    height: 396,
    width: $('#Data').width() - 5,
    minCols: 45,
    minRows: 20,
    colHeaders: true,
    rowHeaders: true,
    stretchH: 'all',
    columnSorting: true,
    contextMenu: true
  });
  $container.style.width = $('#Data').width() + 'px';
  $container.style.height = $('#Data').height() + 'px';
  // This way, you can access Handsontable api methods by passing their names as an argument, e.g.:
  var hotInstance = $("#spreadsheet-div").handsontable('getInstance');
  
  function bindDumpButton() {
      if (typeof Handsontable === "undefined") {
        return;
      }
  
      Handsontable.Dom.addEvent(document.body, 'click', function (e) {
  
        var element = e.target || e.srcElement;
  
        if (element.nodeName == "BUTTON" && element.name == 'dump') {
          var name = element.getAttribute('data-dump');
          var instance = element.getAttribute('data-instance');
          var hot = window[instance];
          console.log('data of ' + name, hot.getData());
        }
      });
    }
  bindDumpButton();
};

Template.spreadsheet.events({

  'click #data-tab': function(e, instance){

  }

});