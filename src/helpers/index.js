const fs = require('fs');
const path = require('path');
const { xmlToJs, _ } = require('../lib');

const getSafe = (fn, defaultVal) => {
  try {
    return fn();
  } catch (e) {
    return defaultVal;
  }
}


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


const grabAllRDFDataBulk = () => new Promise(async (resolve, reject) => {
  const parser = new xmlToJs.Parser();
  const allData = [];

  const filePath = path.join(__dirname, '../../cache/epub');
  try {
    const dir = await fs.promises.opendir(filePath);
    for await (const dirent of dir) {
      const rdfFile = path.join(__dirname, `../../cache/epub/${dirent.name}/pg${dirent.name}.rdf`);
      if (fs.existsSync(rdfFile)) {
        fs.readFileSync(rdfFile, (err, data) => {
          parser.parseString(data, (err, result) => {
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
    }
    return allData;
  } catch (err) {
    return reject(err);
  }
})


module.exports = {
  grabAllRDFData,
  grabAllRDFDataBulk,
}
