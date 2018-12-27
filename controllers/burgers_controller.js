// *** Include Modules: express, burger.js
var express = require('express');
var burger = require('../models/burger');

// Assign express.Router() to router and configure routes
var router = express.Router();
// Read operation for get request
router.get("/", function(req, res) {
  burger.selectAll(function(data) {
    var hbsObject = {
      burgers: data
    };
    res.render("index", hbsObject);
  });
});
// Create operation for post request 
router.post("/api/burgers", function(req, res) {
  burger.insertOne(["burger_name", "devoured"], [req.body.burger_name, req.body.devoured], function(result) {
    res.json({ id: result.insertId });
  });
});
// Update operation for put request
router.put("/api/burgers/:id", function(req, res) {
  var condition = "id = " + req.params.id;
  burger.updateOne(
    {
      devoured: req.body.devoured
    },
    condition,
    function(result) {
      if (result.changedRows === 0) {
        // Return 404 if no rows changed
        return res.status(404).end();
      }
      res.status(200).end();
    }
  );
});

// *** Export routes for server.js
module.exports = router;
