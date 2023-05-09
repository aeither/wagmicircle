import { ConnectButton, useAccount } from "@particle-network/connect-react-ui";
import { useEffect, useState } from "react";
import { CharacterResponseData } from "./api/character";
import { NotesLink, NotesResponseData } from "./api/note";

function LinkItem({ link }: { link: NotesLink }) {
  return (
    <div>
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
    </main>
  );
}
