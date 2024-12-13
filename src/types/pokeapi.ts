export type PokemonInfo = {
  id: number;
  name: string;
  types: Array<{ type: { name: string } }>;
};

export type PokemonQueryData = {
  name: string;
  url: string;
};
