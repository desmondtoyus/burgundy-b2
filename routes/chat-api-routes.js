var db = require("../models");
var path = require('path');
module.exports = function (app) {
  app.get("/api/chat/", function (req, res) {
    // 2; Add a join to include all of the Author's Posts here
    db.chats.findAll({
     
      include: [db.users],
      order: [
        ['id', 'ASC'],
       
    ],
    }).then(function (dbchat) {
      res.json(dbchat);
    });
  });

  // app.get("/api/otherchat/:user1/:user2", function (req, res) {
  //   // 2; Add a join to include all of the Author's Posts here
  //   db.chats.findAll({
  //     where: {
  //       userId: req.params.user2,
  //       other_user: req.params.user1
  //     },
  //     include: [db.users]
  //   }).then(function (dbchat) {
  //     res.json(dbchat);
  //   });
  // });


  //user mesages
  app.get("/api/messages/:user/", function (req, res) {
    // 2; Add a join to include all of the Author's Posts here { DISTINCT: value1 }, { DISTINCT: value2 },
    //All({Attributes: ['col_name'], group: ['col_name']});
    //MyModel.aggregate('teh_field', 'DISTINCT', { plain: false }).then(...)
// Resolves to: [ { DISTINCT: value1 }, { DISTINCT: value2 }, ... ]
    db.chats.findAll({
     
      where: {
        other_user: req.params.user
      },  group: ['userId'],
      order: [
        ['id', 'ASC'],
       
    ],

    }
  ).then(function (dbchat) {
      res.json(dbchat);
      
    });
  })

  // POST route for creating a new chat
  app.post("/api/chat/", function (req, res) {
    db.chats.create({
      userId: req.body.me,
      other_user: req.body.you,
      my_message: req.body.msg,

    }).then(function (dbChat) {
      // console.log(dbPost);
      res.json(dbChat);
    });
  });
}