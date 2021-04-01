const slpdbUri = 'https://slpdb.fountainhead.cash'
const bitdbUri = 'https://bitdb.fountainhead.cash'

const API = require('./api')
const Parser = require('./parser')

class BCPEXT {
  constructor(config = {}) {
    this.slpdb = config.slpdb || slpdbUri
    this.bitdb = config.bitdb || bitdbUri

    this.Parser = new Parser(config)
    this.API = new API({
      slpdb: `${this.slpdb}/q/`,
      bitdb: `${this.bitdb}/q/`,
      parser: this.Parser
    })
  }
}

module.exports = BCPEXT
