/* ---------------------------------------------------- +/

## Fixtures ##

Fill in the app with dummy data if database is empty.

/+ ---------------------------------------------------- */

// Fixture data 
if (Algorithms.find().count() === 0) {
 
  Algorithms.insert({
    title: "Eridanus",
    body: "function Eridanus(){alert('running Eridanus algorithm')}"
  });

  Algorithms.insert({
    title: "K Means Cluster",
    body: "function Eridanus(){alert('clustering stuff now')}"
  });

  Algorithms.insert({
    title: "SMA",
    body: "function SMA(){alert('Simple Moving Average')}"
  });

}