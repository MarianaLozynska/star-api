import { useParams } from "react-router-dom";
import useSWR from "swr";
import { StarWarsCharacter } from "../api/types";

const fetchCharacterById = async (id: string): Promise<StarWarsCharacter> => {
  const response = await fetch(`https://swapi.dev/api/people/${id}`);
  if (!response.ok) {
    throw new Error("Failed to fetch character");
  }
  return response.json();
};

const CharacterDetail = () => {
  const { characterId } = useParams();
  const {
    data: character,
    error,
    isLoading,
  } = useSWR(characterId, fetchCharacterById);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="p-4">
      {character ? (
        <>
          <h1 className="text-2xl font-bold">{character.name}</h1>
          <p>Height: {character.height}</p>
          <p>Mass: {character.mass}</p>
          <p>Gender: {character.gender}</p>
          <p>Birth Year: {character.birth_year}</p>
        </>
      ) : (
        <div>No character data available</div>
      )}
    </div>
  );
};

export default CharacterDetail;
