
# 🤝 Wagmi Circle

<p align="center">
  <a href="#description"><strong>Introduction</strong></a> ·
  <a href="#tech-stack"><strong>Tech Stack</strong></a>
</p>
<br/>

<div align="center">
    <img src="https://github.com/aeither/wagmicircle/assets/36173828/ddd07e72-bc51-461c-a4c5-e4db35f3cbf0" alt="Logo" >

  <h3 align="center">Connect to learn and earn together.</h3>

</div>

## DEMO

Website: https://wagmicircle.vercel.app/

## Description

Wagmi Circle is a socialfi platform that allows users to discover and share knowledge, send and receive tips, and access cross-chain transaction history. With Wagmi Circle, users can connect with like-minded individuals, learn from a community of experts, and earn rewards for their contributions.

## Problem

1.	Lack of a social platform for sharing knowledge and learning from others in the crypto community.
2.	Limited options for earning rewards for contributions to the community.
3.	Difficulty in accessing cross-chain transaction history in a centralized and user-friendly manner.

## Solution:

1.	A social platform that allows users to acquire knowledge, read news, and access 
2.	Easily check cross-chain transaction history.
4.	A social onboarding wallet that allow sign up with Web2 experience.

### Cross-chain transaction checker

```tsx
    const [bscResponse, goerliResponse, ethResponse] = await Promise.all([
      fetch(BSC_TESTNET_URL, bscOptions),
      fetch(ETH_GOERLI_URL, ethOptions),
      fetch(ETH_MAINNET_URL, ethOptions),
    ]);

    const bscResult =
      (await bscResponse.json()) as GetTransactionByHashResponse;
    const goerliResult =
      (await goerliResponse.json()) as GetTransactionByHashResponse;
    const ethResult =
      (await ethResponse.json()) as GetTransactionByHashResponse;

    const transactions: Transaction[] = [];

    if (bscResult.result !== null) {
      transactions.push({
        ...bscResult.result,
        chain: "bsc",
      });
    }

    if (goerliResult.result !== null) {
      transactions.push({
        ...goerliResult.result,
        chain: "goerli",
      });
    }

    if (ethResult.result !== null) {
      transactions.push({
        ...ethResult.result,
        chain: "eth",
      });
    }
```

### Multichain social login

```tsx
    <ModalProvider
      walletSort={["Particle Auth", "Wallet"]}
      particleAuthSort={[
        "email",
        "phone",
        "google",
        "apple",
        "facebook",
        "microsoft",
        "linkedin",
        "github",
        "discord",
      ]}
      options={{
        projectId: env.NEXT_PUBLIC_PROJECT_ID,
        clientKey: env.NEXT_PUBLIC_CLIENT_KEY,
        appId: env.NEXT_PUBLIC_APP_ID,
        chains: [
          BSC,
          BSCTestnet,
          Ethereum,
          EthereumGoerli,
          OptimismGoerli,
          PolygonMumbai,
          Optimism,
          Moonbeam,
          Moonriver,
          Avalanche,
          Polygon,
        ],
        particleWalletEntry: {
          displayWalletEntry: true,
          defaultWalletEntryPosition: WalletEntryPosition.BR,
          supportChains: [Ethereum, EthereumGoerli],
        },
        wallets: [...evmWallets({ qrcode: false })],
      }}
      language="en"
      theme={"light"}
    >
      <Component {...pageProps} />
    </ModalProvider>
```

### User social data

```tsx
const response = await fetch(
    `https://indexer.crossbell.io/v1/characters/${characterId}/achievements`,
    {
      headers: {
        accept: "application/json",
      },
    }
  );
  
  const response = await fetch(
    `https://indexer.crossbell.io/v1/addresses/${address}/characters?primary=true`,
    {
      headers: {
        accept: "application/json",
      },
    }
  );

  const response = await fetch(
    `https://indexer.crossbell.io/v1/characters/${characterId}/links?limit=20`,
    {
      headers: {
        accept: "application/json",
      },
    }
  );
```

## Tech Stack

- Particle Network, CrossBell, NodeReal, Typescript, Nextjs, TailwindCSS

## Roadmap
•	Improve UX/UI
•	Integration with additional blockchains for expanded cross-chain transaction history
•	V2 Home Feed
•	Integration with additional decentralized finance (DeFi) protocols
