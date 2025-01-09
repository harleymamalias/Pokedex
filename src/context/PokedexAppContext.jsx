import React, { createContext, useContext, useState } from "react";

const PokedexAppContext = createContext();

export const usePokedexContext = () => useContext(PokedexAppContext);

export const PokedexProvider = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [selectedPokemon, setSelectedPokemon] = useState(null);

  return (
    <PokedexAppContext.Provider
      value={{
        searchTerm,
        setSearchTerm,
        page,
        setPage,
        selectedPokemon,
        setSelectedPokemon,
      }}
    >
      {children}
    </PokedexAppContext.Provider>
  );
};
