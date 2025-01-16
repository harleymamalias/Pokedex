import React from "react";
import styled from "styled-components";


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

interface PokedexPaginationProps {
  page: number;
  nextPage: () => void;
  prevPage: () => void;
}

const PokedexPagination: React.FC<PokedexPaginationProps> = ({
  page,
  nextPage,
  prevPage,
}) => {
  return (
    <div>
      <PreviousButton
        onClick={prevPage}
        disabled={page <= 1}
      >
        Previous
      </PreviousButton>
      <span>Page {page}</span>
      <NextButton onClick={nextPage}>
        Next
      </NextButton>
    </div>
  );
};

export default PokedexPagination;
