"use strict";
require("dotenv").config();
const nodemailer = require("nodemailer");

module.exports.sendEmail = async (event) => {
  const data = JSON.parse(event.body);
  const { email, body } = data;
  try {
    // Configurar el transporte SMTP para enviar el correo electrónico
    const transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.nodemailer_user,
        pass: process.env.nodemailer_pss,
      },
    });

    // Configurar el mensaje de correo electrónico
    let mailOptions = {
      from: process.env.nodemailer_user,
      to: "mauriciomaldo.14@gmail.com",
      subject: "Nueva Oferta!!!",
      text: body + "",
      cc: "lourdes.barreto0126@gmail.com",
    };

    // Enviar el correo electrónico
    await transporter.sendMail(mailOptions);
    mailOptions = {
      from: process.env.nodemailer_user,
      to: email,
      subject: "Nueva Puja!!!",
      text: "Tu oferta se ha enviado exitosamente! " + "\n" + body,
    };
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.log(error);
    return {
      statusCode: 400,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
      },
      body: JSON.stringify({ error }),
    };
  }
  return {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true,
    },
    body: JSON.stringify({
      message: "Puja realizada",
    }),
  };
};
