**Bitcoin Node JS Tutorial**

This repository contains a small Node.js script (`btctr.js`) that demonstrates creating and
broadcasting a Bitcoin testnet transaction using `bitcore-lib` and the SoChain API.

Read the sections below to set up, run, and safely use the project.

**Prerequisites**

- Install Node.js (v12+ recommended) and `npm`.
- Internet access to call the SoChain API.
- Basic familiarity with Bitcoin testnet and private-key handling.

**Files**

- `btctr.js` — example script that builds and broadcasts a testnet transaction. See `btctr.js` for code.

**Setup**

1. From the repository root, install dependencies:

   - `npm install bitcore-lib axios`

2. Open `btctr.js` and review the example wallets near the top. The script includes two example testnet
   wallets (`walletA` and `walletB`). These are used for demonstration only — do not use real mainnet
   private keys in this script.

3. Fund the sender wallet (the `from` address) with testnet BTC. You can use a testnet faucet such as
   `https://coinfaucet.eu/en/btc-testnet/` or any other testnet faucet. The script expects enough funds
   to cover the amount you intend to send plus fees.

**How to run**

1. Edit `btctr.js` to set the `from` address, `to` address, `privateKey`, and `amount` you want to send.
   The example call at the bottom currently runs:

   - `sendBTC(fromAddress = walletA.addr, toAddress = walletB.addr, privateKey = walletA.privateKey, amount = 0.001)`

2. Run the script from the repository root:

   - `node btctr.js`

3. The script will:

   - Query SoChain for unspent outputs (UTXOs) for the `from` address.
   - Build and sign a transaction with `bitcore-lib`.
   - Broadcast the serialized transaction via SoChain's `send_tx` API.

4. If successful, the script will log the API response (transaction ID and related data).

**Important safety notes**

- NEVER put real mainnet private keys in source code. This script is for Bitcoin testnet only.
- Keep private keys secure — store them in environment variables or a secure keystore for any real use.
- Testnet faucets and public APIs may have rate limits. If you see errors, wait and retry.

**Customization & improvements**

- Move credentials out of the file: use environment variables (for example, `process.env.PRIVATE_KEY`).
- Add better error handling for network failures and insufficient funds.
- Use a different API provider (Blockstream, BlockCypher, etc.) or run your own Bitcoin testnet node.
- Adjust fee calculation — the script currently uses a simple per-byte fee estimate (`33 satoshi/byte`).

**Troubleshooting**

- "Insufficient funds": make sure the `from` address has enough testnet BTC to cover the `amount` plus fee.
- Network/API errors: check your internet connection and the SoChain API status; consider switching providers.
- Transaction not confirmed: testnet confirmations can be slower; wait or inspect the txid in a testnet block explorer.

**Where to look in the code**

- `btctr.js` — main logic (UTXO fetch, transaction build, fee calc, sign, broadcast). See the top for example wallets.

**Files referenced**

- `btctr.js` — repository root. See `btctr.js` for the full script. `btctr.js`

If you want, I can:

- Remove the example private keys and replace them with an environment-variable based example.
- Add a small wrapper CLI that accepts `from`, `to`, and `amount` as arguments.

***End of tutorial***

