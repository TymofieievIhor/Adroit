"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const NodeMailer = require("nodemailer");
const constant_1 = require("../env/constant");
const assert_1 = require("assert");
const transporter = NodeMailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: constant_1.TypedEnv.CONFIRM_EMAIL_ACCOUNT,
        pass: constant_1.TypedEnv.CONFIRM_EMAIL_PASSWORD,
    },
});
async function sendMail(mailOptions) {
    try {
        return await transporter.sendMail(mailOptions);
    }
    catch (e) {
        return assert_1.rejects(e);
    }
}
exports.sendMail = sendMail;
//# sourceMappingURL=transporter.js.map