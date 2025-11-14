# Bitcoin Node JS Tutorial

This repository contains a simple Node.js script (`btctr.js`) that demonstrates how to create and broadcast a Bitcoin Testnet transaction using `bitcore-lib` and the Sochain API.

## Quick facts (market cap)

- As of **November 14, 2025**, Bitcoin's market capitalization was approximately **$1.94T — $1.95T**, depending on the data provider (CoinGecko reports about $1.935T; CoinCodex reports about $1.95T). Sources were checked on November 14, 2025.

## Prerequisites

- Install Node.js (v14+ recommended).
- Git (optional) to clone the repo.

## Install and run

1. Install dependencies in this repository directory:

```bash
npm init -y
npm install bitcore-lib axios
```

2. Run the script:

```bash
node btctr.js
```

The script will attempt to create and broadcast a transaction from `walletA` to `walletB` (see `btctr.js` for hard-coded test wallets). It uses the Sochain testnet API to fetch UTXOs and to broadcast the signed transaction.

## How the script works

- `walletA` and `walletB` objects are defined in `btctr.js` with testnet addresses and private keys.
- The `sendBTC` function fetches unspent outputs from Sochain, assembles a transaction with `bitcore-lib`, signs it with the provided private key, and broadcasts it.
- The script is configured to use the testnet network (`BTCTEST`) as shown in `btctr.js`.

## Customization

- To change sender/receiver or amount, edit the call at the bottom of `btctr.js`:

```js
sendBTC(fromAddress = walletA.addr, toAddress = walletB.addr, privateKey = walletA.privateKey, amount = 0.001)
```

- If you want to use your own wallets, replace the `walletA` / `walletB` objects. DO NOT paste mainnet private keys into example/test scripts.

## Funding testnet wallets

- To test sending transaction funds, use a Bitcoin Testnet faucet such as `https://coinfaucet.eu/en/btc-testnet/` (or other testnet faucets) to send a small amount of testnet BTC to your sender address.

## Warnings and best practices

- Never use private keys from this example on mainnet. These example keys are for educational/testnet use only.
- Monitor API rate limits for Sochain; for production or heavy testing use a reliable node or service.
- Always verify transaction IDs and balances before broadcasting.

## Sources

- CoinGecko (checked Nov 14, 2025) — Bitcoin market cap reported around $1.935T.
- CoinCodex (checked Nov 14, 2025) — Bitcoin market cap reported around $1.95T.

If you want, I can update this file to include exact links to the sources or add a small example that reads wallet info from environment variables instead of hard-coding private keys.

