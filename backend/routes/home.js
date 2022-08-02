const router = require("express").Router();

router.route("/").get((req, res) => {
  res.end("Home works...");
});

module.exports = router;