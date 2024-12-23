import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PokemonController } from 'src/controllers/pokemon.controller';
import { ChosenPokemon } from 'src/models/pokemon.entity';
import { PokemonService } from 'src/services/pokemon.service';

@Module({
  imports: [TypeOrmModule.forFeature([ChosenPokemon])],
  providers: [PokemonService],
  controllers: [PokemonController],
})
export class PokemonModule {}
