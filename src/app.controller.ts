import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { PokemonInfoResponse } from './models/pokemon';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('search')
  async searchNearbyPokemon(): Promise<PokemonInfoResponse[]> {
    return this.appService.searchNearbyPokemon();
  }
}
