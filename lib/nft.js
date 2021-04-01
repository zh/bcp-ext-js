function info2obj(info) {
  const details = info.tokenDetails
  const { tokenIdHex: id, versionType: type, name, symbol } = details
  const quantity = type === 129 ? details.genesisOrMintQuantity : '1'
  const obj = { id, type, name, symbol, quantity }
  if (type === 65) obj.parent = info.nftParentId
  if (details.documentUri) obj.uri = details.documentUri
  if (details.documentSha256) obj.hash = details.documentSha256
  return obj
}

class NFT {
  constructor(config) {
    this.parser = config.parser
    this.api = config.api
  }

  // txids = [txid1, txid2, ...]
  async getTokensInfo(txids) {
    try {
      const query = {
        v: 3,
        q: {
          db: ['t'],
          find: {
            'tokenDetails.tokenIdHex': {
              $in: txids
            }
          },
          limit: txids.length
        }
      }
      const result = await this.api.querySlpDB(query)
      if (!result || !result.t || result.t.length === 0) return []
      return result.t
    } catch (error) {
      console.error('error in getTokensInfo(): ', error)
    }
  }

  async getTokenInfo(txid, withPrefix = false) {
    try {
      const query = {
        v: 3,
        q: {
          db: ['t'],
          find: {
            'tokenDetails.tokenIdHex': txid
          },
          limit: 1
        }
      }
      const result = await this.api.querySlpDB(query)
      if (!result || !result.t || result.t.length === 0) return []
      const details = info2obj(result.t[0])
      if (details.type === 65) {
        details.containsBCP = false
        const bcp = await this.hasBCP(details)
        if (bcp) {
          details.containsBCP = true
          details.bcp = {
            id: details.uri,
            type: this.parser.typeStr(bcp),
            source: this.parser.dataStr(bcp, withPrefix),
            ipfs: this.parser.onIPFS(bcp)
          }
        }
        details.parent = await this.getTokenInfo(details.parent)
      }
      return details
    } catch (error) {
      console.error('error in getTokensInfo(): ', error)
    }
  }

  async hasBCP(token) {
    if (!token || !token.symbol || !token.uri) return null
    if (token.type !== 65 || !token.symbol.startsWith('BCP.')) return null
    return this.api.getBCP(token.uri)
  }

  onIPFS(token) {
    return (
      token &&
      token.uri &&
      (token.uri.startsWith('Qm') || token.uri.startsWith('ipfs://'))
    )
  }
}

module.exports = NFT
