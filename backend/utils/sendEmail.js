const nodemailer=require("nodemailer");

const sendEmail=async(options)=>{
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        service:process.env.SMPT_SERVICE,
        secure: false, // true for 465, false for other ports
        auth: {
          user: process.env.SMPT_MAIL,
          pass: process.env.SMPT_PASSWORD,
        },
      });
  
      const message = {
        from: process.env.SMPT_MAIL, // sender address
        to: options.email,
        subject:options.subject,
        text: options.message,
        html: options.message,
      };
  
      await transporter.sendMail(message);
      
};

module.exports=sendEmail;