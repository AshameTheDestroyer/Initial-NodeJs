import nodemailer, { Transporter } from "nodemailer";

export class EmailManager {
    private static _instance: EmailManager = new EmailManager();

    private _email: string;
    private _transporter: Transporter;

    public static get instance() {
        return this._instance;
    }

    private constructor() {
        if (
            process.env["NODEMAILER_EMAIL"] == null ||
            process.env["NODEMAILER_PASSWORD"] == null
        ) {
            throw new Error(
                'Environment variables "EMAIL & EMAIL_PASSWORD" aren\'t set.',
            );
        }

        this._transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                pass: process.env["NODEMAILER_PASSWORD"],
                user: (this._email = process.env["NODEMAILER_EMAIL"]),
            },
        });
    }

    public static Send(props: {
        text: string;
        title: string;
        receiver: string;
    }) {
        this.instance._transporter.sendMail(
            {
                text: props.text,
                to: props.receiver,
                subject: props.title,
                from: this.instance._email,
            },
            (error, info) =>
                error
                    ? console.error(error)
                    : console.log(`Email sent: ${info.response}`),
        );
    }
}
