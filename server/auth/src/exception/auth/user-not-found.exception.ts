import { HttpException, HttpStatus } from '@nestjs/common';

export class UserNotFoundException extends HttpException {
  constructor() {
    super('해당 아이디는 가입되지 않았습니다.', HttpStatus.NOT_FOUND);
  }
}