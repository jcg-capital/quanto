/* ---------------------------------------------------- +/

##  ##

Code related to the combinedViews template

/+ ---------------------------------------------------- */

Template.combinedViews.created = function () {
};

// Template.combinedViews.helpers({
  
//   myHelper: function () {
//     //
//   }

// });

Template.combinedViews.rendered = function () {
};

Template.combinedViews.events({

  'click #algo-tab': function(e, instance){
    e.preventDefault();
    console.log(e)
  }

});

// var ROTATIONS = [
//   [ Math.PI/8 , Math.PI/4 ],
//   [ -1 * Math.PI/10 , 7 * Math.PI + Math.PI/4]
// ]

// Session.setDefault('rotation', 0);

// Template.combinedViews.helpers({
//   reactiveRotation: function() {
//     return {
//       value: ROTATIONS[Session.get('rotation')],
//       // value1: ROTATIONS[0],
//       // value2: ROTATIONS[1],
//       transition: { duration: 3500, curve: 'inOutElastic' }
//     }
//   },
//   nodeSize: "P:0.5; P:0.5; P:0.5",
//   nodeAlign: [0.5, 0.5],
//   nodeMountPoint: [0.5, 0.5],
//   nodeOrigin: [0.55, 0.5]
// })

// Template.innerNado.events({
//   'click': function(event, tpl) {
//     console.log("CLICKED")
//     var current = Session.get('rotation');
//     // logic to alternate between first and second position in ROTATIONS array
//     Session.set('rotation', (current+1) % 2 );
//   }
// })
