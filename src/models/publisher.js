'use strict';
module.exports = (sequelize, DataTypes) => {
  const Publisher = sequelize.define('Publisher', {
    id: DataTypes.INTEGER,
    publisher: DataTypes.STRING,
    publication_date: DataTypes.DATE
  }, {});
  Publisher.associate = function(models) {
    // associations can be defined here
  };
  return Publisher;
};