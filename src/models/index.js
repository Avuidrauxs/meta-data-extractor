const path = require('path');
const { sequelize } = require('../lib');

module.exports = {
    Book: sequelize.import(path.join(__dirname, '../models/book')),
    Publisher: sequelize.import(path.join(__dirname, '../models/publisher')),
    BookMeta: sequelize.import(path.join(__dirname, '../models/book_meta')),
}