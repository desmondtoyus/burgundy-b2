module.exports = function (sequelize, DataTypes) {
  var posts = sequelize.define("posts", {
    item_name: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        len: [1, 150]
      }
    },
    item_category: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        len: [1, 150]
      }
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    short_desc: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        len: [1, 250]
      }
    },
    location: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        len: [1]
      }
    },


    user_want: {
      type: DataTypes.TEXT,
      allowNull: false,
      len: [1]
    },
    still_available: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      default: true,
      validate: {
        len: [1]

      }
    },
    picture1: {
      type: DataTypes.TEXT,
      allowNull: true,
      validate: {
        len: [1]
      }
    },
    picture2: {
      type: DataTypes.TEXT,
      allowNull: true,
      validate: {
        len: [1]
      }
    },
    picture3: {
      type: DataTypes.TEXT,
      allowNull: true,
      validate: {
        len: [1]
      }
    },
    picture4: {
      type: DataTypes.TEXT,
      allowNull: true,
      validate: {
        len: [1]
      }
    },
    picture5: {
      type: DataTypes.TEXT,
      allowNull: true,
      validate: {
        len: [1]
      }
    }
  });

  posts.associate = function (models) {
    // We're saying that a Post should belong to an Author
    // A Post can't be created without an Author due to the foreign key constraint
    posts.belongsTo(models.users, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return posts;
};