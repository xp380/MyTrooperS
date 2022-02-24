const router = require("express").Router();

router.get("/", (req, res) => {
  console.log("Welcome User");
});

module.exports = router;
