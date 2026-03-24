import { CreateUserDto, UpdateUserDto, type UserResponseDto } from "@users/application/dto/user.dto";
import { UserService } from "@users/application/services/user.service";
import { RequirePermissions } from "@shared/infra/decorators/permissions.decorator";
import { Permission } from "@shared/domain/enums/permission.enum";
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from "@nestjs/common";

@Controller("users")
export class UsersController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @RequirePermissions(Permission.USERS_READ)
  async findAll(): Promise<UserResponseDto[]> {
    const users = await this.userService.findAll();
    return users.map((user) => ({
      id: user.id!,
      email: user.email,
      teacherId: user.teacherId,
      permissions: user.permissions,
      createdAt: user.createdAt!,
      updatedAt: user.updatedAt!,
    }));
  }

  @Get(":id")
  @RequirePermissions(Permission.USERS_READ)
  async findById(@Param("id") id: string): Promise<UserResponseDto> {
    const user = await this.userService.findById(id);
    if (!user) {
      throw new Error("User not found");
    }
    return {
      id: user.id!,
      email: user.email,
      teacherId: user.teacherId,
      permissions: user.permissions,
      createdAt: user.createdAt!,
      updatedAt: user.updatedAt!,
    };
  }

  @Post()
  @RequirePermissions(Permission.USERS_WRITE)
  async create(@Body() body: CreateUserDto): Promise<void> {
    return this.userService.create(body);
  }

  @Put(":id")
  @RequirePermissions(Permission.USERS_WRITE)
  async update(@Param("id") id: string, @Body() body: UpdateUserDto): Promise<void> {
    return this.userService.update(id, body);
  }

  @Delete(":id")
  @RequirePermissions(Permission.USERS_DELETE)
  async remove(@Param("id") id: string): Promise<void> {
    return this.userService.delete(id);
  }
}
