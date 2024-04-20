import { useState } from "react";
import OTPInput from "./otp-input";

const PhoneOtpForm = () => {
  const [phoneNumber, setPhoneNumber] = useState();
  const [showOtpInput, setShowOtpInput] = useState(false);

  const handlePhoneNumber = (e) => {
    setPhoneNumber(e.target.value);
  };
  const handleOnSubmit = (e) => {
    e.preventDefault();

    // phone validation;

    const regex = /[^0-9]/g;
    if (phoneNumber.length < 10 || regex.test(phoneNumber)) {
      alert("Invalid Phone Number");
      return;
    }

    //Call backend api
    // show otp input
    setShowOtpInput(true);
  };

  const onOTPSubmit = (otp) => {
    console.log("Login success!");
  };

  return (
    <div className="otpForm">
      <h1>Login with phone</h1>
      {!showOtpInput ? (
        <form onSubmit={handleOnSubmit}>
          <input
            type="text"
            value={phoneNumber}
            placeholder="Enter Phone Number"
            onChange={handlePhoneNumber}
          />
          <button type="submit">Submit</button>
        </form>
      ) : (
        <div>
          <p>Enter OTP sent to {phoneNumber}</p>
          <OTPInput length={4} onOTPSubmit={onOTPSubmit} />
        </div>
      )}
    </div>
  );
};

export default PhoneOtpForm;
