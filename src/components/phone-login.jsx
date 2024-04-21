import { useState } from "react";
import OTPInput from "./otp-input";
import axios from "axios";

const PhoneOtpForm = () => {
  const [email, setEmail] = useState();
  const [showOtpInput, setShowOtpInput] = useState(false);

  const handlePhoneNumber = (e) => {
    setEmail(e.target.value);
  };
  console.log(email);
  const handleOnSubmit = async (e) => {
    e.preventDefault();

    // phone validation;

    // const regex = /[^0-9]/g;
    // if (phoneNumber.length < 10 || regex.test(phoneNumber)) {
    //   alert("Invalid Phone Number");
    //   return;
    // }

    try {
      const res = await axios.post("http://localhost:8000/sendOtp", {
        email: email,
      });
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }

    //Call backend api
    // show otp input
    setShowOtpInput(true);
  };

  const onOTPSubmit = async (otp) => {
    console.log(otp);
    try {
      const res = await axios.post("http://localhost:8000/verifyOtp", {
        otp: otp,
      });
      console.log(res.data, "Login successfull!");
    } catch (error) {
      console.log(error);
    }
    console.log("Login success!");
  };

  return (
    <div className="otpForm">
      <h1>Login with email</h1>
      {!showOtpInput ? (
        <form onSubmit={handleOnSubmit}>
          <input
            type="email"
            value={email}
            placeholder="Enter email"
            onChange={handlePhoneNumber}
          />
          <button type="submit">Submit</button>
        </form>
      ) : (
        <div>
          <p>Enter OTP sent to {email}</p>
          <OTPInput length={6} onOTPSubmit={onOTPSubmit} />
        </div>
      )}
    </div>
  );
};

export default PhoneOtpForm;
