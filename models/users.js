module.exports = function(sequelize, DataTypes) {
  var users = sequelize.define("users", {
      email: {
          type: DataTypes.TEXT,
          allowNull: false,
          validate: {
            len: [1]
          }
        },
        password: {
          type: DataTypes.TEXT,
          allowNull: false,
          len: [6, 10]
        },
        name: {
          type: DataTypes.TEXT,
          allowNull: false,
          validate: {
            len: [1]
          }
        },
        lastname: {
          type: DataTypes.TEXT,
          allowNull: false,
        
        },
       
        picture: {
          type: DataTypes.TEXT,
          allowNull: true,
         
        }
  });

  users.associate = function(models) {
    // Associating Author with Posts
    // When an Author is deleted, also delete any associated Posts
    users.hasMany(models.posts, {
      onDelete: "cascade"
    });
  };

  return users;
};
