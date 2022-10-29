import nodemailer from "nodemailer";
import { google } from "googleapis";

const OAuth2 = google.auth.OAuth2;

const OAuth2_client = new OAuth2(
  process.env.OAUTH_CLIENT_ID,
  process.env.OAUTH_CLIENT_SECRET
);
OAuth2_client.setCredentials({
  refresh_token: process.env.OAUTH_REFRESH_TOKEN,
});

const mail = ({ recipient, subject, html, isConfirmationEmail}) => {
  if (process.env.MAILING_SYSTEM === "active" || isConfirmationEmail === true) {
    return new Promise((resolve, reject) => {
      const accessToken = OAuth2_client.getAccessToken().catch((error) => {
        // console.log(error);
      });

      const transport = nodemailer.createTransport({
        service: "gmail",
        auth: {
          type: "OAuth2",
          user: process.env.OAUTH_ENGPOT_EMAIL,
          clientId: process.env.OAUTH_CLIENT_ID,
          clientSecret: process.env.OAUTH_CLIENT_SECRET,
          refreshToken: process.env.OAUTH_REFRESH_TOKEN,
          accessToken: accessToken,
        },
      });

      const emailOptions = {
        from: `EngPot English <${process.env.OAUTH_ENGPOT_EMAIL}>`,
        to: recipient,
        subject: subject,
        html: html,
      };

      transport.sendMail(emailOptions, (error, result) => {
        if (error) {
          console.log("Nodemailer Error: ", error);
          transport.close();
          resolve(false);
        } else {
          console.log("Email sent: ", result);
          transport.close();
          resolve(true);
        }
      });
    });
  } else if (process.env.MAILING_SYSTEM === "inactive") {
    return new Promise((resolve, reject) => {
      console.log("env.MAILING_SYSTEM is inactive.");
      resolve(true);
    });
  }
};

export default mail;
