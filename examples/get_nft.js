const sampleTokens = [
  'adb0fbd80404c5fcb5495e676fb16f71dc290554787f9baf5b87aa3831a3259b',
  'c4095a2dfaadd52c25781ce289762f5a241d22c1fbddf61a573b03f4b6572f09'
]

const BCPEXT = require('../lib')

async function exampleGetNFT(tokens) {
  try {
    const bcpjs = new BCPEXT()
    // const allTokens = await bcpjs.NFT.getTokensInfo(tokens)
    // console.log(`all token: ${JSON.stringify(allTokens, null, 2)}`)
    const token = await bcpjs.NFT.getTokenInfo(tokens[0])
    console.log(`token: ${JSON.stringify(token, null, 2)}`)
  } catch (error) {
    console.error('error in exampleGetNFT(): ', error)
  }
}

exampleGetNFT(sampleTokens)
