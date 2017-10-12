var db = require("../models");
var path = require('path');
module.exports = function(app) {

  // GET route for retrieving all posts
  app.get("/api/posts", function(req, res) {
    db.posts.findAll({}).then(function(dbPost) {
      res.json(dbPost);
    });
  });

  // GET route for getting all of the posts by a user
  // "/api/posts/:id"
  app.get("/api/userposts/:id", function(req, res) {
    db.posts.findAll({
      where: {
        userId:req.params.id
      }
    }).then(function(dbPost) {
      res.json(dbPost);
    });
  });

  // Upload user image
   
  app.post('/upload/:id', function(req, res) {
    if (!req.files)
      return res.status(400).send('No files were uploaded.');
   
    // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
    let sampleFile = req.files.sampleFile;
    var id = req.params.id;
    console.log(id);
    // Use the mv() method to place the file somewhere on your server
    // console.log(userId);
    sampleFile.mv(path.join(__dirname, '../public/user-images/' +id+ '.jpg'), function(err) {
      if (err)
        return res.status(500).send(err);
     res.redirect('/profile');
    });
  });


  // upload product images
  app.post('/productupload/:id', function(req, res) {
    if (!req.files)
      return res.status(400).send('No files were uploaded.');
   
    // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
    let sampleFile = req.files.sampleFile;
    var id = req.params.id;
    console.log(id);
    // Use the mv() method to place the file somewhere on your server
    // console.log(userId);
    sampleFile.mv(path.join(__dirname, '../public/product-images/' +id+ '.jpg'), function(err) {
      if (err){
        return res.status(500).send(err);
      }
      else{
        console.log("procuct upload Successful")
        res.redirect('/uploadsuccess');
      }
       
     
    });
  });
  
  // Get rotue for retrieving a single post
  app.get("/api/posts/:id", function(req, res) {
    db.posts.findAll({
      where: {
        item_name: req.params.id
      }
    }).then(function(dbPost) {
      console.log(dbPost);
      res.json(dbPost);
    });
  });

  

  // Get rotue for retrieving specific post details
  app.get("/api/item/:id", function(req, res) {
    db.posts.findAll({
      where: {
        id: req.params.id
      },include: [db.users]
    }).then(function(dbPost) {
      console.log(dbPost);
     res.json(dbPost);
    });
  });

  // POST route for creating a new post
  app.post("/api/posts/", function(req, res) {
    db.posts.create({
      item_name:req.body.name,
      item_category:req.body.category,
      description:req.body.description,
      user_want:req.body.userwant,
      still_available:true,
      short_desc:req.body.shortdesc,
      location:req.body.location,
      userId:req.body.userid
    }).then(function(dbPost) {
      // console.log(dbPost);
      res.json(dbPost);
    });
  });
  


  // DELETE route for deleting posts
  app.delete("/api/posts/:id", function(req, res) {
    db.posts.destroy({
       where: {
        id: req.params.id
      }
    }).then(function(dbPost) {
      res.json(dbPost);
    });
  });

  // PUT route for updating posts
  app.put("/api/posts", function(req, res) {
    db.posts.update(
      req.body,
      {
        where: {
          id: req.body.id
        }
      }).then(function(dbPost) {
        res.json(dbPost);
      });
  });


};