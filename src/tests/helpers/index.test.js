const helpers = require('../../helpers');
var expect = require('chai').expect;
var assert = require('assert');


describe('Read RDF File', () => {
  it('to fetch data', () => helpers.grabAllRDFData(1).then((data) => {
    assert.equal(data.hasOwnProperty('title'), true);
    assert.equal(data.hasOwnProperty('publisher'), true);
    assert.equal(data.hasOwnProperty('subjects'), true);
    assert.equal(data.hasOwnProperty('author'), true);
    assert.equal(data.hasOwnProperty('publication_date'), true);
  }))
})
