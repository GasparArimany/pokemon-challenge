import { Module } from '@nestjs/common';
import { TrainerController } from 'src/controllers/trainer.controller';
import { TrainerService } from 'src/services/trainer.service';

@Module({ controllers: [TrainerController], providers: [TrainerService] })
export class TrainerModule {}
