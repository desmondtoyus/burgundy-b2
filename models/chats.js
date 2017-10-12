module.exports = function(sequelize, DataTypes) {
  var chats = sequelize.define("chats", {
    other_user: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    my_message: {
      type: DataTypes.TEXT,
      allowNull: true,
      len: [1]
    },
    your_message: {
      type: DataTypes.TEXT,
      allowNull: true,
      validate: {
        len: [1]
      }
    }
  });

  chats.associate = function(models) {
    // We're saying that a Post should belong to an Author
    // A Post can't be created without an Author due to the foreign key constraint
    chats.belongsTo(models.users, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return chats;
};
