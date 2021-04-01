# BlockChain Payloads (BCP) Extension Library

BCPs are immutable pointers to digital data, saved on the BCH blockchain.
This library is extending the [basic BCP library](https://github.com/zh/bcp-js)
with different classes, as:
 - `Parser` class - wrapper around `bcp.js`, adding some transaction parsing
     methods etc.
 - `API` class for access to SLPDB and BITDB for BCP or NFT tokens info

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
const bcp = new BCPEXT()
```

You can see more usage examples in the [examples directory](examples/).

## Donations

Every amount of BCH will help the future development

* BCH: `bitcoincash:qq3t709lskk7tpg5nl8xdfvu8rx4v66ys5cwlxw3ac`

![BCH address](https://gateway.pinata.cloud/ipfs/QmPz1Knaxj5UhJ4jrQjpr6LK9uA5em26NVmC2eX7W4D29D)
