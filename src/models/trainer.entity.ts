import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { OwnedPokemon } from './pokemon.entity';

@Entity()
export default class Trainer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => OwnedPokemon, (pkm) => pkm.trainer_owner)
  ownedPokemons: OwnedPokemon[];
}
