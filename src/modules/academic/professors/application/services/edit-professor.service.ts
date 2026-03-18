import type { ProfessorDto } from "@academic/professors/application/dto/professor.dto";
import {
  PROFESSOR_REPOSITORY,
  type ProfessorRepository,
} from "@academic/professors/domain/repositories/professor-repository.interface";
import {
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
} from "@nestjs/common";

@Injectable()
export class EditProfessorService {
  constructor(
    @Inject(PROFESSOR_REPOSITORY)
    private readonly professorRepository: ProfessorRepository,
  ) {}

  async execute(id: string, dto: ProfessorDto): Promise<void> {
    const professor = await this.professorRepository.findById(id);

    if (!professor) {
      throw new NotFoundException("Professor not found");
    }

    if (dto.email && dto.email !== professor.email) {
      const existing = await this.professorRepository.findByEmail(dto.email);

      if (existing) {
        throw new ConflictException("Email already registered");
      }
    }

    professor
      .withName(dto.name)
      .withEmail(dto.email)
      .withDocument(dto.document)
      .withSpecialty(dto.specialty);
    await this.professorRepository.update(professor!);
  }
}
