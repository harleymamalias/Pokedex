import styled from "styled-components";
import { useSearch } from "../hooks/useSearch";


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

interface PokedexSearchProps {
  onSearchChange: (searchTerm: string) => void;
  debounceTime?: number;
  placeholder?: string;
}

const PokedexSearch: React.FC<PokedexSearchProps> = ({
  onSearchChange,
  debounceTime = 500,
  placeholder,
}) => {
  //must have its own state and logic -- accept onchange callbacks/debounce callbacks
  const { searchTerm, handleSearchChange } = useSearch(onSearchChange, debounceTime);

  return (
    <SearchBox
      type="text"
      placeholder={placeholder}
      value={searchTerm}
      onChange={handleSearchChange}
    />
  );
};

export default PokedexSearch;


