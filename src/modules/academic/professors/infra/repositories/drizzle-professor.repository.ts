import { Professor } from "@academic/professors/domain/models/professor.entity";
import type { ProfessorRepository } from "@academic/professors/domain/repositories/professor-repository.interface";
import { DrizzleService } from "@infra/database/drizzle.service";
import { Injectable } from "@nestjs/common";
import { eq } from "drizzle-orm";
import { professorsSchema } from "../database/schemas/professor.schema";

@Injectable()
export class DrizzleProfessorRepository implements ProfessorRepository {
  constructor(private readonly drizzleService: DrizzleService) {}

  async create(professor: Professor): Promise<void> {
    await this.drizzleService.db.insert(professorsSchema).values({
      name: professor.name,
      email: professor.email,
      document: professor.document,
      specialty: professor.specialty,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }

  async update(professor: Professor): Promise<void> {
    await this.drizzleService.db
      .update(professorsSchema)
      .set({
        name: professor.name,
        email: professor.email,
        document: professor.document,
        specialty: professor.specialty,
        updatedAt: new Date(),
      })
      .where(eq(professorsSchema.id, professor.id!));
  }

  async delete(id: string): Promise<void> {
    await this.drizzleService.db
      .delete(professorsSchema)
      .where(eq(professorsSchema.id, id));
  }

  async findById(id: string): Promise<Professor | null> {
    const result = await this.drizzleService.db
      .select()
      .from(professorsSchema)
      .where(eq(professorsSchema.id, id))
      .limit(1);

    return Professor.restore(result[0]);
  }

  async findByEmail(email: string): Promise<Professor | null> {
    const result = await this.drizzleService.db
      .select()
      .from(professorsSchema)
      .where(eq(professorsSchema.email, email.toLowerCase()))
      .limit(1);

    return Professor.restore(result[0]);
  }

  async findAll(): Promise<Professor[]> {
    const rows = await this.drizzleService.db.select().from(professorsSchema);
    return rows.map((row) => Professor.restore(row)!);
  }
}
