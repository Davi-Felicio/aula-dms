import { Module } from '@nestjs/common'
import { ProfessorsController } from '../../../../../professors.controller'
import { CreateProfessorService } from '../../application/dto/services/create-professor.service'

@Module({
  controllers: [ProfessorsController],
  providers: [CreateProfessorService],
})
export class ProfessorsModule {}