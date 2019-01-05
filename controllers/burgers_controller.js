var express = require('express');
var db = require('../models');

// Assign express.Router() to router and configure routes
var router = express.Router();
// Read operation for get request
router.get("/", function (req, res) {
  db.Burger.findAll({}).then(function (dbBurger) {
    // console.log(dbBurger.length)
    if (dbBurger.length === 0) {
      var hbsObject = {

        burgers: dbBurger
      };
      res.render("index", hbsObject);
    }
    if (dbBurger.length > 0) {
      var newArray = []
      for (var i = 0; i < dbBurger.length; i++){
      newArray.push(dbBurger[i].dataValues)
    }
      var hbsObject = {

        burgers: newArray
      };
      console.log(hbsObject)
      res.render("index", hbsObject);
    }
  });
});
// Create operation for post request 
router.post("/api/burgers", function (req, res) {
  db.Burger.create(req.body).then(function () {
    res.json({})
  });
});
// Update operation for put request
router.put("/api/burgers/:id", function (req, res) {
  db.Burger.update(
    {devoured: req.body.devoured},
    {where: {id : req.params.id}}
  ).then(function (dbBurger) {
    res.json(dbBurger);
  });
});
// *** Export routes for server.js
module.exports = router;