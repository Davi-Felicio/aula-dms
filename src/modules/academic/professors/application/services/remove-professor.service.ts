import {
  PROFESSOR_REPOSITORY,
  type ProfessorRepository,
} from "@academic/professors/domain/repositories/professor-repository.interface";
import { Inject, Injectable } from "@nestjs/common";

@Injectable()
export class RemoveProfessorService {
  constructor(
    @Inject(PROFESSOR_REPOSITORY)
    private readonly professorRepository: ProfessorRepository,
  ) {}

  async execute(id: string): Promise<void> {
    await this.professorRepository.delete(id);
  }
}
