import { AuthService } from "@auth/auth.service.js";
import { Body, Controller, Post } from "@nestjs/common";
import { Public } from "@shared/infra/decorators/public.decorator.js";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("login")
  @Public()
  login(@Body() body: { email: string; password: string }) {
    return this.authService.login(body.email, body.password);
  }
}
