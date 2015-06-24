can = {
  createAlgorithm: function (userId) {
    return true;
  },
  editAlgorithm: function (userId, algorithm) {
    return userId === algorithm.userId;
  },
  removeAlgorithm: function (userId, algorithm) {
    return userId === algorithm.userId;
  }
}