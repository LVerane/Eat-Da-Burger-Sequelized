// var express = require("express");
// var router = express.Router();
// var burger = require("../models/burger.js");

// Requiring our Todo model
var db = require("../models");

// Routes
// =============================================================
module.exports = function(app) {
  app.get("/", function(req, res) {
    db.Burger.findAll({}).then(function(results) {
      // console.log(results[0]);
      res.render("index", results);
      // res.json(results[0]);
    });
  });

  app.get("/api/burgers/:id", function(req, res) {
    db.Burger.findOne({ where: { id: req.params.id } }).then(function(results) {
      res.json(results);
    });
  });

  // POST route for saving a new todo. We can create todo with the data in req.body
  app.post("/api/burgers", function(req, res) {
    // Write code here to create a new todo and save it to the database
    // and then res.json back the new todo to the user
    db.Burger.create({
      burger: req.body.burger,
      toGo: req.body.toGo
    }).then(function(results) {
      res.json(results);
      //   res.json({ id: result.insertId }); //was this on the old file
    });
  });

  // DELETE route for deleting todos. We can get the id of the todo to be deleted from
  // req.params.id
  app.delete("/api/burgers/:id", function(req, res) {
    db.Burger.destroy({ where: { id: req.params.id } }).then(
      data => res.json(data)
      //   res.json({ id: result.insertId }); //was this on the old file
    );
  });

  // PUT route for updating todos. We can get the updated todo data from req.body
  app.put("/api/burgers/:id", function(req, res) {
    db.Burger.update(
      {
        // text: req.body.text, //don't actually need that, in this case itwould just override 'text' with itself
        devoured: req.body.devoured,
        toGo: req.body.toGo
      },
      { where: { id: req.body.id } }
    ).then(data => res.json(data));
  });
};
