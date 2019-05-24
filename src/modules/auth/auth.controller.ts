import {Body, Controller, Post, Req} from '@nestjs/common';
import {AuthService} from './auth.service';
import {ApiUseTags, ApiOperation} from '@nestjs/swagger';
import {SignInDto} from './dto/sign-in.dto';
import { SendConfirmationEmailDto } from './dto/send-confirmation-email.dto';
import { ConfirmEmailDto } from './dto/confirm-email.dto';
import { SignInResponseDto } from './dto/sign-in-response.dto';

@ApiUseTags('auth')
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {
    }

    @Post('/sign-in')
    async signIn(@Body() body: SignInDto, @Req() req: any) {
        return await this.authService.signIn(body, req);
    }

    @Post('/send-confirmation-email')
    @ApiOperation({title: 'Send confirmation email after the new password is set'})
    async sendConfirmationEmail(@Body() body: SendConfirmationEmailDto): Promise<void> {
        await this.authService.sendConfirmationEmail(body);
    }

    @Post('/confirm-email')
    @ApiOperation({title: 'Confirm the email'})
    async confirmEmail(@Body() body: ConfirmEmailDto): Promise<SignInResponseDto> {
        return await this.authService.confirmEmail(body);
    }
}
