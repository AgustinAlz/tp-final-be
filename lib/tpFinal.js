const Server = require('./server')
const Database = require('./database')
// const S3 = require("./s3");

class TpFinal {
  constructor(config, logger) {
    this.config = config
    this.logger = logger.child({ context: 'TP-Final' })
    this.isRunning = false
    this.database = new Database(config, this.logger)
    // this.s3 = new S3(config, this.logger);
    this.server = new Server(config, this.logger, this.database, this.s3)
  }

  async start() {
    if (this.isRunning) {
      throw new Error('Cannot start TP-Final because it is already running')
    }
    this.isRunning = true

    this.logger.verbose('Starting TP-Final')
    await Promise.all([this.database.connect(), this.server.listen()])
    this.logger.verbose('TP-Final ready and awaiting requests')

    return { url: this.config.server.url }
  }

  async stop() {
    if (!this.isRunning) {
      throw new Error('Cannot stop TP-Final because it is already stopped')
    }
    this.isRunning = false

    this.logger.verbose('Stopping TP-Final')
    await Promise.all([this.database.disconnect(), this.server.close()])
    this.logger.verbose('TP-Final has closed all connections and successfully halted')
  }
}

module.exports = TpFinal
