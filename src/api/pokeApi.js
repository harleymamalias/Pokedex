export const fetchPokemonData = async ({ queryKey }) => {
  const [, searchTerm, page] = queryKey;

  const rawPokemonData = await fetchRawPokemonData();

  const filteredData = filterPokemonData(rawPokemonData, searchTerm);

  const paginatedData = paginatePokemonData(filteredData, page);

  const detailedData = await fetchPokemonDetails(paginatedData);

  return detailedData; 
};

 const fetchRawPokemonData = async () => {
  const apiResponse = await fetch('https://pokeapi.co/api/v2/pokemon?limit=1000');
  const data = await apiResponse.json();
  return data.results; 
};

 const filterPokemonData = (pokemonList, searchTerm) => {
  if (!searchTerm || searchTerm.length <= 2) {
    return pokemonList; 
  }
  return pokemonList.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
};

 const paginatePokemonData = (filteredList, page, itemsPerPage = 10) => {
  const offset = (page - 1) * itemsPerPage;
  return filteredList.slice(offset, offset + itemsPerPage);
};

 const fetchPokemonDetails = async (pokemonList) => {
  const detailedData = await Promise.all(
    pokemonList.map(async (pokemon) => {
      const response = await fetch(pokemon.url);
      const details = await response.json();
      return {
        id: details.id,
        image: details.sprites.front_default,
        name: details.name,
        abilities: details.abilities.map((ability) => ability.ability.name),
        type: details.types.map((type) => type.type.name).join(","),
      };
    })
  );
  return detailedData;
};
