var db = require("../models");

module.exports = function(app) {
      app.get("/api/user/:id/:pass", function(req, res) {
        db.users.findOne({
          where: {
            email: req.params.id,
            password: req.params.pass
          }
        })
        .then(function(dbPost) {
            // var setCookie = cookie.serialize('userId', dbPost.id);
        res.json(dbPost);
        });
      });

    app.post("/api/users", function(req, res) {
        // Create an Author with the data available to us in req.body
        // console.log(req.body);
        
        db.users.create({
            email: req.body.email,
            password: req.body.password,
            name: req.body.name,
            lastname: req.body.lastname
            // picture: req.body.link

        }).then(function(dbUser) {
            // console.log(dbUser);

            res.json(dbUser);
        });
    });

    app.delete("/api/users/:id", function(req, res) {
        // Delete the Author with the id available to us in req.params.id
        db.users.destroy({
            where: {
                id: req.params.id
            }
        }).then(function(dbUser) {
            res.json(dbUser);
        });
    });

};