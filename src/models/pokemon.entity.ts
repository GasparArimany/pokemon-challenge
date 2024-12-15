import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import Trainer from './trainer.entity';

export type PokemonType = string & { __brand: 'pokemonType' };
export type Move = string & { __brand: 'move' };

@Entity()
export class OwnedPokemon {
  @PrimaryColumn()
  pokemon_id: number;

  @Column()
  pokemon_name: string;

  @Column('simple-array')
  types: Array<PokemonType>;

  @Column('simple-array')
  moves: Array<Move>;

  @ManyToOne(() => Trainer, (trainer) => trainer.id)
  @PrimaryColumn()
  trainer_owner: number;
}
