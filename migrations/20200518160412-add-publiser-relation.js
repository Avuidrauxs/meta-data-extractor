'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'Books',
      'publisher_id',
      {
        type: Sequelize.INTEGER,
        references: {
          model: 'Publishers', // name of Target model
          key: 'id', // key in Target model that we're referencing
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      }
    )
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      'Books', // name of Source model
      'publisher_id' // key we want to remove
    )
  }
};
