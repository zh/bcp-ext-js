const address = 'qp7elhhm6atehxk4l6d6g9akcgg7z22y6ykt7sxf06'

const BCPEXT = require('../lib')

async function exampleGetAllBCP(address) {
  try {
    const bcpjs = new BCPEXT()
    const allBCP = await bcpjs.API.getAllBCP(address)
    // console.log(`bcp: ${JSON.stringify(bcp, null, 2)}`)
    allBCP.forEach(function(bcp) {
      console.log(`type: ${bcpjs.Parser.typeStr(bcp)}`)
      console.log(`source: ${bcpjs.Parser.dataStr(bcp)}`)
    })
  } catch (error) {
    console.error('error in exampleGetAllBCP(): ', error)
  }
}

exampleGetAllBCP(address)
