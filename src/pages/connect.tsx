import Head from "next/head";
import Image from "next/image";
import { ConnectButton } from "@particle-network/connect-react-ui";
import { useAccount } from "@particle-network/connect-react-ui";

export default function Home() {
  //use this in react component.
  const account = useAccount();
  if (account) {
    // connect wallet success
  }

  return (
    <div>
      <main>
        <h1>
          <a href="https://docs.particle.network/connect-service/sdks/web">
            Particle Connect Docs
          </a>
          {account && <div>{account}</div>}
        </h1>
        <div style={{ marginTop: 100 }}>
          <ConnectButton />
        </div>
      </main>
    </div>
  );
}
