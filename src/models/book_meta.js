'use strict';
module.exports = (sequelize, DataTypes) => {
  const Book_meta = sequelize.define('Book_meta', {
    language: DataTypes.STRING,
    subjects: DataTypes.TEXT,
    license_rights: DataTypes.TEXT,
    book_id: DataTypes.INTEGER
  }, {});
  Book_meta.associate = function(models) {
    Book_meta.belongsTo(models.Book, { as: 'metadata' });
  };
  return Book_meta;
};