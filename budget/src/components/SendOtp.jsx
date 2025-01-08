import React, { useState } from 'react';
import emailjs from 'emailjs-com';

const SendOTP = () => {
  const [otp, setOtp] = useState('');

  // Function to generate a random OTP
  const generateOtp = () => {
    const otp = Math.floor(100000 + Math.random() * 900000); // 6-digit OTP
    setOtp(otp);
    return otp;
  };

  // Function to send the OTP email
  const sendEmail = (e) => {
    e.preventDefault();

    const generatedOtp = generateOtp();

    // EmailJS parameters
    // const templateParams = {
    //   to_email: 'shelkeaadish@gmail.com', // Hardcoded your email
    //   otp: generatedOtp,
    // };
            const templateParams = {
              to_email: 'shelkeaadish@gmail.com', // Hardcoded your email
              otp: generatedOtp,
              user_name: 'Aadish',
            //   payment_amount: amount,
              company_name: 'SpendWise',
            };

    emailjs.send(
      'service_p8fxfi4',       // Replace with your EmailJS service ID
      'template_ynus4qt',      // Replace with your EmailJS template ID
      templateParams,
      '0rZIfW0DCmwL2bg0G'           // Replace with your EmailJS user ID
    ).then((result) => {
        console.log('Email sent successfully!', result.text);
    }, (error) => {
        console.error('Error in sending email:', error.text);
    });
  };

  return (
    <div>
      {/* <h2>Send OTP to Aadish</h2> */}
      <form onSubmit={sendEmail}>
        <button type="submit">Send OTP</button>
      </form>
    </div>
  );
};

export default SendOTP;
