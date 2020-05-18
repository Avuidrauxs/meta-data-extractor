'use strict';
module.exports = (sequelize, DataTypes) => {
  const Publisher = sequelize.define('Publisher', {
    publisher: DataTypes.STRING,
    publication_date: DataTypes.STRING
  }, {});
  Publisher.associate = function(models) {
    Publisher.hasMany(models.Book, { as: 'Books' })
  };
  return Publisher;
};

