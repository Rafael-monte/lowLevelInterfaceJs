const { CONFIG_FILE_LOCATION } = require("./constants");

const fileReader = require("fs");

function openConfigurationFile() {
    return JSON.parse(fileReader.readFileSync(CONFIG_FILE_LOCATION));
}

module.exports = {openConfigurationFile};