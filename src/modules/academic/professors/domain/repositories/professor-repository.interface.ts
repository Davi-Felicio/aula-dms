import type { Professor } from "@academic/professors/domain/models/professor.entity";

export const PROFESSOR_REPOSITORY = Symbol("PROFESSOR_REPOSITORY");

export interface ProfessorRepository {
  create(professor: Professor): Promise<void>;
  update(professor: Professor): Promise<void>;
  delete(id: string): Promise<void>;
  findAll(): Promise<Professor[]>;
  findById(id: string): Promise<Professor | null>;
  findByEmail(email: string): Promise<Professor | null>;
}
