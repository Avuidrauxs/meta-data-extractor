const { Book, Publisher, BookMeta } = require('../models');
const { grabAllRDFData } = require('../helpers');
const { sequelize } = require('../lib');
const path = require('path');

const insertIntoDb = async () => {
    try {
        const data = await grabAllRDFData();
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
    publisher_id: pub.id
    }).then(book => {
        BookMeta.create({
            subjects,
            license_rights,
            book_id: book.id
        })
    })
  }).catch((err) => {
    console.log(err, 'failed');
  })
    }catch(err) {
        throw new Error(err);
    }
}


// const insertIntoDb = async () => {
//     try {
//         const data = await grabAllRDFData();
//         const {
//     title,
//     author,
//     publication_date,
//     publisher,
//     subjects,
//     license_rights,
//   } = data;
//   return Publisher.create({
//     publication_date,
//     publisher,
//   }).then((pub) => {
//     Book.create({
//     title,
//     author,
//     publisher_id: pub.id
//     }).then(book => {
//         BookMeta.create({
//             subjects,
//             license_rights,
//             book_id: book.id
//         })
//     })
//   }).catch((err) => {
//     console.log(err, 'failed');
//   })
//     }catch(err) {
//         throw new Error(err);
//     }
// }

//insertIntoDb();
