import { HttpException, HttpStatus } from '@nestjs/common';

export class UserExistedException extends HttpException {
  constructor() {
    super('해당 아이디는 사용 중입니다.', HttpStatus.CONFLICT);
  }
}