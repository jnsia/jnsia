import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwtAuth.guard';

@Controller('user')
export class UserController {
  // 사용자 프로필 조회
  // JWT를 활용한 인가 테스트 api
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() request: any) {
    console.log(request);
    return request.user;
  }
}
