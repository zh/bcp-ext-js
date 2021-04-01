const sampleTx = 'bddb26bb00ef94a8a43361622dd3c4743386b9da01d702ed921fdf9bd4be4860'

const BCPEXT = require('../lib')

async function exampleGetBCP (txid) {
  try {
    const bcpjs = new BCPEXT()
    const bcp = await bcpjs.API.getBCP(txid)
    // console.log(`bcp: ${JSON.stringify(bcp, null, 2)}`)
    console.log(`type: ${bcpjs.Parser.typeStr(bcp)}`)
    console.log(`source: ${bcpjs.Parser.dataStr(bcp)}`)
  } catch (error) {
    console.error('error in exampleGetBCP(): ', error)
  }
}

exampleGetBCP(sampleTx)
