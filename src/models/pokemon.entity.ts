import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import Trainer from './trainer.entity';

export type PokemonType = string & { __brand: 'pokemonType' };
export type Move = string & { __brand: 'move' };

@Entity()
export class ChosenPokemon {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  pokemon_id: number;

  @Column()
  pokemon_name: string;

  @Column('simple-array')
  types: Array<PokemonType>;

  @Column('simple-array')
  moves: Array<Move>;

  @ManyToOne(() => Trainer, (trainer) => trainer.id)
  trainer_id: number;
}
