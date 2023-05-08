import {
  ConnectButton,
  useAccount,
  useConnectKit,
} from "@particle-network/connect-react-ui";

export default function Home() {
  //use this in react component.
  const account = useAccount();
  const connectKit = useConnectKit();
  //   const userInfo = connectKit.particle.auth.userInfo();
  //   console.log("🚀 ~ file: connect.tsx:12 ~ Home ~ userInfo:", userInfo)

  return (
    <main className="min-h-[calc(100vh-64px)]">
      <h1>
        <a href="https://docs.particle.network/connect-service/sdks/web">
          Particle Connect Docs
        </a>
        {account && <div>{account}</div>}
      </h1>
      <div className="flex h-48 w-full p-16">
        <ConnectButton />
      </div>
    </main>
  );
}
