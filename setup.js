// setup.js
// Checks for first-run criteria and, if present, sets up the integration.

// Check to see if 🗝️.env contains a site name and API token.
function checkIfAppSecretsExist() {
  if (process.env.SITE_NAME.length + process.env.API_TOKEN.length > 0) {
    return true;
  }
  else {
    return false;
  }
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
}