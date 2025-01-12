import React from "react";
import styled from "styled-components";
import { useQuery } from "@tanstack/react-query";
import { fetchPokemonData } from "../api/pokeApi";
import PokedexSearch from "../components/Search/PokedexSearch";
import PokedexTable from "../components/Table/PokedexTable";
import PokedexPagination from "../components/Pagination/PokedexPagination";
import PokedexModal from "../components/Modal/PokedexModal";
import { useDebounce } from "use-debounce";
import { usePokedexContext } from "../context/PokedexAppContext";
import LoadingSpinner from "../components/Loading/LoadingSpinner";

const PokedexContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 15px;
`;

const PokedexPage = () => {
  const {
    searchTerm,
    setSearchTerm,
    page,
    setPage,
    selectedPokemon,
    setSelectedPokemon,
  } = usePokedexContext();
  const [debouncedSearchTerm] = useDebounce(searchTerm, 500);

  const {
    data: pokemonData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["pokemonData", debouncedSearchTerm, page],
    queryFn: fetchPokemonData,
    staleTime: 2 * 1000 * 60,
    // preserve previous data while new data is loading
    keepPreviousData: true,
  });

  // total number of filtered items
  const totalFilteredItems = pokemonData?.length || 0;
  const totalPages = Math.ceil(totalFilteredItems / 10);

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  const handlePrevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const viewPokemonDetail = (pokemon) => {
    setSelectedPokemon(pokemon);
  };

  const closeModal = () => {
    setSelectedPokemon(null);
  };

  return (
    <PokedexContainer>
      <PokedexSearch />
      {isLoading ? (
        <LoadingSpinner />
      ) : isError ? (
        // error page component (ideal)
        <div>Error occurred while fetching data.</div>
      ) : (
        <PokedexTable
          pokemonData={pokemonData}
          viewPokemonDetail={viewPokemonDetail}
        />
      )}
      <PokedexPagination />
      {selectedPokemon && (
        <PokedexModal
          isOpen={!!selectedPokemon}
          pokemon={selectedPokemon}
          closeModal={closeModal}
        />
      )}
    </PokedexContainer>
  );
};

export default PokedexPage;
