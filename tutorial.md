# Bitcoin Node JS Tutorial

This repository contains a small Node.js script (`btctr.js`) that demonstrates a basic workflow for sending a testnet Bitcoin transaction using the Bitcore library and the SoChain API.

Table of contents:
- [Overview](#overview)
- [Prerequisites](#prerequisites)
- [Setup](#setup)
- [Quick Start](#quick-start)
- [How It Works](#how-it-works)
- [Configuration](#configuration)
- [Extending](#extending)
- [Troubleshooting](#troubleshooting)
- [Security](#security)
- [References](#references)

## Overview

The script creates and broadcasts a basic Bitcoin (testnet) transaction. It fetches unspent outputs via SoChain, builds a transaction with Bitcore, signs it, and broadcasts the result.

This is a learning/demo tool, not production-ready. Do not store real keys here.

## Prerequisites

- Node.js v12+ (LTS recommended)
- npm (comes with Node.js) or yarn
- Basic familiarity with Bitcoin testnet and public testnet faucets

## Setup

1. Ensure you’re in the repository root (where `btctr.js` lives).
2. Install dependencies:
   ```bash
   npm install
   ```

If you prefer yarn:
   ```bash
   yarn install
   ```

## Quick Start

1. Open `btctr.js` and review the wallet definitions:
   ```js
let walletA = {
    addr: "mzSPa2N1rqNeFpivoszw7ejb1oagc35pYJ",
    privateKey: "cNESzuThJn24iYUziZeMxkbey1hhpKgy64x9wvsJMvTvcGzWJRNh"
}

let walletB = {
    addr: "mjSLAYMgvwQr8ctXkuEuHckp92wcNhjA9f",
    privateKey: "cSaoKeJv2g2C6yJckZQepP8PRxzjzcHfx9KV6EPSKh3Eps9ycALX"
}
```
2. Run the script:
   ```bash
   node btctr.js
   ```

3. The script will attempt to send a small amount (default 0.001 BTC) from walletA to walletB on BTCTEST. If you want to change the recipient or amount, edit the variables in the script.

## How It Works

- Uses SoChain API to fetch unspent outputs for the sender address on BTCTEST.
- Builds a transaction with `bitcore-lib` using those UTXOs.
- Signs the transaction with the sender’s private key (in the script for demo purposes).
- Broadcasts the serialized transaction via SoChain.

Note: This flow is for educational purposes only. In production, you’d manage keys securely, use a robust UTXO selection strategy, proper fee estimation, and error handling.

## Configuration

- Wallets: `walletA` and `walletB` near the top of `btctr.js` define addresses and private keys.
- Network: The script targets BTCTEST; you can adjust to `BTC` mainnet if you implement a proper mainnet flow.
- Amount: Change the `amount` parameter in the `sendBTC(...)` call to adjust the transfer amount (in BTC).

## Extending

- Improve error handling around API calls and transaction broadcasting.
- Implement dynamic fee estimation based on current network conditions.
- Replace hard-coded wallets with environment variables or a secure vault.
- Add unit tests around helper functions (UTXO parsing, transaction assembly).

## Troubleshooting

- API errors from SoChain: check network connectivity and API status; consider retry logic.
- Insufficient funds: ensure UTXOs cover amount + fee.
- Invalid private key or address formats: verify WIF/private keys correspond to the intended addresses.

## Security

- Do not commit real private keys to version control.
- For demonstrations, prefer testnet keys and faucet-funded addresses.
- Consider using environment variables or a secrets manager for keys in any extended version.

## References

- Bitcore library: https://github.com/bitpay/bitcore-lib
- SoChain API: https://sochain.com/ (BTCTEST endpoints)

---

Happy exploring! If you want, I can tailor this tutorial further to match your exact workflow or expand with a more robust testnet workflow.

