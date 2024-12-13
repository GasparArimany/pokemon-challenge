import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import {
  PokemonInfo,
  PokemonInfoResponse,
  PokemonQueryData,
} from './models/pokemon';

@Injectable()
export class AppService {
  async searchNearbyPokemon(): Promise<PokemonInfoResponse[]> {
    // pick random number between 0 and 5
    const rollFoundPokemon = Math.floor(Math.random() * 5);
    if (rollFoundPokemon === 0) {
      throw new HttpException(
        'No Pokemons were found nearby!',
        HttpStatus.NOT_FOUND,
      );
    }
    console.log('after roll found');
    let pokemonList: Array<PokemonQueryData> = [];

    try {
      pokemonList = await this.getPokemonList();
    } catch (error) {
      console.log(error);

      throw new HttpException(
        `Couldn't fetch pokemons`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    if (pokemonList.length === 0) {
      throw new HttpException(
        'No Pokemons were found nearby!',
        HttpStatus.NOT_FOUND,
      );
    }

    const randomPokemonIndexes = Array.from({ length: rollFoundPokemon }, () =>
      Math.floor(Math.random() * pokemonList.length - 1),
    );

    const foundPokemons = pokemonList.filter((_, index) =>
      randomPokemonIndexes.includes(index),
    );

    //create found pokemon promise map using url field in each pokemon
    const foundPokemonPromises = foundPokemons.map((pokemon) =>
      this.getPokemonData(pokemon),
    );

    try {
      const individualPokemonReqs = await Promise.all(foundPokemonPromises);
      return individualPokemonReqs.map((pokemonRes) => {
        return {
          id: pokemonRes.id,
          name: pokemonRes.name,
          types: pokemonRes.types.map((type) => type.type.name),
        };
      });
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async catchPokemon(id: number): Promise<void> {
    let pokemonData = null;
    try {
      pokemonData = await this.getPokemonData({
        name: '',
        url: `https://pokeapi.co/api/v2/pokemon/${id}`,
      });
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    if (!pokemonData) {
      throw new HttpException('Pokemon not found', HttpStatus.NOT_FOUND);
    }

    //TODO: save pokemon to database
    console.log(`Caught ${pokemonData.name}!`);
  }

  private async getPokemonList(): Promise<Array<PokemonQueryData>> {
    const pokemonQueryResult = await fetch(
      'https://pokeapi.co/api/v2/pokemon?limit=151',
    );

    if (!pokemonQueryResult.ok) {
      throw new Error('Failed to fetch pokemon list');
    }

    const pokemonList = await pokemonQueryResult.json();

    return pokemonList.results;
  }

  private async getPokemonData({
    name,
    url,
  }: PokemonQueryData): Promise<PokemonInfo> {
    const pokemonData = await fetch(url);
    if (!pokemonData.ok) {
      throw new Error(`Couldn't fetch pokemon ${name}`);
    }
    return pokemonData.json();
  }
}
