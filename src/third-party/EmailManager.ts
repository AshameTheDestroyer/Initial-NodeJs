import nodemailer, { Transporter } from "nodemailer";

export class EmailManager {
    private static _instance: EmailManager;

    private email: string;
    private transporter: Transporter;

    public static get Instance() {
        return (this._instance ??= new EmailManager());
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

        this.transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                pass: process.env["NODEMAILER_PASSWORD"],
                user: (this.email = process.env["NODEMAILER_EMAIL"]),
            },
        });
    }

    public static Send(props: {
        text: string;
        title: string;
        receiver: string;
    }) {
        this.Instance.transporter.sendMail(
            {
                text: props.text,
                to: props.receiver,
                subject: props.title,
                from: this.Instance.email,
            },
            (error, info) =>
                error
                    ? console.error(error)
                    : console.log(`Email sent: ${info.response}`),
        );
    }
}
