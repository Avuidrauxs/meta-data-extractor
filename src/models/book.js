'use strict';
module.exports = (sequelize, DataTypes) => {
  const Book = sequelize.define('Book', {
    id: DataTypes.INTEGER,
    title: DataTypes.STRING,
    author: DataTypes.STRING
  }, {});
  Book.associate = function(models) {
    Book.belongsTo(models.Publisher);
    Book.hasOne(models.Books_meta, { as: 'metaData' });
  };
  return Book;
};