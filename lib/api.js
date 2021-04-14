const slpdbUri = 'https://slpdb.fountainhead.cash/q/'
const bitdbUri = 'https://bitdb.fountainhead.cash/q/'

const axios = require('axios')

const btoa = function (str) {
  return Buffer.from(str).toString('base64')
}

class API {
  constructor(config) {
    this.slpdb = config.slpdb || slpdbUri
    this.bitdb = config.bitdb || bitdbUri
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

  async getAllBCP(address) {
    try {
      // TODO: address verify/convert -> qq.... only
      const query = {
        v: 3,
        q: {
          find: {
            'in.e.a': address,
            'out.b0': { op: 106 },
            'out.h1': '42435000'
          },
          project: { 'out.$': 1 }
        }
      }
      const result = await this.queryBitDB(query)
      if (!result || !result.c || result.c.length === 0) return null
      const _this = this
      const allBCP = Promise.all(
        result.c.map(async function (tx) {
          // console.log(`tx: ${JSON.stringify(tx.out[0].str, null, 2)}`)
          return _this.parser.fromTx(tx.out[0])
        })
      )
      return allBCP
    } catch (error) {
      console.error('error in getAllBCP(): ', error)
    }

  }
}

module.exports = API
