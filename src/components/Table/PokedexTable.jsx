import React from "react";
import styled from "styled-components";
import PokedexTableRow from "./PokedexTableRow";


const Table = styled.table`
  border-collapse: collapse;
  margin: 10px auto;
  font-size: 1rem;
  font-family: "Roboto", sans-serif;
  min-width: 700px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  overflow: hidden;
`;

const TableHead = styled.thead`
  background-color: #ffde00;
  color: #000000;
  text-align: left;

  th {
    padding: 12px 16px;
    text-transform: uppercase;
    font-weight: 600;
    letter-spacing: 0.5px;
  }
`;

const TableBody = styled.tbody`
  tr {
    &:nth-child(even) {
      background-color: #f9f9f9;
    }
    &:hover {
      background-color: #ffef9a;
      cursor: pointer;
    }
  }

  td {
    padding: 12px 16px;
    text-align: left;
    border-bottom: 1px solid #ddd;
  }
`;

const PokedexTable = ({ pokemonData, viewPokemonDetail }) => {
  return (
    <Table>
      <TableHead>
        <tr>
          <th>ID</th>
          <th>Image</th>
          <th>Name</th>
          <th>Type</th>
        </tr>
      </TableHead>
      <TableBody>
        {pokemonData.map((pokemon) => {
          return (
            <PokedexTableRow
              key={pokemon.id}
              pokemon={pokemon}
              viewPokemonDetail={viewPokemonDetail}
            />
          );
        })}
      </TableBody>
    </Table>
  );
};

export default PokedexTable;
