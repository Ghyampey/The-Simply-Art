const nodemailer = require("nodemailer");

let mailTransporter = nodemailer.createTransport({
    pool: {
        maxConnections: 1,  // change this number to the maximum allowed by your SMTP server
        maxMessages: Infinity,
        rateDelta: 1000,
        rateLimit: 4
      },
    service: "gmail",
    auth: {
        user: "ashketcham312@gmail.com",
        pass: "nsaq tfzw lzqk pgrr",
    },
});

let details = {
    from: "ashketcham312@gmail.com",
    to: "sojoktosushant@gmail.com",
    subject: "Test email",
    text: "testing first email",
};
mailTransporter.sendMail(details, (err) => {
    if (err) {
        console.log("Error", err);
    } else {
        console.log("sent");
    }
});
