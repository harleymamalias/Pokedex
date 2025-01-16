import { useQuery } from "@tanstack/react-query";
import { fetchPokemonData } from "../../services/pokeApi";
import { PokemonDetails } from "../../types/pokemonDetails";

interface UsePokemonDataProps {
  searchTerm: string;
  page: number;
}
export const usePokemonData = ({
  searchTerm,
  page,
}: UsePokemonDataProps) => {
  const {
    data: pokemonData,
    isLoading,
    isError,
  } = useQuery<PokemonDetails[], Error>({
    queryKey: ["pokemonData", searchTerm, page],
    queryFn: ({ queryKey }) =>
      fetchPokemonData({ queryKey: queryKey as [string, string, number] }),
    select: (data) => data,
  });

  return { pokemonData, isLoading, isError };
};
