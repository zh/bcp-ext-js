const axios = require('axios')

const btoa = function (str) {
  return Buffer.from(str).toString('base64')
}

class API {
  constructor(config) {
    this.slpdb = config.slpdb
    this.bitdb = config.bitdb
    this.parser = config.parser
  }

  async queryDB(uri, q) {
    const b64 = btoa(JSON.stringify(q))
    const url = uri + b64
    const options = {
      method: 'GET',
      headers: {
        'content-type': 'application/json'
      },
      url
    }
    const result = await axios(options)
    return result.data ? result.data : null
  }

  async querySlpDB(q) {
    return this.queryDB(this.slpdb, q)
  }

  async queryBitDB(q) {
    return this.queryDB(this.bitdb, q)
  }

  async getBCP(txid) {
    try {
      const query = {
        v: 3,
        q: {
          find: {
            'tx.h': txid,
            $text: { $search: 'BCP' }
          }
        }
      }
      const result = await this.queryBitDB(query)
      if (!result || !result.c || result.c.length === 0) return null
      return this.parser.fromTx(result.c[0].out[0])
    } catch (error) {
      console.error('error in getBCP(): ', error)
    }
  }
}

module.exports = API
