// Requiring our burger model
var db = require("../models");

// Routes
// =============================================================
module.exports = function(app) {
  app.get("/", function(req, res) {
    db.Burger.findAll({}).then(function(results) {
      // console.log(results);
      res.render("index", { burgers: results });
      // res.json(results[0]);
    });
  });

  app.get("/api/burgers/:id", function(req, res) {
    db.Burger.findOne({ where: { id: req.params.id } }).then(function(results) {
      res.json(results);
    });
  });

  // POST route for saving a new burger. We can create burger with the data in req.body
  app.post("/api/burgers", function(req, res) {
    db.Burger.create({
      burger: req.body.burger,
      toGo: req.body.toGo
    }).then(function(results) {
      res.json(results);
    });
  });

  // DELETE route for deleting burgers. We can get the id of the burger to be deleted from
  app.delete("/api/burgers/:id", function(req, res) {
    db.Burger.destroy({ where: { id: req.params.id } }).then(
      data => res.json(data)
      //   res.json({ id: result.insertId }); //was this on the old file
    );
  });

  // PUT route for updating burgers. We can get the updated burger data from req.body
  app.put("/api/burgers/:id", function(req, res) {
    db.Burger.update(
      {
        devoured: req.body.devoured,
        toGo: req.body.toGo,
        eatenBy: req.body.eatenBy
      },
      { where: { id: req.params.id } }
    ).then(data => res.json(data));
  });
};
