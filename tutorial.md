# Bitcoin Testnet Transfer Tutorial

## 1. Bitcoin in a Nutshell

Bitcoin is a decentralized digital currency secured by a peer-to-peer network. Instead of a central authority, transactions are grouped into blocks and validated by miners, creating an immutable ledger (the blockchain). Ownership of coins is expressed through private keys: anyone with the private key for an address can authorize spending the coins assigned to that address.

Because real bitcoins are scarce and valuable, developers usually experiment on **test networks**. Bitcoin Testnet mimics mainnet rules but uses tokens with no monetary value, so you can practice freely.

## 2. What This Repo Does

`btctr.js` demonstrates how to send Bitcoin Testnet (BTC) using Node.js:
- It loads `bitcore-lib` to build and sign transactions.
- It uses `axios` to talk to [SoChain](https://sochain.com) for unspent outputs (UTXOs) and to broadcast the signed transaction.
- Two wallets (`walletA` and `walletB`) are prefilled with sample addresses/keys, but you should replace them with your own testnet wallets.

You can run the script end-to-end to push a real Testnet transaction.

## 3. Prerequisites

1. **Node.js** (v14+) and `npm`.
2. Install dependencies in this folder:
   ```bash
   npm install bitcore-lib axios
   ```
3. Two Bitcoin Testnet wallets. You can generate them at [bip32.org](http://bip32.org):
   - Select `Testnet`.
   - Record each address and its corresponding WIF private key safely.
4. Fund your sender wallet with Testnet BTC from a faucet such as [coinfaucet.eu](https://coinfaucet.eu/en/btc-testnet/).

## 4. Configure the Script

Open `btctr.js` and update the wallet objects:

```js
let walletA = {
    addr: "YOUR_TESTNET_SENDER_ADDRESS",
    privateKey: "WIF_PRIVATE_KEY_FOR_SENDER"
}

let walletB = {
    addr: "YOUR_TESTNET_RECIPIENT_ADDRESS",
    privateKey: "WIF_PRIVATE_KEY_FOR_RECIPIENT"
}
```

- `walletA` is the sender. Only its private key is required to sign the transaction.
- `walletB` receives the coins. Its private key is not used in this demo but keep it securely anyway.
- Adjust the `amount` argument in the final `sendBTC` call (value in BTC). Stay below your funded balance minus fees (the script estimates fees automatically at 33 sat/byte).

## 5. Run a Transaction

Execute the script:

```bash
node btctr.js
```

What happens:
1. The script asks SoChain for all UTXOs tied to `walletA.addr`.
2. It assembles a transaction paying `amount` BTC to `walletB.addr`, with change sent back to `walletA.addr`.
3. `bitcore-lib` signs the transaction with `walletA.privateKey`.
4. The signed transaction is broadcast through SoChain. A successful response looks like:
   ```json
   {
     "network": "BTCTEST",
     "txid": "YOUR_TRANSACTION_ID"
   }
   ```
   The `txid` uniquely identifies your transfer.

## 6. Verify on a Block Explorer

Use the returned `txid` on [SoChain Testnet explorer](https://sochain.com/btc-testnet/) or any Bitcoin testnet explorer to confirm:
- The transaction status (unconfirmed/confirmed).
- The input UTXOs from your sender address.
- The output to the recipient address and any change output.

Confirmations arrive as miners include the transaction in new blocks. Testnet confirmations usually appear within a few minutes.

## 7. Experiment Further

- Switch `walletB` to another address to test sending to yourself or friends.
- Adjust the fee rate by changing the `fee` calculation in `sendBTC`.
- Extend the script to create multi-recipient transactions or to print more diagnostic logging.

Remember, **never** use real mainnet private keys in this script; keep it strictly for testnet experimentation.
