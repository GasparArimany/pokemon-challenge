import { Body, Controller, Get, ParseIntPipe, Post } from '@nestjs/common';
import CatchPokemonDto from 'src/dtos/catch-pokemon.dto';
import { PokemonInfoResponse } from 'src/dtos/search-nearby-pokemon.dto';
import { PokemonService } from 'src/services/pokemon.service';

@Controller('pokemon')
export class PokemonController {
  constructor(private readonly pokemonService: PokemonService) {}

  @Get('search')
  async searchNearbyPokemon(): Promise<PokemonInfoResponse[]> {
    return this.pokemonService.searchNearbyPokemon();
  }

  //TODO: improve body dto to recieve either name or id. replicate in different handler with simple types
  @Post('catch')
  async catchPokemon(@Body() { id }: CatchPokemonDto) {
    this.pokemonService.catchPokemon(id);
  }

  @Post('catch-id')
  async catchPokemonIdOnBodyOnly(@Body('id', ParseIntPipe) id: number) {
    this.pokemonService.catchPokemon(id);
  }
}
