import { Pokemon } from "../types/pokemon";
import { PokemonDetails } from "../types/pokemonDetails";

let cachedAllPokemon: Pokemon[] = [];
const POKEMON_PER_PAGE = 10;
const POKEMON_API_URL = "https://pokeapi.co/api/v2/pokemon?limit=1118";
const SEARCH_LENGTH_THRESHOLD = 2;

export const fetchPokemonData = async ({
    queryKey,
}: {
    queryKey: [string, string, number];
}): Promise<PokemonDetails[]> => {
    const [, searchTerm, page] = queryKey;

    const allPokemon = await getAllPokemon();
    const filteredPokemon = filterPokemon(allPokemon, searchTerm);

    const paginatedPokemon = paginate(filteredPokemon, page);

    return getPokemonDetails(paginatedPokemon);
};

//fetch all pokemon and cache the result
const getAllPokemon = async (): Promise<Pokemon[]> => {
    if (cachedAllPokemon.length > 0) {
        return cachedAllPokemon;
    }

    const response = await fetch(POKEMON_API_URL);
    const data = await response.json();
    cachedAllPokemon = data.results;

    return cachedAllPokemon;
};

const filterPokemon = (pokemonList: Pokemon[], searchTerm: string): Pokemon[] => {
    if (!searchTerm || searchTerm.length <= SEARCH_LENGTH_THRESHOLD ){
        return pokemonList;
    }

    return pokemonList.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
};

const paginate = (pokemonList: Pokemon[], page: number, itemsPerPage: number = POKEMON_PER_PAGE): Pokemon[] => {
    const startIndex = (page - 1) * itemsPerPage;
    return pokemonList.slice(startIndex, startIndex + itemsPerPage);
};

// fetch detailed pokemon details
const getPokemonDetails = async (pokemonList: Pokemon[]): Promise<PokemonDetails[]> => {
    const promises = pokemonList.map(fetchSinglePokemonDetails);
    return Promise.all(promises);
};

const fetchSinglePokemonDetails = async (pokemon: Pokemon): Promise<PokemonDetails> => {
    const response = await fetch(pokemon.url);
    const data = await response.json();

    return {
        id: data.id,
        image: data.sprites.front_default,
        name: data.name,
        abilities: data.abilities.map((ability: any) => ({
            name: ability.ability.name,
            isHidden: ability.is_hidden,
        })),
        type: data.types.map((type: any) => type.type.name),
    };
};
