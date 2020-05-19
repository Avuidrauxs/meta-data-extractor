const fs = require('fs');
const path = require('path');
const { xmlToJs, _ } = require('../lib');

/**
 * This function helps evaluate whether a field is undefined
 * returns a default value if true
 * @param  {Function} fn         [description]
 * @param  {[type]}   defaultVal [description]
 * @return {[type]}              [description]
 */
const getSafe = (fn, defaultVal) => {
  try {
    return fn();
  } catch (e) {
    return defaultVal;
  }
}

/**
 * This grabs RDF data from the cache folder using their file number
 * @param  {[type]} fileNumber [description]
 * @return {[type]}            [description]
 */
const grabAllRDFData = fileNumber => new Promise((resolve, reject) => {
  const parser = new xmlToJs.Parser();
  const rdfFile = path.join(__dirname, `../../cache/epub/${fileNumber}/pg${fileNumber}.rdf`);
  if (fs.existsSync(rdfFile)) {
    fs.readFile(rdfFile, (err, data) => {
      parser.parseString(data, (err, result) => {
        if (err) return reject(err);
        const title = getSafe(() => result['rdf:RDF']['pgterms:ebook'][0]['dcterms:title'][0], 'no title');
        const author = getSafe(() => result['rdf:RDF']['pgterms:ebook'][0]['dcterms:creator'][0]['pgterms:agent'][0]['pgterms:name'][0], 'no author');
        const publisher = 'Project Gutenberg';
        const publication_date = getSafe(() => result['rdf:RDF']['pgterms:ebook'][0]['dcterms:issued'][0]['_'], 'No date');
        const subjects = getSafe(() => result['rdf:RDF']['pgterms:ebook'][0]['dcterms:subject'][0]['rdf:Description'][0]['rdf:value'][0], 'No subject');
        const license_rights = getSafe(() => result['rdf:RDF']['pgterms:ebook'][0]['dcterms:rights'][0], 'no license/rights');

        return resolve({
          title,
          author,
          publication_date,
          publisher,
          subjects,
          license_rights,
        })
      });
    });
  }
})

/**
 * This function iterates through the entires cache/epub folder to add every
 * @return {[type]} [description]
 */
const grabAllRDFDataBulk = ( size = null) => new Promise(async (resolve, reject) => {
  const parser = new xmlToJs.Parser();
  const allData = [];
  let count = 0;
  const filePath = path.join(__dirname, '../../cache/epub');
  try {
    const dir = await fs.promises.opendir(filePath);
    let count = 0;
    for await (let dirent of dir) {
      if(size && count > size) {
        console.log(count, 'We entered');
        
        return resolve(allData);
        }
        let rdfFile = path.join(__dirname, `../../cache/epub/${dirent.name}/pg${dirent.name}.rdf`);
        if (fs.existsSync(rdfFile)) {
          await fs.readFile(rdfFile, async (err, data) => {
           await  parser.parseString(data, (err, result) => {
              if (err) return reject(err);
              const title = getSafe(() => result['rdf:RDF']['pgterms:ebook'][0]['dcterms:title'][0], 'no title');
              const author = getSafe(() => result['rdf:RDF']['pgterms:ebook'][0]['dcterms:creator'][0]['pgterms:agent'][0]['pgterms:name'][0], 'no author');
              const publisher = 'Project Gutenberg';
              const publication_date = getSafe(() => result['rdf:RDF']['pgterms:ebook'][0]['dcterms:issued'][0]['_'], 'No date');
              const subjects = getSafe(() => result['rdf:RDF']['pgterms:ebook'][0]['dcterms:subject'][0]['rdf:Description'][0]['rdf:value'][0], 'No subject');
              const license_rights = getSafe(() => result['rdf:RDF']['pgterms:ebook'][0]['dcterms:rights'][0], 'no license/rights');

              allData.push({
                title,
                author,
                publication_date,
                publisher,
                subjects,
                license_rights,
              });
            });
          });
        }
        count++;
    }
    return resolve(allData);
  } catch (err) {
    return reject(err);
  }
})

module.exports = {
  grabAllRDFData,
  grabAllRDFDataBulk,
}
