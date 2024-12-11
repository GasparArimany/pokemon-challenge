import { Controller, Get, HttpException, HttpStatus } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async searchNearbyPokemon(): Promise<string> {
    // pick random number between 0 and 5
    const rollFoundPokemon = Math.floor(Math.random() * 5);
    if (rollFoundPokemon === 0) {
      throw new HttpException(
        'No Pokemons were found nearby!',
        HttpStatus.NOT_FOUND,
      );
    }

    const pokemonList: Array<{ name: string; url: string }> =
      await this.appService.getPokemonList();

    // check if pokemon list is emtpy
    if (!pokemonList.length) {
      throw new HttpException('No Pokemons were found!', HttpStatus.NOT_FOUND);
    }

    const randomPokemonIndexes = Array.from({ length: rollFoundPokemon }, () =>
      Math.floor(Math.random() * pokemonList.length),
    );

    const foundPokemons = pokemonList.filter((_, index) =>
      randomPokemonIndexes.includes(index),
    );

    //create found pokemon promise map using url field in each pokemon
    const foundPokemonPromises = foundPokemons.map((pokemon) =>
      fetch(pokemon.url),
    );

    const individualPokemons = await Promise.all(foundPokemonPromises);

    // check if all individual pokemon fetches are successful
    if (!individualPokemons.every((pokemon) => pokemon.ok)) {
      throw new HttpException(
        "Couldn't fetch individual Pokemons",
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return 'asd';
  }
}
