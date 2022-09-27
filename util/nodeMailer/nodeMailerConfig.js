import nodemailer from "nodemailer";
import { google } from "googleapis";

const OAuth2 = google.auth.OAuth2;

const OAuth2_client = new OAuth2(process.env.OAUTH_CLIENT_ID, process.env.OAUTH_CLIENT_SECRET);
OAuth2_client.setCredentials({refresh_token: process.env.OAUTH_REFRESH_TOKEN});

// General mailer function
export const sendMail = (recipient, subject, html, isConfirmMail) => {
    if(process.env.SEND_EMAILS === "true" || isConfirmMail === true) {

        return new Promise((resolve, reject) => {
    
            const accessToken = OAuth2_client.getAccessToken().catch(() => {
                console.log("For some reason accessToken rejects in testing");
                console.log("Also note that it is somehow not needed");
                console.log("More research on it is apparently required");
            });
    
            const transport = nodemailer.createTransport({
                service: "gmail",
                auth: {
                    type: "OAuth2",
                    user: process.env.OAUTH_USER_EMAIL,
                    clientId: process.env.OAUTH_CLIENT_ID,
                    clientSecret: process.env.OAUTH_CLIENT_SECRET,
                    refreshToken: process.env.OAUTH_REFRESH_TOKEN,
                    accessToken: accessToken
                }
            });
        
            const emailOptions = {
                from: `EngPot English <${process.env.OAUTH_USER_EMAIL}>`,
                to: recipient,
                subject: subject,
                html: html,
            };
        
            transport.sendMail(emailOptions, (error, result) => {
                if(error) {
                    console.log("Nodemailer Error: ", error);
                    transport.close();
                    resolve(false);
                } else {
                    console.log("Email sent: ", result)
                    transport.close();
                    resolve(true);
                }
            });
    
        });

    } else if(process.env.SEND_EMAILS === "false") {
        
        return new Promise ((resolve, reject) => {
            console.log("env.SENDMAILS is false.");
            resolve(true);
        });
    }

};

// Index page --> email me only
export const emailMe = (userToEmail) => {

    return new Promise((resolve, reject) => {

        const accessToken = OAuth2_client.getAccessToken().catch(() => {
            console.log("For some reason accessToken rejects in testing");
            console.log("Also note that it is somehow not needed");
            console.log("More research on it is apparently required");
        });

        const transport = nodemailer.createTransport({
            service: "gmail",
            auth: {
                type: "OAuth2",
                user: process.env.OAUTH_USER_EMAIL,
                clientId: process.env.OAUTH_CLIENT_ID,
                clientSecret: process.env.OAUTH_CLIENT_SECRET,
                refreshToken: process.env.OAUTH_REFRESH_TOKEN,
                accessToken: accessToken
            }
        });
    
        const emailOptions = {
            from: `EngPot English <${process.env.OAUTH_USER_EMAIL}>`,
            to: process.env.OAUTH_ADMIN_EMAIL,
            subject: `EngPot English - A new user to reach!`,
            html: `
                <h1>Greetings ${process.env.OAUTH_ADMIN_NAME}!</h1>
                <h2>Please reach out for our future user, ${userToEmail}!</h2>
                <h3>Thanks!</h3>
            `,
        };
    
        transport.sendMail(emailOptions, (error, result) => {
            if(error) {
                console.log("Nodemailer Error: ", error);
                transport.close();
                resolve(false);
            } else {
                console.log("Email sent: ", result)
                transport.close();
                resolve(true);
            }
        });

    });

};