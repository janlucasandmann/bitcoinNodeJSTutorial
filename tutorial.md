# Bitcoin Testnet Transaction Tutorial

This repository contains a minimal Node.js script (`btctr.js`) that constructs and broadcasts a Bitcoin Testnet transaction using `bitcore-lib` and the public SoChain API. It is intended for learning and experimentation on Bitcoin Testnet — not for mainnet funds.

> Important: Never use real/mainnet private keys with this code. Testnet coins are valueless and for testing only.

## What You’ll Do
- Install dependencies for Node.js.
- Fund a testnet wallet via a faucet.
- Configure the sender/receiver addresses and private key.
- Run the script to send testnet BTC.
- Verify the transaction on a block explorer.

## Prerequisites
- Node.js 16+ and npm installed (`node -v`, `npm -v`).
- Internet access (the script calls SoChain’s public API).

## Project Files
- `btctr.js` — single-file script that:
  - Fetches UTXOs for the sender address from SoChain.
  - Builds and signs a transaction with `bitcore-lib`.
  - Broadcasts the raw transaction via SoChain.

## Quick Start

1) Initialize a project (once per clone)

```bash
npm init -y
npm install bitcore-lib axios
```

2) Open `btctr.js` and review the demo wallets

The file includes two sample Testnet wallets:

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

- Treat these as placeholders for learning. Replace them with your own Testnet address/key pair before real use.
- Keys are in Testnet WIF format (typically start with `c...`).

3) Generate your own Testnet keys (recommended)

- You can use tools like https://bip32.org/ (switch to Testnet) or a local Bitcoin library/wallet to generate a Testnet address and WIF private key.
- Replace `walletA` with your sender (funded) address and private key, and `walletB` with a recipient address you control.

4) Fund the sender with Testnet BTC

- Use a faucet, e.g. https://coinfaucet.eu/en/btc-testnet/ to send coins to your sender address (`walletA.addr`).
- Wait for the faucet transaction to confirm (1–2 blocks is usually enough). You can check status on SoChain:
  - Address page: https://sochain.com/address/BTCTEST/YOUR_TESTNET_ADDRESS

5) Run the script

```bash
node btctr.js
```

- By default it attempts to send `0.001` tBTC from `walletA` to `walletB`.
- Successful broadcast prints the SoChain response with the transaction ID (txid).

6) Verify the transaction

- Open the txid on a Testnet explorer, e.g. SoChain:
  - https://sochain.com/tx/BTCTEST/YOUR_TXID
- You should see the output to `walletB.addr` and a change output back to `walletA.addr`.

## How It Works (High-Level)

1) Fetch UTXOs
- The script calls `GET https://sochain.com/api/v2/get_tx_unspent/BTCTEST/{fromAddress}` to collect spendable outputs.

2) Build the transaction
- It sums available satoshis, estimates a fee (approx. 33 sat/vB), and creates a transaction with one recipient output and one change output back to the sender.

3) Sign and serialize
- Using `bitcore-lib`, it signs inputs with the provided WIF private key and serializes the transaction to hex.

4) Broadcast
- It `POST`s the raw tx hex to `https://sochain.com/api/v2/send_tx/BTCTEST`.

## Customizing Amounts and Addresses

- Edit the last line of `btctr.js` to change parameters:

```js
sendBTC(
  fromAddress = walletA.addr,
  toAddress   = walletB.addr,
  privateKey  = walletA.privateKey,
  amount      = 0.001 // BTC (testnet)
)
```

- You can also replace `walletA`/`walletB` definitions with your own values near the top of the file.

## Fee Notes

- Fee is estimated as `transactionSizeBytes * 33` satoshis (simple static rate). If the network or API behavior changes, adjust the rate to improve reliability.
- If you see `Insufficient funds`, either reduce `amount` or fund the sender with more tBTC.

## Troubleshooting

- "Insufficient funds":
  - Confirm your sender address has enough confirmed UTXOs to cover `amount + fee`.
  - Lower `amount` or wait for faucet confirmations.

- "Network" or API errors from SoChain:
  - Retry after a minute; public APIs can rate-limit.
  - Verify that `BTCTEST` is correct and your addresses are Testnet addresses.

- Transaction not appearing on the explorer:
  - Ensure the POST succeeded (look for a txid in the console output).
  - Check a second explorer to rule out propagation delays.

## Security and Safety

- Do not commit or share real private keys. This script is for Testnet only.
- Anyone with the WIF private key can spend funds from that address.
- Consider moving secrets into environment variables or a `.env` file in a real project. This tutorial keeps things simple for learning.

## Optional: Run With Your Own Params (No Edits)

You can temporarily override variables by running Node with small inline changes using environment variables and a wrapper, but the simplest path in this repo is to edit `btctr.js`. For production-like usage, consider refactoring `btctr.js` to read from environment variables or CLI flags.

## Next Steps

- Add CLI parsing (e.g., `yargs`) to pass `--from`, `--to`, and `--amount`.
- Switch to a dynamic fee estimator or a different broadcast provider.
- Add basic unit tests for transaction assembly.

---

Happy testing on Bitcoin Testnet!
