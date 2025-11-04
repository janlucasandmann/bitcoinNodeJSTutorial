# Bitcoin Overview

Bitcoin is a peer-to-peer digital cash system that lets people transfer value over the internet without relying on a central authority such as a bank or government. It was introduced in 2008 by the pseudonymous creator Satoshi Nakamoto and launched in 2009 when the first software client and reference implementation went live.

## Key Characteristics

- **Decentralization**: The network is maintained by thousands of nodes distributed worldwide. No single entity can unilaterally control the ledger or mint new coins.
- **Limited Supply**: The protocol caps the total number of bitcoins at 21 million, with new coins issued as rewards to miners who secure the network. This predictable issuance schedule is designed to mimic scarcity similar to precious metals.
- **Public Ledger**: Transactions are recorded on a public blockchain—an append-only ledger where each block references the previous one, making the history tamper-evident.
- **Consensus via Proof-of-Work**: Miners expend computational effort to solve cryptographic puzzles. The first to solve each puzzle proposes the next block, and the difficulty adjusts to target a new block roughly every 10 minutes.
- **Native Digital Asset**: Bitcoin (BTC) is the unit of account on the network and can be divided down to 0.00000001 BTC (a satoshi). Ownership is represented by cryptographic keys, and transfers are authorized with digital signatures.

## How It Works

When someone sends bitcoin, they create a transaction that specifies the amount and the recipient’s address derived from their public key. Nodes broadcast and validate this transaction, ensuring the sender has sufficient balance and the transaction follows protocol rules. Miners gather valid transactions into blocks, compete to solve the proof-of-work puzzle, and propagate the winning block. Once a block is accepted by the network, its transactions become part of the canonical history, and the recipient can spend the funds in subsequent transactions.

## Use Cases and Considerations

- **Digital Money**: Bitcoin enables borderless payments that can settle within minutes, even across different jurisdictions, without needing intermediaries to clear the transaction.
- **Store of Value**: Many users treat bitcoin as “digital gold,” valuing its predictable supply and resistance to censorship or seizure when private keys are securely managed.
- **Programmable Platform**: Although Bitcoin’s scripting language is limited compared to general-purpose smart contract platforms, it supports multi-signature wallets, timelocks, and other conditional transfers.
- **Volatility and Risk**: Bitcoin’s market price can be extremely volatile, and securing private keys is the user’s responsibility. If keys are lost or stolen, the associated coins are effectively irretrievable.

In essence, Bitcoin combines cryptography, distributed networking, and economic incentives to create a decentralized system for transferring and storing value without trusted intermediaries.
