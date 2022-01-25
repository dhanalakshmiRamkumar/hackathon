const nodemailer = require('nodemailer')
const { google } = require ('googleapis')


// These id's and secrets should come from .env file.
const CLIENT_ID = '272967904612-5qdn4cqu8neqsh18hmbp5ftg06ct1748.apps.googleusercontent.com';

const CLEINT_SECRET = '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';

const REDIRECT_URI = 'https://developers.google.com/oauthplayground';
const REFRESH_TOKEN = '1//04d_Ct6FGztY-CgYIARAAGAQSNwF-L9Ir0JeppWJxaNHtfXesSEiITE6XOAbWLdfl8h9FWRMcZBaYOReXm-sFOFfOSinS64dLu9Q';


const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLEINT_SECRET,
  REDIRECT_URI
)

oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN })

async function sendMail() {
  try {
    const accessToken = await oAuth2Client.getAccessToken()

    const transport = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user:'dhana.ramkumar16@gmail.com',
        clientId: CLIENT_ID,
        clientSecret: CLEINT_SECRET,
        refreshToken: REFRESH_TOKEN,
        accessToken: accessToken,
      }
    })

    const mailOptions = {
      from: 'dhana <dhana.ramkumar16@gmail.com>',
      to: 'myhackathon@gmail.com',
      subject: 'Hello from gmail using API',
      text: 'Hello ,This is dhanalakshmi sending mail',
      html: '<h1>Hello ,This is dhanalakshmi sending mail</h1>',
    };

    const result = await transport.sendMail(mailOptions);
    return result;
  } catch (error) {
    return error;
  }
}

sendMail()
  .then((result) => console.log('Email sent...', result))
  .catch((error) => console.log(error.message));


  async function draftsendMail() {
    try {
      const accessToken = await oAuth2Client.getAccessToken();
  
      const transport = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          type: 'OAuth2',
          user: 'yours authorised email address',
          clientId: CLIENT_ID,
          clientSecret: CLEINT_SECRET,
          refreshToken: REFRESH_TOKEN,
          accessToken: accessToken,
        },
      });
  
      const mailOptions = {
        from: 'SENDER NAME <yours authorised email address@gmail.com>',
        to: 'to email address here',
        subject: 'Hello from gmail using API',
        text: 'Hello ,This is dhanalakshmi sending mail',
        html: '<h1>Hello ,This is dhanalakshmi sending mail</h1>',
      };
  
      const result = await transport.sendMail(mailOptions);
      return result;
    } catch (error) {
      return error;
    }
  }
  
  draftsendMail()
    .then((result) => console.log('Email sent...', result))
    .catch((error) => console.log(error.message));

