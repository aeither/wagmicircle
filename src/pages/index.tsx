import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";

import Image from "next/image";

const Header = ({ username }: { username: string }) => {
  return (
    <header className="fixed left-0 right-0 top-0 z-10 flex items-center justify-between bg-black px-4 py-4 text-white">
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
    <nav className="fixed left-0 top-0 flex h-full w-1/4 flex-col justify-center bg-[#F5F5F5] py-4">
      <ul className="space-y-2 p-2">
        <li className="cursor-pointer rounded-lg px-4 py-2 text-lg transition duration-200 ease-in-out hover:bg-yellow-400">
          Overview
        </li>
        <li className="cursor-pointer rounded-lg px-4 py-2 text-lg transition duration-200 ease-in-out hover:bg-yellow-400">
          Transactions
        </li>
        <li className="cursor-pointer rounded-lg px-4 py-2 text-lg transition duration-200 ease-in-out hover:bg-yellow-400">
          Others
        </li>
      </ul>
    </nav>
  );
};

const Feed = () => {
  return (
    <main className="ml-96 mt-20 flex h-screen w-full flex-row rounded-lg bg-white p-4">
      <div className="grid w-full grid-cols-3 gap-4">
        <div className="col-span-2 rounded-lg p-4">
          <h2 className="mb-4 text-2xl font-bold">Feed</h2>
          <ul className="space-y-4">
            <li className="flex items-center space-x-4 rounded-lg border-2 border-[#F5F5F5] p-2">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-200">
                <svg
                  className="h-6 w-6 text-gray-600"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                  />
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold">Card Title</h3>
                <p className="text-gray-700">Card description goes here.</p>
                <div className="mt-2 flex items-center space-x-2">
                  <button className="flex items-center space-x-2 text-gray-600">
                    <svg
                      className="h-4 w-4"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M4 8h16M4 16h16"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                      />
                    </svg>
                    <span>Like</span>
                  </button>
                  <button className="flex items-center space-x-2 text-gray-600">
                    <svg
                      className="h-4 w-4"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M6 18L18 6M6 6l12 12"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                      />
                    </svg>
                    <span>Comment</span>
                  </button>
                </div>
              </div>
            </li>
            {/* Add more cards here */}
          </ul>
        </div>
        <div className="col-span-1">
          <div className="mb-4 rounded-lg border-4 border-yellow-400 bg-gradient-to-tr from-yellow-200 to-yellow-400 p-4">
            <h2 className="mb-2 text-lg font-bold">User Info</h2>
            <p className="mb-2 text-gray-700">
              <span className="font-bold">Balance:</span> $1,234.56
            </p>
            <p className="text-gray-700">
              <span className="font-bold">Current Network:</span> Mainnet
            </p>
          </div>

          <div className="col-span-1 rounded-lg p-4">
            <h2 className="mb-4 text-2xl font-bold">Transactions</h2>
            <div className="space-y-4">
              <div className="rounded-lg bg-black p-4 text-white">
                <h3 className="text-lg font-bold">Transaction Title</h3>
                <p className="text-gray-400">
                  Transaction description goes here.
                </p>
                <p className="text-gray-400">Amount: $1,234.56</p>
              </div>
              <div className="rounded-lg bg-black p-4 text-white">
                <h3 className="text-lg font-bold">Transaction Title</h3>
                <p className="text-gray-400">
                  Transaction description goes here.
                </p>
                <p className="text-gray-400">Amount: $1,234.56</p>
              </div>
              {/* Add more transactions here */}
            </div>
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
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat&display=swap"
          rel="stylesheet"
        />
      </Head>
      <main className="flex min-h-screen flex-col">
        <Header username="John Doe" />
        <div className="flex w-full">
          <Sidebar />
          <Feed />
        </div>
      </main>
    </>
  );
};

export default Home;
