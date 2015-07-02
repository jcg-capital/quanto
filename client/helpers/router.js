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
  // Quandl
  //****************************************//
  this.route('server', {
    data: function() {
      return {
        query: HTTP.call("POST", "quandlquery",
          {data: {
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
              console.log('WE GOT SOMETHiNG HEREsfsfsafee3',result);
            }
          }
        )
      };
    }
  });

  //****************************************//
  // Pages
  //****************************************//

  this.route('combinedViews', {
    path: '/',
    waitOn: function () {
      return Meteor.subscribe('allAlgorithms');
    },
    data: function () {
      return {
        algorithms: Algorithms.find()
      }
    }
  });

  this.route('siteMap', {
    path: 'siteMap'
  });

  this.route('content');

  this.route('charts');
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
  this.route('buttonRow');
  this.route('modalTrigger');
  this.route('brand');


  // Users

  this.route('login');

  this.route('signup');

  this.route('forgot');

});
