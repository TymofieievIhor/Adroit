interface MailOptions {
    from: string;
    to: string;
    subject: string;
    html: string;
}
export declare function sendMail(mailOptions: MailOptions): Promise<any>;
export {};
