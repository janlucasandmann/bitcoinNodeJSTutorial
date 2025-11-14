Bitcoin Node in JavaScript Tutorial
===================================

Overview
- This repository provides a hands-on walkthrough for building a Bitcoin node-like environment in JavaScript/Node.js. It focuses on teaching concepts such as P2P networking, block/transaction handling, and simple wallet interactions in a approachable, incremental way.

Repo Structure
- `src/` - Core implementation files for the simulated node, messaging, and chain state.
- `examples/` - Minimal runnable scripts that demonstrate usage and testing scenarios.
- `tests/` - Lightweight tests covering key behaviors.
- `docs/` - Explanations of concepts and a glossary used in the tutorial.
- `README.md` - Quickstart and high-level description of the project.
- `package.json` - Project metadata and npm scripts.
- `tutorial.md` - This file. It explains how the repo is organized and how to use it.

Getting Started
- Prerequisites: Node.js >= 18 (or as specified in `docs/requirements.md` if present).
- Install dependencies: `npm install` (or `pnpm install` if you prefer pnpm and it's in the repo).
- Run a simple node: `npm run build` (if a build step exists) followed by `npm run start` or `node dist/index.js` depending on the setup.
- Tests: `npm test`.

Key Concepts Covered
- Node.js event-driven architecture and a minimal event bus for internal modules.
- Lightweight networking example to simulate peers.
- Simple blockchain-ish data structures: blocks, transactions, and chain validation basics.
- Persistence via local JSON files or a tiny in-memory store (depending on the example).

Project Conventions
- Code is written in modern JavaScript/TypeScript (as present in the repo).
- Use `eslint`/`prettier` if configured; run linters with `npm run lint` if available.
- Tests are kept small and fast to encourage frequent execution during learning.

How to Contribute
- Read `docs/CONTRIBUTING.md` if present.
- Add examples that illustrate a new concept or clarify existing behavior.
- Run tests and lint locally before submitting changes.

Troubleshooting
- Ensure Node.js version matches the project's required range.
- If a script is missing, check `package.json` for available npm scripts or use `node` to run the corresponding file in `src/`.
- Common issues: network/firewall blocking simulated peers, or port conflicts.

License
- See `LICENSE` for license information.

This tutorial is a living guide. If you have improvements, consider updating `tutorial.md` to reflect changes in the repo.

