// src/api/swapi.ts
import useSWR from "swr";
import { StarWarsCharacter, SWAPIResponse } from "./types";

// Fetcher function that takes both URL and page number (destructured from an array)
export const fetchStarWarsData = async ([url, page]: [string, number]): Promise<
  SWAPIResponse<StarWarsCharacter>
> => {
  const response = await fetch(`${url}?page=${page}`);
  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }
  const data: SWAPIResponse<StarWarsCharacter> = await response.json();
  return data;
};

// Custom hook to fetch paginated Star Wars data using SWR
export const useStarWarsData = (endpoint: string, page: number) => {
  const { data, error } = useSWR([endpoint, page], fetchStarWarsData);

  return {
    data,
    error,
    isLoading: !data && !error,
  };
};
