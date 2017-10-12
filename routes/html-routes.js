var express = require("express");

var router = express.Router();

router.get("/", function(req, res) {
  
      res.render("index.handlebars");
    
  });
  router.get("/login", function(req, res) {
    
        res.render("login.handlebars");
      
    });

    router.get("/profile", function(req, res) {
      
          res.render("profile.handlebars");
        
      });
      router.get("/addproduct", function(req, res) {
        
            res.render("addproduct.handlebars");
          
        });
        router.get("/productimages", function(req, res) {
            
                res.render("productimages.handlebars");
              
            });
            router.get("/uploadsuccess", function(req, res) {
                  
                      res.render("uploadsuccess.handlebars");
                    
                  });
                  router.get("/uploaderror", function(req, res) {
                    
                        res.render("uploaderror.handlebars");
                      
                    });

                  
                  router.get("/logout", function(req, res) {
                    
                        res.render("index.handlebars");
                      
                    });
                    router.get("/chat", function(req, res) {
                        
                            res.render("chat.html");
                          
                        });
  module.exports = router;