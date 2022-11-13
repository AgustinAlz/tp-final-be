const config = require("config");
const logger = require("./logger");
const TpFinal = require("./lib/tpFinal");

const tpFinal = new TpFinal(config, logger);
tpFinal.TpFinal = TpFinal;

module.exports = tpFinal;
