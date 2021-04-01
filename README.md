# BlockChain Payloads (BCP) Extension Library

BCPs are immutable pointers to digital data, saved on the BCH blockchain.
This library is extending the [basic BCP library](https://github.com/zh/bcp-js)
with different classes, as:
 - `Parser` class - wrapper around `bcp.js`, adding some transaction parsing
     methods etc.
 - `API` class for access to SLPDB and BITDB for BCP or NFT tokens info
 - `NFT` - getting information for NFT tokens with attached BCP

## Used libraries and services

* [bignumber.js](https://mikemcl.github.io/bignumber.js/) - A JavaScript library for arbitrary-precision arithmetic
* [axios](https://github.com/axios/axios) - Promise based HTTP client for the browser and node.js
* [bcp.js](https://github.com/zh/bcp-js) - Basic BCP protocol and JS library

## Installation

* for *node.js*

```sh
npm install bcp-ext-js
```

* for browser

```html
<script src="https://unpkg.com/bcp-ext-js"></script>
```

for a specific version:

```html
<script src="https://unpkg.com/bcp-ext-js@1.0.1/dist/bcp-ext.min.js"></script>
```

## Development

The easiest way is to download the library sources from the GitHub repository and rebuild them for your project:

```sh
git clone https://github.com/zh/bcp-ext-js.git
cd bcp-ext-js
npm install
npm run build
```

## Testing

TODO

```sh
npm test
```

## Usage

### Library instantiation

```js
const BCPEXT = require('bcp-ext-js')
const bcpjs = new BCPEXT()
```

### Get BCP from Transaction ID

```js
const txid = 'bddb26bb00ef94a8a43361622dd3c4743386b9da01d702ed921fdf9bd4be4860'
const bcp = await bcpjs.API.getBCP(txid)
console.log(`bcp: ${JSON.stringify(bcp, null, 2)}`)
console.log(`type: ${bcpjs.Parser.typeStr(bcp)}`)
console.log(`source: ${bcpjs.Parser.dataStr(bcp)}`)

...
type: audio
source: QmZmqLskJmghru919cvU4qSy3L5vc1S2JdzsUXrM17ZqT9
```

### Get info for NFT token with attached BCP

```js
const tokenId = 'adb0fbd80404c5fcb5495e676fb16f71dc290554787f9baf5b87aa3831a3259b'
const token = await bcpjs.NFT.getTokenInfo(tokenId)

console.log(`token: ${JSON.stringify(token, null, 2)}`)

...
token: {
  "id": "adb0fbd80404c5fcb5495e676fb16f71dc290554787f9baf5b87aa3831a3259b",
  "type": 65,
  "name": "Audio NFT",
  "symbol": "BCP.AUDIO.RAIN",
  ...
  "bcp": {
    "id": "bddb26bb00ef94a8a43361622dd3c4743386b9da01d702ed921fdf9bd4be4860",
    "type": "audio",
    "source": "QmZmqLskJmghru919cvU4qSy3L5vc1S2JdzsUXrM17ZqT9",
    "ipfs": true
  }
...
```

You can see more usage examples in the [examples directory](examples/).

## Donations

Every amount of BCH will help the future development

* BCH: `bitcoincash:qq3t709lskk7tpg5nl8xdfvu8rx4v66ys5cwlxw3ac`

![BCH address](https://gateway.pinata.cloud/ipfs/QmPz1Knaxj5UhJ4jrQjpr6LK9uA5em26NVmC2eX7W4D29D)
