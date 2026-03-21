import { Body, Controller, Post } from "@nestjs/common";
import { ProfessorDto } from "./modules/academic/professors/application/dto/professor.dto";
import { CreateProfessorService } from "./modules/academic/professors/application/dto/services/create-professor.service";

@Controller("professors")
export class ProfessorsController {
  constructor(private createProfessor: CreateProfessorService) {}

  @Post()
  create(@Body() body: ProfessorDto) {
    return this.createProfessor.execute(body);
  }
}
