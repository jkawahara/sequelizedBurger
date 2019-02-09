// *** Include Modules: express, /models
var express = require('express');
var db = require('../models');

// Assign express.Router() to router and configure routes
var router = express.Router();

// Read operation for get request
router.get("/", function(req, res) {
  db.Burger.findAll({ raw: true }).then(function(dbBurger) {
    var hbsObject = {
      burgers: dbBurger
    };
    res.render("index", hbsObject);
  });
});
// Create operation for post request 
router.post("/api/burgers", function(req, res) {
  db.Burger.create(req.body).then(function(dbBurger) {
    res.json(dbBurger);
  });
});
// Update operation for put request
router.put("/api/burgers/:id", function(req, res) {
  db.Burger.update(
    {
      devoured: req.body.devoured
    },
    {
      where: {
        id: req.params.id
      }
    }).then(function(dbBurger) {      
      res.json(dbBurger);
    });
});
// *** Export routes for server.js
module.exports = router;