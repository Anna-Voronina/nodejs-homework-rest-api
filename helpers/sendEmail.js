const nodemailer = require("nodemailer");

const { META_PASSWORD } = process.env;

const nodemailerConfig = {
  host: "smtp.meta.ua",
  port: 465,
  secure: true,
  auth: {
    user: "anna.voronina@meta.ua",
    pass: META_PASSWORD,
  },
  debug: true,
};

const transport = nodemailer.createTransport(nodemailerConfig);

const sendEmail = async (data) => {
  const email = { ...data, from: "anna.voronina@meta.ua" };
  await transport.sendMail(email);
  return true;
};

module.exports = sendEmail;
