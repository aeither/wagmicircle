import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";

import Image from "next/image";

const Header = ({ username }: { username: string }) => {
  return (
    <header className="flex items-center justify-between bg-black py-4 text-white">
      <div className="flex items-center">
        <Image src="/logo.png" alt="Logo" width={40} height={40} />
        <h1 className="ml-2 font-bold">Brand Name</h1>
      </div>
      <div className="flex items-center">
        <p className="mr-4">Good morning, {username}</p>
        <img
          src="/profile-icon.png"
          alt="Profile Icon"
          className="h-8 w-8 rounded-full"
        />
      </div>
    </header>
  );
};

const Sidebar = () => {
  return (
    <nav className="fixed left-0 top-0 flex h-full w-1/4 flex-col justify-center bg-yellow-100 py-4">
      <ul className="space-y-2">
        <li className="rounded-md bg-white px-4 py-2 shadow-md transition duration-200 ease-in-out hover:bg-gray-100">
          Overview
        </li>
        <li className="rounded-md bg-white px-4 py-2 shadow-md transition duration-200 ease-in-out hover:bg-gray-100">
          Transactions
        </li>
        <li className="rounded-md bg-white px-4 py-2 shadow-md transition duration-200 ease-in-out hover:bg-gray-100">
          Others
        </li>
      </ul>
    </nav>
  );
};

const Feed = () => {
  return (
    <main className="flex-grow rounded-md bg-white p-4">
      <div className="h-full overflow-y-scroll">
        <div className="space-y-4">{/* Cards go here */}</div>
      </div>
      <div className="mt-4 flex justify-between">
        <div className="w-1/2 pr-2">
          <div className="rounded-md bg-yellow-100 p-4">
            {/* User info card goes here */}
          </div>
        </div>
        <div className="w-1/2 pl-2">
          <div className="rounded-md bg-black p-4 text-white">
            {/* Transactions card goes here */}
          </div>
        </div>
      </div>
    </main>
  );
};

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Wagmi Circle</title>
        <meta name="description" content="Connect, learn and trade with bros" />
        <link rel="icon" href="/favicon.ico" />

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat&display=swap"
          rel="stylesheet"
        />
      </Head>
      <main className="flex min-h-screen flex-col">
        <Header username="John Doe" />
        <div className="flex flex-grow">
          <Sidebar />
          <Feed />
        </div>
      </main>
    </>
  );
};

export default Home;
