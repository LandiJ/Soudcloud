"use strict";
module.exports = function(sequelize, DataTypes) {
  var favsongs = sequelize.define(
    "favsongs",
    {
      artwork_url: {
        type: DataTypes.STRING,
        allowNull: true
      },
      description: {
        type: DataTypes.STRING,
        allowNull: true
      },
      duration: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      artist: {
        type: DataTypes.STRING,
        allowNull: false
      },
      stream_url: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    {
      classMethods: {
        associate: function(models) {
          // associations can be defined here
        }
      }
    }
  );
  return favsongs;
};
