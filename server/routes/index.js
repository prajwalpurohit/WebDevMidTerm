// modules required for routing
let express = require("express");
let router = express.Router();
let mongoose = require("mongoose");

// define the model
let employee = require("../models/employees");

/* GET home page. wildcard */
router.get("/", (req, res, next) => {
  res.render("content/index", {
    title: "Home",
    employees: "",
  });
});

module.exports = router;
module.exports.displayHomePAge = (req, res, next) => {
  res.render('index', {title: 'Home'});
}
