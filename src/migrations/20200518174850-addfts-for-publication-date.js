'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    var sequelize = queryInterface.sequelize,
        searchFields = ['publication_date', 'publisher'],
        vectorName = "document_pub",
        tableName = "Publishers";

    return sequelize
      .query('ALTER TABLE "' + tableName + '" ADD COLUMN "' + vectorName + '" TSVECTOR')
      .then(function() {
        console.log("Column added: Adding updating values")
        return sequelize
                .query('UPDATE "' + tableName + '" SET "' + vectorName + '" = to_tsvector(\'english\', ' + searchFields.join(' || \' \' || ') + ')')
                .catch(console.log);
      }).then(function() {
        console.log("Values added: Creating Index")
        return sequelize
                .query('CREATE INDEX np_search_idx_pub ON "' + tableName + '" USING gin("' + vectorName + '");')
                .catch(console.log);
      }).then(function() {
        console.log("Index created: Adding trigger");
        return sequelize
                .query('CREATE TRIGGER np_vector_update_pub BEFORE INSERT OR UPDATE ON "' + tableName + '" FOR EACH ROW EXECUTE PROCEDURE tsvector_update_trigger("' + vectorName + '", \'pg_catalog.english\', ' + searchFields.join(', ') + ')')
                .catch(console.log);
      }).then(function() {
        console.log("Everything worked!")
      }).catch(console.log);
  },

  down: function (queryInterface, Sequelize) {
    var sequelize = queryInterface.sequelize,
        searchFields = ['publication_date'],
        vectorName = "document_pub",
        tableName = "Publishers";
        
    return sequelize
      .query('DROP TRIGGER np_vector_update_pub ON "' + tableName + '"')
      .then(function(){
        console.log("removed trigger")
        return sequelize
                .query("DROP INDEX np_search_idx_pub")
                .catch(console.log)
      }).then(function(){
        console.log("removed index")
        return sequelize
                .query('ALTER TABLE "' + tableName + '" DROP COLUMN "' + vectorName + '"')
                .catch(console.log)
      }).then(function(){
        console.log("removed column")
      }).catch(console.log)
  }
};