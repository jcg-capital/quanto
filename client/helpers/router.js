/* ---------------------------------------------------- +/

## Client Router ##

Client-side Router.

/+ ---------------------------------------------------- */

// Config

Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  notFoundTemplate: 'notFound',
});

// Filters

var filters = {

  myFilter: function () {
    // do something
    this.next()
  },

  isLoggedIn: function() {
    if (!(Meteor.loggingIn() || Meteor.user())) {
      alert('Please Log In First.')
      this.stop();
    }
  }

}

Router.onBeforeAction(filters.myFilter, {only: ['algorithms']});

// Routes

Router.map(function() {

  // Algorithms

  this.route('algorithms', {
    waitOn: function () {
      return Meteor.subscribe('allAlgorithms');
    },
    data: function () {
      return {
        algorithms: Algorithms.find()
      }
    }
  });

  this.route('algorithm', {
    path: '/algorithms/:_id',
    waitOn: function () {
      return Meteor.subscribe('singleAlgorithm', this.params._id);
    },
    data: function () {
      return {
        algorithm: Algorithms.findOne(this.params._id)
      }
    }
  });


  // Pages

  this.route('homepage', {
    path: '/'
  });

  this.route('content');

  this.route('main')
  this.route('charts')
  this.route('texteditor')
  // Users

  this.route('login');

  this.route('signup');

  this.route('forgot');

});
