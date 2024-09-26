// src/components/CharacterList.tsx
import { useState } from "react";
import { StarWarsCharacter } from "../api/types";
import { useStarWarsData } from "../api/swapi";
import { Link } from "react-router-dom";

const Characters = () => {
  const [page, setPage] = useState(1);
  const { data, error, isLoading } = useStarWarsData(
    "https://swapi.dev/api/people",
    page
  );

  // Pagination Handlers
  const handleNextPage = () => setPage((prevPage) => prevPage + 1);
  const handlePreviousPage = () =>
    setPage((prevPage) => Math.max(prevPage - 1, 1));

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Star Wars Characters</h1>
      <ul className="list-disc pl-5">
        {data?.results.map((character: StarWarsCharacter, index: number) => (
          <li key={character.name} className="mt-2">
            <Link
              to={`/characters/${index + 1}`}
              className="text-blue-500 hover:underline"
            >
              {character.name}
            </Link>
          </li>
        ))}
      </ul>
      <div className="pagination-controls mt-4">
        {page > 1 && (
          <button
            onClick={handlePreviousPage}
            className="px-4 py-2 bg-blue-500 text-white rounded mr-2"
          >
            Previous
          </button>
        )}

        <span>Page {page}</span>

        {data?.next && (
          <button
            onClick={handleNextPage}
            className="px-4 py-2 bg-blue-500 text-white rounded ml-2"
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
};

export default Characters;
