import { CreateProfessorService } from "@academic/professors/application/services/create-professor.service";
import { EditProfessorService } from "@academic/professors/application/services/edit-professor.service";
import { ListProfessorsService } from "@academic/professors/application/services/list-professors.service";
import { RemoveProfessorService } from "@academic/professors/application/services/remove-professor.service";
import { ReturnProfessorService } from "@academic/professors/application/services/return-professor.service";
import { PROFESSOR_REPOSITORY } from "@academic/professors/domain/repositories/professor-repository.interface";
import { ProfessorsController } from "@academic/professors/infra/controllers/professors.controller";
import { DrizzleProfessorRepository } from "@academic/professors/infra/repositories/drizzle-professor.repository";
import { DatabaseModule } from "@infra/database/database.module";
import { Module } from "@nestjs/common";

@Module({
  imports: [DatabaseModule],
  controllers: [ProfessorsController],
  providers: [
    CreateProfessorService,
    EditProfessorService,
    ListProfessorsService,
    ReturnProfessorService,
    RemoveProfessorService,
    DrizzleProfessorRepository,
    {
      provide: PROFESSOR_REPOSITORY,
      useExisting: DrizzleProfessorRepository,
    },
  ],
})
export class ProfessorsModule {}
