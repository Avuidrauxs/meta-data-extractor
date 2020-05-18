'use strict';
module.exports = (sequelize, DataTypes) => {
  const Book_meta = sequelize.define('Book_meta', {
    id: DataTypes.INTEGER,
    language: DataTypes.STRING,
    subjects: DataTypes.TEXT,
    license_rights: DataTypes.TEXT
  }, {});
  Book_meta.associate = function(models) {
    Book_meta.belongsTo(models.Book, { as: 'metadata' });
  };
  return Book_meta;
};