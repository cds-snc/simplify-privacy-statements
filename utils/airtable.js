var readKey = process.env.VAC_CDS_SNC_KEY;
var writeKey = process.env.AIRTABLE_WRITE_KEY;

require("isomorphic-fetch");
var airtableConstants = require("./airtable_constants");

var fetchSavedSet = async function fetchSavedSet(id) {
  var url = `https://api.airtable.com/v0/app5B7wVD0mviQcc0/saved_sets/${id}`;
  var resp = await fetch(url, {
    headers: {
      Authorization: "Bearer " + readKey
    }
  });
  var json = await resp.json();
  return json;
};

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

  try {
    return jsonRecords.map(function(item) {
      return item.fields;
    });
  } catch (e) {
    throw new Error(e);
  }
};

var hydrateFromAirtable = (exports.hydrateFromAirtable = async function hydrateFromAirtable(
  id = false
) {
  let dataStore = {};
  airtableConstants.tableNames.forEach(function(tableName) {
    dataStore[tableName] = [];
  });

  let promises = airtableConstants.tableNames.map(async function(tableName) {
    dataStore[tableName] = await fetchTableFromAirtable(tableName);
  });

  await Promise.all(promises);

  if (id) {
    dataStore.savedSet = await fetchSavedSet(id);
  }

  dataStore["templateList"] = dataStore["Template List"]
    .map(row => row.Name)
    .filter(s => s !== undefined);
  promises = dataStore.templateList.map(async function(templateName) {
    dataStore[templateName] = await fetchTableFromAirtable(templateName);
  });
  await Promise.all(promises);

  dataStore["questionsList"] = dataStore["Questions List"]
    .map(row => row.Name)
    .filter(s => s !== undefined);
  promises = dataStore.questionsList.map(async function(name) {
    dataStore[name] = await fetchTableFromAirtable(name);
  });
  await Promise.all(promises);

  dataStore["errors"] = [];

  dataStore.timestamp = await Date.now();
  return dataStore;
});

var writeSavedSet = (exports.writeSavedSet = async function writeSavedSet(
  payload
) {
  var url = "https://api.airtable.com/v0/app5B7wVD0mviQcc0/saved_sets";
  var resp = await fetch(url, {
    body: JSON.stringify({ fields: payload }),
    cache: "no-cache",
    headers: {
      Authorization: "Bearer " + writeKey,
      "content-type": "application/json"
    },
    method: "POST"
  });
  resp = await resp.json();
  return resp;
});
