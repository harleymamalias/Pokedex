import styled from "styled-components";
import { PokemonDetails } from "../types/pokemonDetails";
import PokedexSearch from "../components/Search/PokedexSearch";
import LoadingSpinner from "../components/Loading/LoadingSpinner";
import PokedexTable from "../components/Table/PokedexTable";
import PokedexPagination from "../components/Pagination/PokedexPagination";
import PokedexModal from "../components/Modal/PokedexModal";
import { useEffect, useMemo, useState } from "react";
import { usePokemonData } from "../components/hooks/usePokemonData";
import { usePagination } from "../components/hooks/usePagination";
import { useModal } from "../components/hooks/useModal";
import { capitalFirstLetter } from "../utils/capitalizeFirstLetter";

const PokedexContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 15px;
`;

const PokedexPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const { page, setPage, prevPage, nextPage } = usePagination();

  const { pokemonData, isLoading, isError } = usePokemonData({
    searchTerm,
    page,
  });

  const { selectedPokemon, viewPokemonDetail, closeModal } = useModal();

  useEffect(() => {
    setPage(1);
  }, [searchTerm]);

  const handleSearchChange = (newSearchTerm: string) => {
    setSearchTerm(newSearchTerm);
  };

  const columns = useMemo(
    () => [
      { header: "ID", accessor: "id" as keyof PokemonDetails },
      {
        header: "Image",
        accessor: "image" as keyof PokemonDetails,
        render: (value: string) => <img src={value} alt="pokemon" width={50} />,
      },
      {
        header: "Name",
        accessor: "name" as keyof PokemonDetails,
        render: (value) => capitalFirstLetter(value),
      },
      {
        header: "Type",
        accessor: "type" as keyof PokemonDetails,
        render: (value: string[]) => capitalFirstLetter(value.join(", ")),
      },
    ],
    []
  );

  return (
    <PokedexContainer>
      <PokedexSearch
        onSearchChange={handleSearchChange}
        placeholder="Search for a Pokemon..."
      />
      {isLoading ? (
        <LoadingSpinner />
      ) : isError ? (
        <div>Error occurred while fetching data.</div>
      ) : (
        <>
          {!pokemonData || pokemonData.length === 0 ? (
            <div>No Pokemon found matching your search.</div>
          ) : (
            <PokedexTable
              data={pokemonData}
              columns={columns}
              onRowClick={(pokemon: PokemonDetails) => {
                viewPokemonDetail(pokemon.id, pokemonData);
              }}
            />
          )}
        </>
      )}
      <PokedexPagination page={page} prevPage={prevPage} nextPage={nextPage} />
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
