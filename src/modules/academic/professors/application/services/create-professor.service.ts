import { ProfessorDto } from "@academic/professors/application/dto/professor.dto";
import { Professor } from "@academic/professors/domain/models/professor.entity";
import {
  PROFESSOR_REPOSITORY,
  type ProfessorRepository,
} from "@academic/professors/domain/repositories/professor-repository.interface";
import { ConflictException, Inject, Injectable } from "@nestjs/common";

@Injectable()
export class CreateProfessorService {
  constructor(
    @Inject(PROFESSOR_REPOSITORY)
    private readonly professorRepository: ProfessorRepository,
  ) {}

  async execute(dto: ProfessorDto): Promise<void> {
    const existing = await this.professorRepository.findByEmail(dto.email);
    if (existing) {
      throw new ConflictException("Email already registered");
    }
    const professor = Professor.restore(dto);
    await this.professorRepository.create(professor!);
  }
}
