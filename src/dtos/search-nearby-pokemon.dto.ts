/**
 * This is a a simplified pokemon model for the /search endpoint
 */
export type PokemonInfoResponse = {
  id: number;
  name: string;
  types: string[];
};
