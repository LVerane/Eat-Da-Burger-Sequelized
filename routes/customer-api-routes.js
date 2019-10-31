var db = require("../models");

module.exports = function(app) {
  app.get("/api/customer/:customer", function(req, res) {
    db.Customer.findOne({ where: { customer: req.params.customer } }).then(
      function(results) {
        res.json(results);
      }
    );
  });

  app.post("/api/customer", function(req, res) {
    db.Customer.create({
      customer: req.body.customer
    }).then(function(results) {
      res.json(results);
    });
  });

  app.put("/api/customer/:customer", function(req, res) {
    db.Customer.update(
      {
        burgersEaten: req.body.burgersEaten
      },
      { where: { customer: req.params.customer } }
    ).then(data => res.json(data));
  });
};
