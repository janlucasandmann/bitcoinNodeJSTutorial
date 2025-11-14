# Bitcoin Node.js Testnet Tutorial (This Repo)

This repository contains a single example script, `btctr.js`, that constructs and broadcasts a Bitcoin Testnet transaction end‑to‑end using `bitcore-lib` for transaction building/signing and SoChain's public API for UTXO discovery and broadcasting. It’s a minimal, educational example to understand how a UTXO‑based wallet spends funds programmatically.

> Important: This demo targets Bitcoin Testnet only. Do not use it for mainnet funds. The included private keys are public and for demonstration; treat them as compromised and never send real BTC to them.

## Repo Contents

- `btctr.js` — sends a transaction from `walletA` to `walletB` on Bitcoin Testnet using:
  - `axios` to call SoChain APIs for UTXOs and broadcasting
  - `bitcore-lib` to build, sign, and serialize a P2PKH transaction

## What The Script Does

1. Defines two test wallets (addresses and WIF private keys) intended for Testnet.
2. Fetches unspent transaction outputs (UTXOs) for the sender address from SoChain.
3. Estimates transaction size and fee (using a simple bytes-per-input/output heuristic).
4. Builds a transaction with one recipient output and one change output back to the sender.
5. Signs the transaction locally with the sender’s private key.
6. Broadcasts the raw transaction hex to the Testnet network via SoChain.

## Prerequisites

- Node.js 18+ and npm
- Internet access (the script calls SoChain's public API)
- Testnet BTC in the sender wallet (`walletA.addr` in the file)

## Setup

```bash
# From the repo root
npm init -y
npm install bitcore-lib axios
```

Fund the sender (Testnet only). The script comment references a faucet:

- Coinfaucet (Testnet): https://coinfaucet.eu/en/btc-testnet/

Send a small amount (enough to cover the amount you want to send plus fee) to `walletA.addr` defined at the top of `btctr.js`.

## Run

```bash
node btctr.js
```

On success, SoChain returns a payload containing the transaction ID. You can paste that TXID into the SoChain Testnet explorer to monitor confirmations:

- https://sochain.com/tx/BTCTEST/<TXID>

## How It Works (Code Walkthrough)

- UTXO fetch: `GET https://sochain.com/api/v2/get_tx_unspent/BTCTEST/<address>`
  - The response is mapped into `bitcore-lib` UTXO objects: `satoshis`, `script`, `address`, `txid`, `outputIndex`.
- Transaction build:
  - `new bitcore.Transaction().from(inputs).to(toAddress, satoshiToSend).change(fromAddress)`
  - Fee is set with `.fee(fee)` and signature added with `.sign(privateKey)`.
- Fee estimate (simplified P2PKH):
  - Bytes ≈ `inputCount * 180 + outputCount * 34 + 10 - inputCount`
  - Fee ≈ `bytes * 33` sat/byte (fixed constant in this example)
- Broadcast: `POST https://sochain.com/api/v2/send_tx/BTCTEST` with `{ tx_hex: <serializedTransaction> }`.

Notes:
- This example uses legacy P2PKH script types and a static feerate; Testnet behavior and mempool conditions vary.
- If funds are insufficient after including fees, the script throws `Insufficient funds`.

## Safety & Operational Notes

- The private keys in `btctr.js` are public and must never hold value on mainnet. Generate your own test keys if you plan to experiment further.
- For production, never hardcode keys. Use secure storage (env vars, vault/KMS, hardware wallets) and consider PSBT flows.
- Prefer modern script types (P2WPKH/P2TR) for lower fees and better privacy; this requires library and address changes beyond this minimal demo.

## Troubleshooting

- Insufficient funds: Fund `walletA.addr` with more Testnet BTC to cover `amount + fee`.
- Low fee / mempool rejection: The fixed `33 sat/vB` may be too low (or too high). Consider fetching current feerates and adjusting.
- Reusing inputs: If you run the script repeatedly without new UTXOs, you may double‑spend unconfirmed inputs. Wait for confirmations or select different UTXOs.
- Network mismatch: Ensure the `network` variable is `BTCTEST` and that you are using Testnet addresses (typically starting with `m` or `n` for legacy P2PKH).

## Extending This Example (Ideas)

- Query dynamic feerates (e.g., mempool.space API) and set `.feePerKb()` or recompute based on current conditions.
- Select UTXOs more intelligently (e.g., smallest‑sufficient, avoid excessive change).
- Add retry/backoff and clearer error handling/logging for API failures.
- Support SegWit/Bech32 addresses and Taproot for modern script types.

## Bitcoin Market Cap (Today)

As of 2025‑11‑14 21:19:19 UTC, Bitcoin’s market capitalization is approximately $1.9 trillion USD. Because market cap fluctuates continuously with price and circulating supply, consult live trackers for the latest figure:

- CoinGecko (BTC page and charts) — typically shows around ~$1.91T at this timestamp: https://www.coingecko.com/ and https://www.coingecko.com/en/charts
- CoinMarketCap (BTC page) — around ~$1.88T at this timestamp: https://coinmarketcap.com/currencies/bitcoin/
- Yahoo Finance crypto listings — around ~$1.92T at this timestamp: https://finance.yahoo.com/crypto/

These minor differences reflect data sources, update frequencies, and circulating supply methodologies.

---

If you want, I can refactor `btctr.js` to read keys/amount from environment variables, fetch live feerates, and print a link to the broadcast TX automatically.

