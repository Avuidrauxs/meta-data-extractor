const { Book, Publisher, BookMeta } = require('../models');
const { grabAllRDFData, grabAllRDFDataBulk } = require('../helpers');
const { sequelize } = require('../lib');
const path = require('path');

/**
 * This function inserts output from our RDF parsed data into our database
 * @param  {[type]}  rdfId [description]
 * @return {Promise}       [description]
 */
const insertIntoPG = async (rdfId = 1) => {
  try {
    const data = await grabAllRDFData(rdfId);
    const {
      title,
      author,
      publication_date,
      publisher,
      subjects,
      license_rights,
    } = data;
    return Publisher.create({
      publication_date,
      publisher,
    }).then((pub) => {
      Book.create({
        title,
        author,
        publisher_id: pub.id,
      }).then((book) => {
        BookMeta.create({
          subjects,
          license_rights,
          book_id: book.id,
        })
      })
    }).catch((err) => {
      console.log(err, 'failed');
    })
  } catch (err) {
    throw new Error(err);
  }
}

const bulkInsertIntoPG = async (size) => {
  try {
    const data = await grabAllRDFDataBulk(size);
    return data.forEach(item => {
      let {
      title,
      author,
      publication_date,
      publisher,
      subjects,
      license_rights,
    } = item;
    return Publisher.create({
      publication_date,
      publisher,
    }).then((pub) => {
      Book.create({
        title,
        author,
        publisher_id: pub.id,
      }).then((book) => {
        BookMeta.create({
          subjects,
          license_rights,
          book_id: book.id,
        })
      })
    }).catch((err) => {
      console.log(err, 'failed');
    })
    })
  } catch (err) {
    throw new Error(err);
  }
}

module.exports = {
    insertIntoPG,
    bulkInsertIntoPG
}
