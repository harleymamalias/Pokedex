import React from "react";
import styled from "styled-components";
import { usePokedexContext } from "../../context/PokedexAppContext";

// Styled components for Pokémon-themed buttons
const PreviousButton = styled.button`
  background-color: ${(props) => (props.disabled ? "#ccc" : "#ff0000")};
  color: ${(props) => (props.disabled ? "#666" : "white")};
  border: none;
  padding: 10px;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  font-size: 0.9rem;
  border-radius: 5px;
  margin: 10px;
  width: 100px;
  &:hover {
    background-color: ${(props) =>
      props.disabled ? "#ccc" : "#cc0000"};
  }
`;

const NextButton = styled.button`
  background-color: #3b4cca; 
  color: white;
  border: none;
  padding: 10px;
  cursor: pointer;
  font-size: 0.9rem;
  border-radius: 5px;
  margin: 10px;
  width: 100px;
  &:hover {
    background-color: #2a3a9e; 
  }
`;

const PokedexPagination = () => {
  const { page, setPage } = usePokedexContext();

  return (
    <div>
      <PreviousButton
        onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
        disabled={page <= 1}
      >
        Previous
      </PreviousButton>
      <span>Page {page}</span>
      <NextButton onClick={() => setPage((prev) => prev + 1)}>
        Next
      </NextButton>
    </div>
  );
};

export default PokedexPagination;
