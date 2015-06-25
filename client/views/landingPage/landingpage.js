
// Here is the positioning data for the node in the landingPage template

var ROTATIONS = [
  [ Math.PI/8 , Math.PI/4 ],
  [ -1 * Math.PI/10 , 7 * Math.PI + Math.PI/4]
]

Session.setDefault('rotation', 0);

Template.landingPage.helpers({
  reactiveRotation: function() {
    return {
      value: ROTATIONS[Session.get('rotation')],
      // value1: ROTATIONS[0],
      // value2: ROTATIONS[1],
      transition: { duration: 3500, curve: 'inOutSine' }
    }
  },
  nodeSize: "P:0.5; P:0.5; P:0.5",
  nodeAlign: [0.5, 0.5],
  nodeMountPoint: [0.5, 0.5],
  nodeOrigin: [0.55, 0.5]
})

Template.inner.events({
  'click': function(event, tpl) {
    console.log("CLICKED")
    var current = Session.get('rotation');
    // logic to alternate between first and second position in ROTATIONS array
    Session.set('rotation', (current+1) % 2 );
  }
})
