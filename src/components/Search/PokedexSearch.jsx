import React from "react";
import styled from "styled-components";
import { usePokedexContext } from "../../context/PokedexAppContext";

const SearchBox = styled.input`
  padding: 16px 20px;
  min-width: 400px;
  font-size: 0.875rem;
  border: 1px solid #d1d5db;
  border-radius: 0.5rem;
  background-color: #f9fafb;
  color: #111827;
  outline: none;
  margin-bottom: 5px;
  transition: border-color 0.3s ease;

  &:focus {
    border-color: #2563eb;
    background-color: #ffffff;
  }
`;

const PokedexSearch = () => {
  const { searchTerm, setSearchTerm } = usePokedexContext();

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <SearchBox
      type="text"
      placeholder="Search for a Pokémon..."
      value={searchTerm}
      onChange={handleSearchChange}
    />
  );
};

export default PokedexSearch;
