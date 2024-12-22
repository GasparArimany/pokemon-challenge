import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ChosenPokemon } from './pokemon.entity';

@Entity()
export default class Trainer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => ChosenPokemon, (pkm) => pkm.trainer_id)
  chosenPokemons: ChosenPokemon[];
}
