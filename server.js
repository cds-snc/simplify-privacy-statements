const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const next = require("next");
const helmet = require("helmet");
const compression = require("compression");
const { parseUserAgent } = require("detect-browser");
var nodePandoc = require("node-pandoc");
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

const airTable = require("./utils/airtable");

const getAirtableData = async function() {
  const airtableData = await airTable.hydrateFromAirtable();
  return airtableData;
};

const copyValidTables = (oldData, newData) => {
  Object.keys(newData)
    .filter(tableName => newData[tableName].length > 0)
    .forEach(tableName => {
      oldData[tableName] = newData[tableName];
    });
  oldData.timestamp = newData.timestamp;
};

Promise.resolve(getAirtableData()).then(data => {
  // bootstrap our routes
  app.prepare().then(() => {
    const server = express();
    server.use(compression());
    server.use(bodyParser.json());
    server.use(helmet());

    server.post("/submitSet", (req, res) => {
      Promise.resolve(airTable.writeSavedSet(req.body)).then(resp => {
        res.send(`{"id": "${resp.id}"}`);
      });
    });

    // use next.js
    server.post("/converter", async (req, res) => {
      var callback = (err, result) => {
        if (err) {
          console.error(err);
        } else {
          console.log("done");
          res.send("done");
        }
      };
      nodePandoc(
        req.body.html,
        "-f html -t docx -o ./static/agreement.docx",
        callback
      );
    });

    server.get("*", async (req, res) => {
      // Check if browse is less than IE 11
      const ua = req.headers["user-agent"];
      const browser = parseUserAgent(ua);

      setTimeout(function() {
        Promise.resolve(airTable.hydrateFromAirtable()).then(newData => {
          copyValidTables(data, newData);
        });
      }, 1000 * 60 * 60);

      if (req.query.id) {
        req.data = await airTable.hydrateFromAirtable(req.query.id);
      } else {
        req.data = data;
      }

      if (
        browser &&
        browser.name === "ie" &&
        parseInt(browser.version) < 11 &&
        !req.url.includes("all-benefits")
      ) {
        res.sendFile("fallback-pages/browser-incompatible.html", {
          root: __dirname
        });
      } else if (req.url.includes("refresh")) {
        console.log("Refreshing Cache ...");
        let referrer = req.header("Referer") || "/";
        urlCache = {};
        Promise.resolve(airTable.hydrateFromAirtable()).then(newData => {
          copyValidTables(data, newData);
          res.redirect(referrer);
          console.log("Cache refreshed @ " + data.timestamp);
        });
      } else {
        handle(req, res);
      }
    });

    const port = process.env.PORT || 3000;
    server.listen(port, err => {
      if (err) throw err;
      console.log("> Ready on http://localhost:" + port);
    });
  });
});
