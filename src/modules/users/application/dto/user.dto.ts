import { IsEmail, IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator";

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsString()
  @IsOptional()
  teacherId?: string;

  @IsNotEmpty()
  permissions: string[];
}

export class UpdateUserDto {
  @IsEmail()
  @IsOptional()
  email?: string;

  @IsString()
  @MinLength(6)
  @IsOptional()
  password?: string;

  @IsString()
  @IsOptional()
  teacherId?: string;

  @IsNotEmpty()
  @IsOptional()
  permissions?: string[];
}

export class UserResponseDto {
  id: string;
  email: string;
  teacherId?: string;
  permissions: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface UserPayload {
  id: string;
  email: string;
  permissions: string[];
}
