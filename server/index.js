import express from "express";
import cors from "cors";
import nodemailer from "nodemailer";
import otplib from "otplib";

const secret = otplib.authenticator.generateSecret();
const app = express();
app.use(express.json());
app.use(cors());
const PORT = 8000;

const transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  secure: false, // Use `true` for port 465, `false` for all other ports
  auth: {
    user: "leann97@ethereal.email",
    pass: "Y4e8XM1dU7fyz7qW2m",
  },
});
//Generate an OTP
const generateOTP = () => {
  return otplib.authenticator.generate(secret);
};

let newOtp;

//Function to send OTP vis SMS
const sendOTP = async (email, otp) => {
  try {
    const info = await transporter.sendMail({
      from: "leann97@ethereal.email",
      to: email,
      subject: "Your OTP",
      text: `Your OTP is ${otp}`,
    });
    console.log("OTP sent successfully", info);
  } catch (error) {
    console.error("Failed to send OTP:", error);
    throw error;
  }
};

app.post("/sendOtp", (req, res) => {
  let { email } = req.body;
  if (!email) {
    return res.status(400).json({ error: "Email is required!" });
  }

  const otp = generateOTP();

  sendOTP(email, otp)
    .then(() => {
      newOtp = otp;
      res.json({ otp, message: "OTP sent successfully" });
    })
    .catch((error) => {
      console.error("Error sending OTP:", error);
      res.status(500).json({ error: "FAILED to send OTP" });
    });
});

app.post("/verifyOtp", (req, res) => {
  const otp = req.body.otp;

  if (!otp) return res.status(400).json({ error: "OTP is required" });

  if (!newOtp) return res.status(400).json({ error: "No OTP found" });

  if (otp === newOtp) {
    res.json({ message: "OTP verified successfully" });
  } else {
    res.status(400).json({ error: "Invalid OTP" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
