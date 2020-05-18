'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'Book_meta',
      'book_id',
      {
        type: Sequelize.INTEGER,
        references: {
          model: 'Books', // name of Target model
          key: 'id', // key in Target model that we're referencing
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      }
    )
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      'Book_meta', // name of Source model
      'book_id' // key we want to remove
    )
  }
};