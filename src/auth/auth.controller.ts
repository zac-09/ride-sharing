import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  HttpException,
  HttpStatus,
  Req,
  Res,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport/dist/auth.guard';
import { RegisterDTO } from 'src/user/register.dto';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';
import { LoginDTO } from './login.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private userService: UserService,
    private authService: AuthService,
  ) {}

  @Get('/me')
  @UseGuards(AuthGuard('jwt'))
  async getMyProfile(@Req() req: any) {
    const user = req.user;
    return user;
  }
  @Post('/markAvailable')
  @UseGuards(AuthGuard('jwt'))
  async markAvailable(@Req() req: any, @Res() res: any) {
    const user = await this.userService.markAvailable(req.user._id);
    res.status(200).json(user);
  }
  @Post('/markUnavailable')
  @UseGuards(AuthGuard('jwt'))
  async markUnavailable(@Req() req: any, @Res() res: any) {
    const user = await this.userService.markUnavailable(req.user._id);
    res.status(200).json(user);
  }

  @Post('register')
  async register(@Body() registerDTO: RegisterDTO) {
    try {
      const user = await this.userService.create(registerDTO);
      const payload = {
        email: user.email,
      };

      const token = await this.authService.signPayload(payload);
      return { user, token };
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: error.message,
        },
        HttpStatus.FORBIDDEN,
        {
          cause: error,
        },
      );
    }
  }
  @Post('login')
  async login(@Body() loginDTO: LoginDTO) {
    const user = await this.userService.findByLogin(loginDTO);
    const payload = {
      email: user.email,
    };
    const token = await this.authService.signPayload(payload);
    return { user, token };
  }
}
