import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  async getPokemonList(): Promise<Array<{ name: string; url: string }>> {
    const pokemonQueryResult = await fetch(
      'https://pokeapi.co/api/v2/pokemon?limit=151',
    );

    if (!pokemonQueryResult.ok) {
      throw new HttpException(
        "Couldn't fetch Pokemons list",
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return (await pokemonQueryResult.json()).results;
  }
}
