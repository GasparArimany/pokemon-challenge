export type PokemonInfo = {
  id: number;
  name: string;
  types: Array<{ type: { name: PokemonType } }>;
};

export type PokemonType = string & { __brand: 'pokemonType' };

export type PokemonInfoResponse = {
  id: number;
  name: string;
  types: string[];
};

export type PokemonQueryData = {
  name: string;
  url: string;
};

export class Pokemon {
  id: number;
  name: string;
  types: Array<PokemonType>;
}
