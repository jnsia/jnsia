import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class LocalAuthGuard extends AuthGuard('lsocal') {
  constructor() {
    super();
  }

  canActivate(context: ExecutionContext) {
    const request: Request = context.switchToHttp().getRequest();
    const { username, password }: any = request.body;

    // null 값인지 확인
    if (username && password) {
      return super.canActivate(context);
    } else {
      throw new UnauthorizedException('입력 정보를 다시 확인해주세요.');
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  handleRequest(err: any, user: any, info: any) {
    throw err || new UnauthorizedException('Invalid credentials');
    return user;
  }
}
