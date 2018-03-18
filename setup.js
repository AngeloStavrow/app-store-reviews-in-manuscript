// setup.js
// Checks for first-run criteria and, if present, sets up the integration.
const fs = require('fs');

var configFile = '.data/config.json'
var reviewsFile = '.data/reviews.json'

// Check to see if 🗝️.env contains a site name and API token.
function checkIfAppSecretsExist() {
  if (process.env.SITE_NAME.length + process.env.API_TOKEN.length > 0) {
    return true;
  }
  else {
    return false;
  }
}

// Check to see if data file exists.
function checkIfDataFileExists(filename) {
  console.log("Checking for " + filename + "…");
  
  // Try opening the file for reading to see if it exists.
  fs.open(filename, 'r', function(err, fd) {
    if (err) {
      console.log("  > ",filename,"does not exist.");
      // if the .data directory doesn't exist, create it.
      fs.mkdir('.data', function(err) {
        if (err) {
          console.log("  > .data directory already exists, skipping.")
        }
      });
      
      fs.writeFile(filename, '', function(err) {
        if (err) {
          console.log("  > ERROR —",err.message);
        }
        console.log("  > ", filename, "was created.");
      });
    }
    else {
      console.log("  > ",filename,"exists");
    }
  });  
}

// Set up the integration when it's first run.
function setupIntegration(site, token) {
  // We need to include the protocol for API requests.
  process.env.SITE_NAME = 'https://' + site;
  process.env.API_TOKEN = token;
}

// Export a named function that checks for first-run status.
module.exports.isFirstRun = function (site, token) {
  if (!checkIfAppSecretsExist()) {
    setupIntegration(site, token);
  }
  
  checkIfDataFileExists(configFile);
  checkIfDataFileExists(reviewsFile);
}