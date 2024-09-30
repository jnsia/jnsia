import { HttpException, HttpStatus } from "@nestjs/common";

export class TokenExpiredException extends HttpException {
    constructor() {
        super('토큰이 만료되었습니다.', HttpStatus.FORBIDDEN);
      }
}