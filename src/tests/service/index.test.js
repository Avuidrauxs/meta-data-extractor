const { insertIntoPG } = require('../../service');
const { Publisher, Book, BookMeta } = require('../../models');
const assert = require('assert');

const sample = {
  title: 'The Declaration of Independence of the United States of America',
  author: 'Jefferson, Thomas',
  publication_date: '1971-12-01',
  publisher: 'Project Gutenberg',
  subjects: 'United States. Declaration of Independence',
  license_rights: 'Public domain in the USA.'
}

describe('RDF DB Operations', () => {
    // before( async () => {
    //     await insertIntoPG(1);
    // })
    it('should insert valid Publisher details', async () => {
       Publisher.findAll({
           where: {
               id: 1
           }
       }).then(publisher => {
       assert.equal(publisher[0].publisher, sample.publisher);
       assert.equal(publisher[0].publication_date, sample.publication_date);
       })
    
    });

    it('should insert valid Book details', async () => {
       Book.findAll({
           where: {
               id: 1
           }
       }).then(book => {
       assert.equal(book[0].title, sample.title);
       assert.equal(book[0].author, sample.author);
       })
    
    });

    it('should insert valid Book Meta details', async () => {
       BookMeta.findAll({
           where: {
               id: 1
           }
       }).then(bm => {
       assert.equal(bm[0].license_rights, sample.license_rights);
       assert.equal(bm[0].subjects, sample.subjects);
       })
    
    });
})