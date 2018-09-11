var readKey = process.env.VAC_CDS_SNC_KEY;
require("isomorphic-fetch");
var airtableConstants = require("./airtable_constants");

var fetchTableFromAirtable = async function fetchTableFromAirtable(table) {
  var offset = undefined;
  var jsonRecords = [];
  do {
    var url =
      "https://api.airtable.com/v0/app5B7wVD0mviQcc0/" +
      table +
      "?view=Grid%20view";
    if (offset) {
      url = url + "&offset=" + offset;
    }
    var resp = await fetch(url, {
      headers: {
        Authorization: "Bearer " + readKey
      }
    });
    var json = await resp.json();
    jsonRecords = jsonRecords.concat(json.records);
    offset = json.offset;
  } while (offset);

  return jsonRecords.map(function(item) {
    return item.fields;
  });
};

var hydrateFromAirtable = (exports.hydrateFromAirtable = async function hydrateFromAirtable() {
  let dataStore = {};
  airtableConstants.tableNames.forEach(function(tableName) {
    dataStore[tableName] = [];
  });

  let promises = airtableConstants.tableNames.map(async function(tableName) {
    dataStore[tableName] = await fetchTableFromAirtable(tableName);
  });
  await Promise.all(promises);
  dataStore["errors"] = [];
  airtableConstants.tableNames.forEach(function(tableName) {
    var array = dataStore[tableName].map(x => Object.keys(x).length);
    var number_of_fields = Math.max(...array);
    dataStore[tableName] = dataStore[tableName].filter((x, i) => {
      var fraction_of_cols_filled =
        (Object.keys(x).length * 1) / number_of_fields;
      if (fraction_of_cols_filled < 0.5) {
        dataStore["errors"].push(
          "missingValues." + tableName + ".row=" + (i + 1).toString()
        );
        return false;
      } else {
        return true;
      }
    });
  });

  dataStore.timestamp = await Date.now();
  return dataStore;
});
