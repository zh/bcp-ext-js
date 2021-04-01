const ipfsPrefix = 'https://ipfs.io/ipfs/'

const {
  BCP,
  BCP_SRC_URL,
  BCP_SRC_IPFS,
  BCP_SRC_TXID,
  BCP_SRC_ADDR,
  BCP_TYPE_AUDIO,
  BCP_TYPE_VIDEO,
  BCP_TYPE_TEXT
} = require('bcp-js')

class Parser {
  constructor(config) {
    this.bcp = new BCP()
    this.ipfs = config.ipfs || ipfsPrefix
  }

  fromTx(tx) {
    try {
      if (!tx) return null
      const obj = this.bcp.create(
        parseInt(tx.h2, 10),
        parseInt(tx.h3, 10),
        Buffer.from(tx.h4, 'hex')
      )
      if (!obj) return null
      return this.bcp.parse(obj)
    } catch (error) {
      console.error('error in fromTx(): ', error)
      return null
    }
  }

  dataStr(bcp, withPrefix = false) {
    if (!bcp || !bcp.data) return ''
    if (bcp.source === BCP_SRC_TXID) return bcp.data.tokenId.toString()
    if (bcp.source === BCP_SRC_URL) return bcp.data.url.toString()
    if (bcp.source === BCP_SRC_IPFS)
      return `${withPrefix ? this.ipfs : ''}${bcp.data.hash.toString()}`
    // convert legacy, slp etc.?
    if (bcp.source === BCP_SRC_ADDR) return bcp.data.address.toString()
    return bcp.data.toString()
  }

  typeStr(bcp) {
    if (!bcp || !bcp.type) return ''
    if (bcp.type === BCP_TYPE_TEXT) return 'text'
    if (bcp.type === BCP_TYPE_AUDIO) return 'audio'
    if (bcp.type === BCP_TYPE_VIDEO) return 'video'
    return 'image'
  }

  onIPFS(bcp) {
    return bcp.source === BCP_SRC_IPFS
  }
}

module.exports = Parser
