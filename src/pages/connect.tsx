import {
  ConnectButton,
  useAccount,
  useParticleProvider,
} from "@particle-network/connect-react-ui";
import { ethers } from "ethers";
import { useEffect, useState } from "react";
import { CharacterResponseData } from "./api/character";
import { NotesLink, NotesResponseData } from "./api/note";
import { AxelarAbi } from "~/utils/abi/AxelarABI";

function LinkItem({ link }: { link: NotesLink }) {
  return (
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
        <div className="text-gray-700">
          <p>Link Type: {link.linkType}</p>
          <p>Note ID: {link.toNoteId}</p>
          <p>Character ID: {link.toCharacterId}</p>
          <p>Operator: {link.operator}</p>
          <p>Created At: {link.createdAt}</p>
          <p>Updated At: {link.updatedAt}</p>
          <p>Transaction Hash: {link.transactionHash}</p>
          <p>Block Number: {link.blockNumber}</p>
          <p>Log Index: {link.logIndex}</p>
          <p>Link Value: {link.linkValue}</p>
        </div>
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
  );
}

function NoteList({ noteLinks }: { noteLinks: NotesLink[] }) {
  return (
    <div>
      {noteLinks.map((link) => (
        <div key={link.linklistId}>
          <LinkItem link={link} />
        </div>
      ))}
    </div>
  );
}

export default function Home() {
  //use this in react component.
  const account = useAccount();
  const [character, setCharacter] = useState<CharacterResponseData>();
  const [notes, setNotes] = useState<NotesResponseData>();
  const provider = useParticleProvider();

  /**
   * Functions
   */

  const callViem = async () => {
    if (!provider) return;
    const objectProvider = Object.create(provider);
    const ethersProvider = new ethers.providers.Web3Provider(
      objectProvider,
      "any"
    );
    const accounts = await ethersProvider.listAccounts();
    const ethersSigner = ethersProvider.getSigner();

    const axelarAddress = "0xFA1220C4dbFF989eDF08170d36593dBe7b2CAB59";

    const contract = new ethers.Contract(
      axelarAddress,
      AxelarAbi,
      ethersSigner
    );
    try {
      // const destinationChain = "Polygon";
      const destinationChain = "optimism";
      // const destinationAddress = "0xFA1220C4dbFF989eDF08170d36593dBe7b2CAB59" // Polygon
      const destinationAddress = "0x1A8058C0E1391953Fae699602392222657BC4EE4"; // Optimism
      const payload = ethers.utils.defaultAbiCoder.encode(
        ["string"],
        ["Hello from contract A"]
      );

      const openPositions = await contract.setRemoteValue(
        destinationChain,
        destinationAddress,
        payload
      );
      console.log(openPositions);
    } catch (error) {
      console.log(error);
    }
  };

  /**
   *
   * Hooks
   */

  const fetchCharacterData = async (account: string) => {
    const params = new URLSearchParams({
      address: account,
    });
    const response = await fetch(`/api/character?${params.toString()}`);
    const data = await response.json();

    setCharacter(data);

    console.log("🚀 ~ file: social.tsx:9 ~ character:", data);
  };
  useEffect(() => {
    if (account) {
      fetchCharacterData(account);
    }
  }, [account]);

  const fetchNotesData = async (characterId: string) => {
    const params = new URLSearchParams({
      characterId: characterId,
    });
    const response = await fetch(`/api/note?${params.toString()}`);
    const data = await response.json();

    setNotes(data);
    console.log("🚀 ~ file: connect.tsx:39 ~ fetchNotesData ~ data:", data);
  };
  useEffect(() => {
    if (character && character.list.length > 0) {
      const characterId = character.list[0]?.characterId || "10";

      fetchNotesData(String(characterId));
    }
  }, [character]);

  return (
    <main className="min-h-[calc(100vh-64px)]">
      <h1>
        <a href="https://docs.particle.network/connect-service/sdks/web">
          Particle Connect Docs
        </a>
        {account && <div>{account}</div>}
        <div>
          {character && (
            <>
              {character.list[0]?.characterId}{" "}
              <div>{character.list[0]?.handle}</div>
            </>
          )}
        </div>
        {notes && <NoteList noteLinks={notes.list} />}
      </h1>
      <div className="flex h-48 w-full p-16">
        <ConnectButton />
      </div>
      <div>
        <button onClick={callViem}>Call Viem</button>
      </div>
    </main>
  );
}
