import { Pokemon } from "../types/pokemon";
import { PokemonDetails } from "../types/pokemonDetails";

export const fetchPokemonData = async ({
    queryKey,
}: {
    queryKey: [string, string, number];
}): Promise<PokemonDetails[]> => {
    const [, searchTerm, page] = queryKey;

    const rawPokemonData = await fetchRawPokemonData();
    const filterData = filterPokemonData(rawPokemonData, searchTerm);
    const paginatedData = paginatePokemonData(filterData, page);
    const detailedData = await fetchPokemonDetails(paginatedData);

    return detailedData;
}

const fetchRawPokemonData = async (): Promise<Pokemon[]> => {
    const apiResponse = await fetch("https://pokeapi.co/api/v2/pokemon?limit=1000");
    const pokemonData = await apiResponse.json();
    return pokemonData.results;
}

const fetchPokemonDetails = async (pokemonList: Pokemon[]):
 Promise<PokemonDetails[]> => {
    const pokemonDetailedData = await Promise.all(
        pokemonList.map(async (pokemon) => {
            const response = await fetch(pokemon.url);
            const pokemonDetails = await response.json();
            return {
                id: pokemonDetails.id,
                image: pokemonDetails.sprites.front_default,
                name: pokemonDetails.name,
                abilities: pokemonDetails.abilities.map((ability: any) => ability.ability.name),
                type: pokemonDetails.types.map((type: any) => type.type.name).join(", "),

            }
        })
    ); 
    return pokemonDetailedData;
 };

 const filterPokemonData = (pokemonList: Pokemon[], searchTerm: string): Pokemon[] => {
    if(!searchTerm || searchTerm.length <= 2) {
        return pokemonList;
    }
    return pokemonList.filter((pokemon) => pokemon.name.includes(searchTerm.toLowerCase()));
 };

 const paginatePokemonData = (pokemonList: Pokemon[], page: number,
 itemsPerPage: number = 10): Pokemon[] => {
    const offset = (page - 1) * itemsPerPage;
    return pokemonList.slice(offset, offset + itemsPerPage);
};