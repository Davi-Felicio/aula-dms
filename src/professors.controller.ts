import { Body, Controller, Post } from '@nestjs/common'
import { CreateProfessorService } from './modules/academic/professors/application/dto/services/create-professor.service'
import { ProfessorDto } from './modules/academic/professors/application/dto/professor.dto'

@Controller('professors')
export class ProfessorsController {

  constructor(private createProfessor: CreateProfessorService) {}

  @Post()
  create(@Body() body: ProfessorDto) {
    return this.createProfessor.execute(body)
  }

}   