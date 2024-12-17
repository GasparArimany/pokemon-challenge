import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { PokemonModule } from './modules/pokemon.module';
import { TrainerModule } from './modules/trainer.module';
import path from 'path';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'sqlite',
      // TODO come from env?
      database: path.join(__dirname, '..', process.env.DB_NAME),
      entities: [path.join(__dirname, '**', '*.entity.{ts,js}')],
      // TODO put sync behind env only for not prod
      synchronize: true,
    }),
    PokemonModule,
    TrainerModule,
  ],
})
export class AppModule {}
