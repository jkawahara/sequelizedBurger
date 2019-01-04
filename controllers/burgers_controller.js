// *** Include Modules: express, burger.js
var express = require('express');
var db = require('../models');

// Assign express.Router() to router and configure routes
var router = express.Router();
// Read operation for get request
router.get("/", function (req, res) {
  db.Burger.findAll({}).then(function (dbBurger) {
    res.render("index", dbBurger);
  });
});
// Create operation for post request 
router.post("/api/burgers", function (req, res) {
  //   burger.insertOne(["burger_name", "devoured"], [req.body.name, req.body.devoured], function(result) {
  //     res.json({ id: result.insertId });
  //   });
  // });
  console.log(req.body)
  db.Burger.create(req.body).then(function (dbBurger) {
    res.json({ id: dbBurger.insertId});
  });
});
// Update operation for put request
router.put("/api/burgers/:id", function (req, res) {
//   var condition = "id = " + req.params.id;
//   burger.updateOne(
//     {
//       devoured: req.body.devoured
//     },
//     condition,
//     function (result) {
//       if (result.changedRows === 0) {
//         // Return 404 if no rows changed
//         return res.status(404).end();
//       }
//       res.status(200).end();
//     }
//   );
// });
  db.Burger.update(
    req.body.devoured,
    {
      where: {
        id: req.body.id
      }
    }).then(function(dbPost) {
    res.json(dbPost);
  });
});
// *** Export routes for server.js
module.exports = router;
