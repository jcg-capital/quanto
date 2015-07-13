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

//****************************************//
// Filters
//****************************************//
var filters = {
  myFilter: function () {
    // do something
    this.next();
  },
  isLoggedIn: function() {
    if (!(Meteor.loggingIn() || Meteor.user())) {
      alert('Please Log In First.');
      this.stop();
    }
  }
};

Router.onBeforeAction(filters.myFilter, {only: ['algorithms']});

Router.map(function() {
  //****************************************//
  // Algorithms
  //****************************************//
  this.route('algorithms', {
    waitOn: function () {
      return Meteor.subscribe('allAlgorithms');
    },
    data: function () {
      return {
        algorithms: Algorithms.find()
      };
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
      };
    }
  });
  //****************************************//
  // Quandl Test example
  //****************************************//
  this.route('server', {
    data: function() {
      return {
        query: HTTP.call("POST", "quandlquery",
          {
            data: {
              code : {
                'source': 'WIKI',
                'table': 'AAPL'
              },
              options : { 
                column:'4',
                sort_order:'asc',
                collapse:'quarterly',
                trim_start:'2012-01-01',
                trim_end:'2013-12-31'
              }
            } 
          },
          function (error, result) {
            if (!error) {
              console.log('client/helpers/router.js: this.route("server")' + result);
            }
          }
        )
      };
    }
  });
  //****************************************//
  // Pages
  //****************************************//
  this.route('productPage',{
    path: '/',
  });
  this.route('teamView');
  this.route('combinedViews', {
    waitOn: function () {
      return Meteor.subscribe('allAlgorithms');
    },
    data: function () {
      return {
        algorithms: Algorithms.find()
      };
    }
  });
  //****************************************//
  // Layout
  //****************************************//
  this.route('content');

  //****************************************//
  // Left View
  //****************************************//
  this.route('textEditor', {
    waitOn: function () {
      return Meteor.subscribe('allAlgorithms');
    },
    data: function () {
      return {
        algorithms: Algorithms.find()
      };
    }
  });
  //****************************************//
  // Right View
  //****************************************//
  this.route('charts');
  this.route('lastQuote');
  this.route('stockTwits');

  // Users
  this.route('login');
  this.route('signup');
  this.route('forgot');
});
