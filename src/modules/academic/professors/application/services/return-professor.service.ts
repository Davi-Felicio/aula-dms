import { ProfessorDto } from "@academic/professors/application/dto/professor.dto";
import {
  PROFESSOR_REPOSITORY,
  type ProfessorRepository,
} from "@academic/professors/domain/repositories/professor-repository.interface";
import { Inject, Injectable } from "@nestjs/common";

@Injectable()
export class ReturnProfessorService {
  constructor(
    @Inject(PROFESSOR_REPOSITORY)
    private readonly professorRepository: ProfessorRepository,
  ) {}

  async executeById(id: string): Promise<ProfessorDto | null> {
    const response = await this.professorRepository.findById(id);
    return ProfessorDto.fromProfessor(response);
  }

  async executeByEmail(email: string): Promise<ProfessorDto | null> {
    const response = await this.professorRepository.findByEmail(email);
    return ProfessorDto.fromProfessor(response);
  }
}
