const sendGridEmail = require('@sendgrid/mail')
sendGridEmail.setApiKey(process.env.SENDGRID_API_KEY)


async function sendVerificationEmail(email, verificationToken) {
    const msg = {
        to: email, // Change to your recipient
        from: 'savchenko.lex@gmail.com', // Change to your verified sender
        subject: 'Verify you mail',
        text: `Verification link: ${process.env.BASE_URL}/api/users/verify/${verificationToken}`,
        html: `<h2>Just one step</h2>
              <p>
              <a href="${process.env.BASE_URL}/api/users/verify/${verificationToken}" target="_blank">
              Just follow the link and you will see how deep the rabbit hole is. 
              </a></p>`,
      };

      sendGridEmail
        .send(msg)
        .then(() => {
          console.log('Email sent')
        })
        .catch((error) => {
          console.error(error)
        });

    return; 
}

module.exports = sendVerificationEmail;

