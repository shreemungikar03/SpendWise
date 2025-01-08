import React, { useState } from 'react';
import axios from 'axios';
import emailjs from 'emailjs-com';


const BudgetEntry = () => {
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [result, setResult] = useState('');




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





  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

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
//   };


    // Get the current date in YYYY-MM-DD format
    const currentDate = new Date().toISOString().split('T')[0];

    // try {
      const response = await axios.post('http://localhost:5000/classify_budget', {
        amount: parseFloat(amount),
        category,
        date: currentDate, // Pass current date
      });

      setResult(response.data.result); // Set the result from the response
    // } catch (error) {
    //   console.error('Error classifying budget:', error);
    //   setResult('An error occurred while classifying the budget.');
    // }
  };

  return (
    <div >
      {/* <h2>Budget Entry</h2> */}
      <form onSubmit={handleSubmit} >
        <div >
          <label>Amount:</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Category:</label>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          />
        </div>
        <button type="submit" style={{marginTop : '10px'}} className='btn btn--dark'>Submit</button>
      </form>
      {/* <form onSubmit={sendEmail}>
        <button type="submit">Send OTP</button>
      </form> */}
      {result===0 && <p>High amount for the category , for payment submit OTP sent on your email to verify</p>}
      {result===1 && <p>You can proceed with the payment</p>}
    </div>  
  );
};

export default BudgetEntry;


// import React, { useState } from 'react';
// import axios from 'axios';
// import emailjs from 'emailjs-com';

// const BudgetEntry = () => {
//   const [amount, setAmount] = useState('');
//   const [category, setCategory] = useState('');
//   const [result, setResult] = useState(null); // Initialize result as null

//   // Function to generate a random OTP
//   const generateOtp = () => {
//     return Math.floor(100000 + Math.random() * 900000); // 6-digit OTP
//   };

//   // Function to send the OTP email
//   const sendEmail = (otp) => {
//     const templateParams = {
//       to_email: 'shelkeaadish@gmail.com', // Hardcoded your email
//       otp: otp,
//       user_name: 'Aadish',
//       payment_amount: amount,
//       company_name: 'SpendWise',
//     };

//     emailjs.send(
//       'service_p8fxfi4',       // Replace with your EmailJS service ID
//       'template_ynus4qt',      // Replace with your EmailJS template ID
//       templateParams,
//       '0rZIfW0DCmwL2bg0G'      // Replace with your EmailJS user ID
//     ).then((result) => {
//         console.log('Email sent successfully!', result.text);
//     }, (error) => {
//         console.error('Error in sending email:', error);
//     });
//   };

//   // Function to handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Get the current date in YYYY-MM-DD format
//     const currentDate = new Date().toISOString().split('T')[0];

//     try {
//       const response = await axios.post('http://localhost:5000/classify_budget', {
//         amount: parseFloat(amount),
//         category,
//         date: currentDate, // Pass current date
//       });

//       // Get the result from the response
//       const resultValue = response.data.result;
//       setResult(resultValue); // Set the result from the response

//       if (resultValue === 0) {
//         const otp = generateOtp(); // Generate OTP
//         sendEmail(otp); // Send the OTP email
//         alert('An email has been sent to you with the OTP.');
//       } else if (resultValue === 1) {
//         alert('Payment was accepted.');
//       }
      
//     } catch (error) {
//       console.error('Error classifying budget:', error);
//     }
//   };

//   return (
//     <div>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label>Amount:</label>
//           <input
//             type="number"
//             value={amount}
//             onChange={(e) => setAmount(e.target.value)}
//             required
//           />
//         </div>
//         <div>
//           <label>Category:</label>
//           <input
//             type="text"
//             value={category}
//             onChange={(e) => setCategory(e.target.value)}
//             required
//           />
//         </div>
//         <button type="submit" style={{ marginTop: '10px' }} className='btn btn--dark'>Submit</button>
//       </form>
//       {result !== null && <p>Result: {result}</p>} {/* Show result if not null */}
//     </div>
//   );
// };

// export default BudgetEntry;
