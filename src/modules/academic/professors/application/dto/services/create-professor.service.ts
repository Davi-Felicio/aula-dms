import { Injectable } from "@nestjs/common";
import { ProfessorDto } from "../professor.dto";

@Injectable()
export class CreateProfessorService {
  execute(data: ProfessorDto) {
    const professor = {
      id: crypto.randomUUID(),
      ...data,
    };

    return professor;
  }
}
