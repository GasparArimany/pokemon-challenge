import { Body, Controller, Get, ParseIntPipe, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { PokemonInfoResponse } from './models/pokemon';
import CatchPokemonDto from './models/catch-pokemon.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('search')
  async searchNearbyPokemon(): Promise<PokemonInfoResponse[]> {
    return this.appService.searchNearbyPokemon();
  }

  //TODO: improve body dto to recieve either name or id. replicate in different handler with simple types
  @Post('catch')
  async catchPokemon(@Body() { id }: CatchPokemonDto) {
    this.appService.catchPokemon(id);
  }
  @Post('catch-id')
  async catchPokemonIdOnBodyOnly(@Body('id', ParseIntPipe) id: number) {
    this.appService.catchPokemon(id);
  }
}
