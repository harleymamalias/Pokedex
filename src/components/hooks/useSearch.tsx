import { useState, useEffect } from "react";

const DEBOUNCE_TIME = 500;

export const useSearch = (
  onSearchChange: (searchTerm: string) => void,
  debounceTime: number = DEBOUNCE_TIME
) => {
  const [searchTerm, setSearchTerm] = useState<string>("");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      onSearchChange(searchTerm);
    }, debounceTime);

    return () => clearTimeout(debounceTimeout);
  }, [searchTerm, onSearchChange, debounceTime]);

  return {
    searchTerm,
    handleSearchChange,
  };
};
