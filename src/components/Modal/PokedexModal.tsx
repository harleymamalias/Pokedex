import React from "react";
import styled from "styled-components";
import { PokemonDetails } from "../../types/pokemonDetails";
import { capitalFirstLetter } from "../../utils/capitalizeFirstLetter";

const ModalWrapper = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: ${({ isOpen }) => (isOpen ? "flex" : "none")};
  justify-content: center;
  align-items: center;
  z-index: 50;
  background-color: rgba(0, 0, 0, 0.6);
`;

const ModalContent = styled.div`
  position: relative;
  background-color: white;
  border-radius: 5px;
  width: 400px;
  max-height: 80%;
  padding: 30px;
  overflow-y: auto;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease-out;
`;

const ModalHeader = styled.h2`
  font-size: 1.8rem;
  color: #333;
  margin-bottom: 20px;
  text-align: center;
`;

const ModalText = styled.p`
  font-size: 1.1rem;
  color: #555;
  line-height: 1.6;
  margin: 8px 0;
`;

const PokemonImage = styled.img`
  width: 150px;
  margin: 20px auto;
  display: block;
  border-radius: 50%;
`;

const Button = styled.button`
  background-color: #009879;
  color: white;
  border: none;
  padding: 12px;
  cursor: pointer;
  font-size: 1rem;
  border-radius: 8px;
  width: 100%;
  margin-top: 20px;
  transition: background-color 0.3s;
  &:hover {
    background-color: #007c64;
  }
  &:focus {
    outline: none;
  }
`;

interface PokedexModalProps {
  isOpen: boolean;
  pokemon: PokemonDetails | null;
  closeModal: () => void;
}

const PokedexModal: React.FC<PokedexModalProps> = ({
  isOpen,
  pokemon,
  closeModal,
}) => {
  if (!pokemon) return null;

  return (
    <ModalWrapper isOpen={isOpen}>
      <ModalContent>
        <ModalHeader>{capitalFirstLetter(pokemon.name)}</ModalHeader>
        <ModalText>
          <strong>Abilities:</strong>{" "}
          {pokemon.abilities.map((ability) => capitalFirstLetter(ability.name)).join(", ")}
        </ModalText>
        <ModalText>
          <strong>Type:</strong> {capitalFirstLetter(pokemon.type.join(", "))}
        </ModalText>
        <PokemonImage
          src={pokemon.image}
          alt={capitalFirstLetter(pokemon.name)}
        />
        <Button onClick={closeModal}>Close</Button>
      </ModalContent>
    </ModalWrapper>
  );
};

export default PokedexModal;
