import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthRegisterDto } from './models/dto/auth-register.dto';
import { AuthLoginDto } from './models/dto/auth-login.dto';
import { ForgotPasswordDto } from './models/dto/forget-password.dto';

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  create(@Body() authRegisterDto:AuthRegisterDto) {
    return this.authService.register(authRegisterDto);
  }
  @Post('login')
  async login(@Body() authLoginDto: AuthLoginDto) {
      return this.authService.login(authLoginDto);
  }
  @Post('forgot-password')
    async forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDto) {
        return this.authService.forgotPassword(forgotPasswordDto);
    }
}
