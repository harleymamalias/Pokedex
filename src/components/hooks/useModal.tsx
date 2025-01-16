import { useState } from "react";
import { PokemonDetails } from "../../types/pokemonDetails";

export const useModal = () => {
  const [selectedPokemon, setSelectedPokemon] = useState<PokemonDetails | null>(
    null
  );

  const viewPokemonDetail = (id: number, pokemonData: PokemonDetails[]) => {
    const pokemon = pokemonData?.find((p) => p.id === id) || null;
    setSelectedPokemon(pokemon);
  };

  const closeModal = () => {
    setSelectedPokemon(null);
  };

  return { selectedPokemon, viewPokemonDetail, closeModal };
};
