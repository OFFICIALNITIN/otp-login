import { useState } from "react";
import OTPInput from "./otp-input";
import axios from "axios";

const PhoneOtpForm = () => {
  const [email, setEmail] = useState();
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [verified, setVerified] = useState(false);

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
      setVerified(true);
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
        <div className="EmailForm">
          {!verified ? (
            <div>
              <p>Enter OTP sent to {email}</p>
              <OTPInput length={6} onOTPSubmit={onOTPSubmit} />
            </div>
          ) : (
            <div>
              <h3 className="verified">Verified</h3>
              <img
                width="48"
                height="48"
                src="https://img.icons8.com/color/48/verified-account--v1.png"
                alt="verified-account--v1"
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PhoneOtpForm;
