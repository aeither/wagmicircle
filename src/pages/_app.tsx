import { WalletEntryPosition } from "@particle-network/auth";
import {
  Avalanche,
  BSC,
  BSCTestnet,
  Ethereum,
  EthereumGoerli,
  Moonbeam,
  Moonriver,
  Optimism,
  OptimismGoerli,
  Polygon,
  PolygonMumbai,
} from "@particle-network/common";
import { evmWallets } from "@particle-network/connect";
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
  );
};

export default MyApp;
