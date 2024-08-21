import { Router } from "express";
// import { EmailManager } from "../../third-party/EmailManager";
import { Login, Signup, ForgotPassword, ResetPassword } from "./services";

export const AUTHENTICATION_ROUTE = "/authentication";
export const AuthenticationRouter = Router();

export const RESET_TOKEN_EXPIRATION_TIME = 60 * 60 * 1000;

AuthenticationRouter.post(`${AUTHENTICATION_ROUTE}/signup`, Signup);
AuthenticationRouter.post(`${AUTHENTICATION_ROUTE}/login`, Login);

// UNTESTED!
AuthenticationRouter.post(
    `${AUTHENTICATION_ROUTE}/forgot-password`,
    ForgotPassword(RESET_TOKEN_EXPIRATION_TIME, (_props) => {
        // EmailManager.Send({
        //     receiver: props.email,
        //     title: "Password Reset Token",
        //     text:
        //         `This is your password reset token: "${props.resetToken}".\n` +
        //         "If you didn't ask for this, please ignore this message.",
        // });
        //
        // console.log(props.resetToken);
    }),
);
// UNTESTED!
AuthenticationRouter.post(
    `${AUTHENTICATION_ROUTE}/reset-password`,
    ResetPassword,
);
