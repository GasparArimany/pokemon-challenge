import { IsDefined, IsInt } from 'class-validator';

export default class CatchPokemonDto {
  @IsDefined()
  @IsInt()
  id: number;
}
