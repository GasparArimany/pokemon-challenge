export type PokemonType = string & { __brand: 'pokemonType' };
export type Move = string & { __brand: 'move' };

export class OwnedPokemon {
  id: number;
  name: string;
  types: Array<PokemonType>;
  moves: Array<Move>;
  trainer_id: number;
}

export type PokemonInfoResponse = {
  id: number;
  name: string;
  types: string[];
};
