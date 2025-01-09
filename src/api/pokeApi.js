export const fetchPokemonData = async ({ queryKey }) => {
    const [, searchTerm, page] = queryKey;
  
    // fetch all pokemon data
    const apiResponse = await fetch('https://pokeapi.co/api/v2/pokemon?limit=1000'); 
    const pokemonData = await apiResponse.json();

    // filter pokemon based on the search term
    const filteredData = pokemonData.results.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // pagination
    const offset = (page - 1) * 10;
    const paginatedData = filteredData.slice(offset, offset + 10); // Slice filtered data for current page

    // detailed data for the filtered and paginated pokemon
    const pokemonDetails = await Promise.all(
      paginatedData.map(async (pokemon) => {
        const apiResponse = await fetch(pokemon.url);
        const pokemonDetail = await apiResponse.json();
        return {
          id: pokemonDetail.id,
          image: pokemonDetail.sprites.front_default,
          name: pokemonDetail.name,
          abilities: pokemonDetail.abilities.map((ability) => ability.ability.name),
          type: pokemonDetail.types.map((type) => type.type.name).join(","),
        };
      })
    );
    return pokemonDetails;
};
