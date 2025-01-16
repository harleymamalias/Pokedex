export type PokemonDetails = {
    id: number;
    name: string;
    image: string;
    abilities: {
        name: string,
        url: string,
    }[];
    type: string[];
};
