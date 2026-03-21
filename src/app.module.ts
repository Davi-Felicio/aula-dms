import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { ProfessorsModule } from "./modules/academic/professors/professors.module";
import { StudentsModule } from "./modules/academic/students/students.module";
import { DatabaseModule } from "./shared/infra/database/database.module";

@Module({
  imports: [
    ConfigModule.forRoot(),
    ProfessorsModule,
    StudentsModule,
    DatabaseModule,
  ],
})
export class AppModule {}
