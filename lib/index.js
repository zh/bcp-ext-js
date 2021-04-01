const Parser = require('./parser')
const API = require('./api')
const NFT = require('./nft')

class BCPEXT {
  constructor(config = {}) {
    this.Parser = new Parser(config)
    const tmpConfig = {
      parser: this.Parser
    }
    this.API = new API(tmpConfig)
    tmpConfig.api = this.API
    this.NFT = new NFT(tmpConfig)
  }
}

module.exports = BCPEXT
