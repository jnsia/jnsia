import {
  Body,
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDTO } from './dto/signUp.dto';
import { LogInDTO } from './dto/logIn.dto';
import { LocalAuthGuard } from './localAuth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  // 로그인
  @UseGuards(LocalAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Post('login')
  login(@Body() logInDTO: LogInDTO) {
    return this.authService.login(logInDTO);
  }

  // 회원가입
  @HttpCode(HttpStatus.CREATED)
  @Post('signUp')
  signUp(@Body() signUpDTO: SignUpDTO) {
    return this.authService.signUp(signUpDTO);
  }

  // 토큰 재발급
  @HttpCode(HttpStatus.ACCEPTED)
  @Post('refreshToken')
  async refresh(@Body('refresh_token') refreshToken: string) {
    return this.authService.refreshToken(refreshToken);
  }
}
