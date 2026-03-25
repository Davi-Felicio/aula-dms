import { ProfessorDto } from "@academic/professors/application/dto/professor.dto";
import { CreateProfessorService } from "@academic/professors/application/services/create-professor.service";
import { EditProfessorService } from "@academic/professors/application/services/edit-professor.service";
import { ListProfessorsService } from "@academic/professors/application/services/list-professors.service";
import { RemoveProfessorService } from "@academic/professors/application/services/remove-professor.service";
import { ReturnProfessorService } from "@academic/professors/application/services/return-professor.service";
import { Permission } from "@shared/domain/enums/permission.enum";
import { RequirePermissions } from "@shared/infra/decorators/permissions.decorator";
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from "@nestjs/common";

@Controller("professors")
export class ProfessorsController {
  constructor(
    private readonly createProfessorService: CreateProfessorService,
    private readonly editProfessorService: EditProfessorService,
    private readonly listProfessorService: ListProfessorsService,
    private readonly returnProfessorService: ReturnProfessorService,
    private readonly removeProfessorService: RemoveProfessorService,
  ) {}

  @Get()
  @RequirePermissions(Permission.TEACHERS_READ)
  async findAll() {
    return this.listProfessorService.execute();
  }

  @Get(":id")
  @RequirePermissions(Permission.TEACHERS_READ)
  async findById(@Param("id") id: string) {
    return this.returnProfessorService.executeById(id);
  }

  @Post()
  @RequirePermissions(Permission.TEACHERS_WRITE)
  async create(@Body() body: ProfessorDto) {
    return this.createProfessorService.execute(body);
  }

  @Put(":id")
  @RequirePermissions(Permission.TEACHERS_WRITE)
  async update(@Param("id") id: string, @Body() body: ProfessorDto) {
    return this.editProfessorService.execute(id, body);
  }

  @Delete(":id")
  @RequirePermissions(Permission.TEACHERS_DELETE)
  async remove(@Param("id") id: string) {
    return this.removeProfessorService.execute(id);
  }
}
