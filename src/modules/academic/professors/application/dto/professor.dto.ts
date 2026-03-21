import type { Professor } from "@academic/professors/domain/models/professor.entity";

export class ProfessorDto {
  private constructor(
    public name: string,
    public email: string,
    public document: string,
    public specialty: string,
  ) {}

  public static fromProfessor(
    professor: Professor | null,
  ): ProfessorDto | null {
    if (!professor) return null;
    return new ProfessorDto(
      professor.name,
      professor.email,
      professor.document,
      professor.specialty,
    );
  }
}
