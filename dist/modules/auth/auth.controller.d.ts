import { AuthService } from './auth.service';
import { SignInDto } from './dto/sign-in.dto';
import { SendConfirmationEmailDto } from './dto/send-confirmation-email.dto';
import { ConfirmEmailDto } from './dto/confirm-email.dto';
import { SignInResponseDto } from './dto/sign-in-response.dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    signIn(body: SignInDto, req: any): Promise<SignInResponseDto>;
    sendConfirmationEmail(body: SendConfirmationEmailDto): Promise<void>;
    confirmEmail(body: ConfirmEmailDto): Promise<SignInResponseDto>;
}
