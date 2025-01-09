import React from "react";
import styled from "styled-components";
import { capitalFirstLetter } from "../../utils/capitalizeFirstLetter";

const TableRow = styled.tr`
  background-color: #ffffff;
  border-bottom: 1px solid #e5e7eb;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #f3f4f6;
  }

  td {
    padding: 8px;
    text-align: left;
    font-size: 0.875rem;
    color: #4b5563;
  }
`;

const TableCell = styled.td`
  padding: 8px 15px;
`;

const PokedexTableRow = ({ pokemon, viewPokemonDetail }) => {
  return (
    <TableRow onClick={() => viewPokemonDetail(pokemon)}>
      <TableCell>{pokemon.id}</TableCell>
      <TableCell>
        <img src={pokemon.image} alt={capitalFirstLetter(pokemon.name)} width="50" />
      </TableCell>
      <TableCell>{capitalFirstLetter(pokemon.name)}</TableCell>
      <TableCell>{capitalFirstLetter(pokemon.type)}</TableCell>
    </TableRow>
    
  );
};

export default PokedexTableRow;