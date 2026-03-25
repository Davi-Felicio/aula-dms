import { StudentDto } from "@academic/students/application/dto/student.dto";
import { CreateStudentService } from "@academic/students/application/services/create-student.service";
import { EditStudentService } from "@academic/students/application/services/edit-student.service";
import { ListStudentsService } from "@academic/students/application/services/list-students.service";
import { RemoveStudentService } from "@academic/students/application/services/remove-student.service";
import { ReturnStudentService } from "@academic/students/application/services/return-student.service";
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

@Controller("students")
export class StudentsController {
  constructor(
    private readonly createStudentService: CreateStudentService,
    private readonly editStudentService: EditStudentService,
    private readonly listStudentService: ListStudentsService,
    private readonly returnStudentService: ReturnStudentService,
    private readonly removeStudentService: RemoveStudentService,
  ) {}

  @Get()
  @RequirePermissions(Permission.STUDENTS_READ)
  async findAll() {
    return this.listStudentService.execute();
  }

  @Get(":id")
  @RequirePermissions(Permission.STUDENTS_READ)
  async findById(@Param("id") id: string) {
    return this.returnStudentService.executeById(id);
  }

  @Post()
  @RequirePermissions(Permission.STUDENTS_WRITE)
  async create(@Body() body: StudentDto) {
    return this.createStudentService.execute(body);
  }

  @Put(":id")
  @RequirePermissions(Permission.STUDENTS_WRITE)
  async update(@Param("id") id: string, @Body() body: StudentDto) {
    return this.editStudentService.execute(id, body);
  }

  @Delete(":id")
  @RequirePermissions(Permission.STUDENTS_DELETE)
  async remove(@Param("id") id: string) {
    return this.removeStudentService.execute(id);
  }
}
