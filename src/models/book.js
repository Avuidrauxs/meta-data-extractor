'use strict';
module.exports = (sequelize, DataTypes) => {
  const Book = sequelize.define('Book', {
    id: DataTypes.INTEGER,
    title: DataTypes.STRING,
    author: DataTypes.STRING
  }, {});
  Book.associate = function(models) {
    // associations can be defined here
  };
  return Book;
};