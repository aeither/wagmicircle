import { WalletEntryPosition } from "@particle-network/auth";
import {
  Avalanche,
  BSC,
  BSCTestnet,
  Ethereum,
  EthereumGoerli,
  KCCTestnet,
  Moonbeam,
  Moonriver,
  Optimism,
  PlatON,
  Polygon,
  Solana,
} from "@particle-network/common";
import { evmWallets, solanaWallets } from "@particle-network/connect";
import { ModalProvider } from "@particle-network/connect-react-ui";
import "@particle-network/connect-react-ui/esm/index.css";
import { type AppType } from "next/dist/shared/lib/utils";
import { env } from "~/env.mjs";
import "~/styles/globals.css";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
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
          PlatON,
          Optimism,
          Moonbeam,
          Moonriver,
          Avalanche,
          Polygon,
          BSC,
          Ethereum,
          EthereumGoerli,
          Solana,
          BSCTestnet,
          KCCTestnet,
        ],
        particleWalletEntry: {
          displayWalletEntry: true,
          defaultWalletEntryPosition: WalletEntryPosition.BR,
          supportChains: [Ethereum, EthereumGoerli],
        },
        wallets: [...evmWallets({ qrcode: false }), ...solanaWallets()],
      }}
      language="en"
      theme={"light"}
    >
      <Component {...pageProps} />
    </ModalProvider>
  );
};

export default MyApp;
