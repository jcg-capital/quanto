/* ---------------------------------------------------- +/

## Fixtures ##

Fill in the app with dummy data if database is empty.

/+ ---------------------------------------------------- */

// Fixture data 
if (Algorithms.find().count() === 0) {
 
  Algorithms.insert({
    title: "Algo1",
    body: "function Algo1(){//code ....}"
  });

  Algorithms.insert({
    title: "K-means cluster",
    body: "function KMeansCluster(){//Code....}"
  });

  Algorithms.insert({
    title: "Scorpius",
    body: "function Scorpius(){//code ....}"
  });

}