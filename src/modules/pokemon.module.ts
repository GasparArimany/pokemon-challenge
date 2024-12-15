import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PokemonController } from 'src/controllers/pokemon.controller';
import { OwnedPokemon } from 'src/models/pokemon.entity';
import { PokemonService } from 'src/services/pokemon.service';

@Module({
  imports: [TypeOrmModule.forFeature([OwnedPokemon])],
  providers: [PokemonService],
  controllers: [PokemonController],
})
export class PokemonModule {}
