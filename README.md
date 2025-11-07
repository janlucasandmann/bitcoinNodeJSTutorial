# Transacting on Bitcoin Testnet with `btctr.js`

This repo contains a small Node.js script that sends bitcoin on the Bitcoin **testnet** using two wallets and the [bitcore-lib](https://github.com/bitpay/bitcore) library. The guide below walks you through configuring your own wallets, funding them, and broadcasting a transaction end-to-end.

> ⚠️ Everything here is for testnet only. Never expose or reuse mainnet private keys in sample code.

## 1. Prerequisites

- Node.js (v16+) and npm installed. Check with `node -v` and `npm -v`.
- Basic familiarity with the Bitcoin transaction model (UTXOs, inputs, outputs).
- A Bitcoin testnet wallet generator such as [https://bip32.org](https://bip32.org) or your preferred wallet tooling.
- Internet access to reach the [sochain.com](https://sochain.com) testnet API that the script uses.

## 2. Install dependencies

Clone or download this repository, then install the required packages in the project directory:

```bash
npm install bitcore-lib axios
```

This creates `node_modules/` and the `package-lock.json` that Node needs to run the script.

## 3. Prepare your testnet wallets

1. Visit [https://bip32.org](https://bip32.org) (or another deterministic wallet tool).
2. Switch the network to **Bitcoin Testnet**.
3. Generate at least two addresses along with their corresponding WIF-formatted private keys.
4. Copy those credentials into `btctr.js` by updating the `walletA` and `walletB` objects:

```javascript
let walletA = {
    addr: "your_sender_testnet_address",
    privateKey: "its_matching_testnet_wif_private_key"
}

let walletB = {
    addr: "your_receiver_testnet_address",
    privateKey: "optional_private_key_if_you_want_control"
}
```

> **Private keys are sensitive.** Never commit them to version control or reuse them outside this experiment.

## 4. Fund the sender wallet

Before broadcasting a transaction, the sender must own spendable testnet UTXOs.

1. Use a faucet such as [https://coinfaucet.eu/en/btc-testnet/](https://coinfaucet.eu/en/btc-testnet/) or [https://testnet-faucet.mempool.co/](https://testnet-faucet.mempool.co/).
2. Request coins to `walletA.addr`.
3. Wait for at least one confirmation (usually 1–2 minutes). You can confirm the UTXOs at:

```
https://sochain.com/address/BTCTEST/<walletA.addr>
```

## 5. Understand the script flow

- `axios` fetches unspent outputs (`/get_tx_unspent`) for `fromAddress` from the sochain API.
- Each UTXO becomes a transaction input for a new `bitcore.Transaction`.
- The script calculates a fee estimate (`33 sat/B`), sets the recipient output, and returns any change to the sender address.
- After signing with the sender's private key, the raw transaction is sent via the sochain `/send_tx` endpoint.

Review the comments in `btctr.js` if you want to customize fee selection or consolidate UTXOs.

## 6. Run the transaction

Use Node to execute the script once your sender wallet is funded:

```bash
node btctr.js
```

If the API call succeeds, the script logs the response payload from sochain, which includes the broadcast transaction ID (`txid`).

## 7. Verify on the blockchain

Open the transaction in a block explorer to monitor confirmations:

```
https://sochain.com/tx/BTCTEST/<broadcast_txid>
```

You should see one output to the recipient (`walletB.addr`) and a change output back to the sender.

## 8. Customizing amounts and fees

- The script currently sends `0.001` tBTC (100,000 satoshis). Change the `amount` value in the `sendBTC` call to send a different amount, keeping enough headroom for miner fees.
- Adjust the `fee` calculation if the mempool is congested. For example, you can set a higher satoshi-per-byte multiplier or integrate fee estimators.
- Add lightweight error handling by wrapping API calls and transaction creation in `try/catch` blocks if you plan to expand the script.

## 9. Troubleshooting tips

- **"Insufficient funds"**: Ensure the faucet transaction has at least one confirmation and that the amount covers both the send value and the fee.
- **Network request failures**: Confirm that sochain is reachable and retry later; consider adding exponential backoff for production-grade tooling.
- **Invalid private key / signature**: Double-check that the WIF corresponds to the address used for `walletA`.
- **Multiple runs**: After the first run, new UTXOs appear at the change address. You can continue spending them because `walletA` is set to send change back to itself.

## 10. Next steps

- Swap in a more full-featured wallet library or connect directly to your own Bitcoin Core node for higher reliability.
- Port the logic to a backend service that monitors mempool status and retries broadcasts with adjusted fees.
- Add automated tests for UTXO selection and fee calculation to prevent regressions as you enhance the script.

Happy hacking on the Bitcoin testnet!
