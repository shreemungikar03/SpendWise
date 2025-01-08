// import React, { useState } from 'react';
// import axios from 'axios';
// import addNotification from 'react-push-notification';
// import caution2 from './caution2.jpg'
// import tick from './tick.jpg'

// const URLClassifier = () => {
//   const [url, setUrl] = useState('');
//   const [result, setResult] = useState('');

//   // Function to handle URL submission
//   const classifyUrl = async () => {
//     setResult('')
//     // try {
//       // Send the URL to the Flask backend
//       const response = await axios.post('http://localhost:5000/classify_url', {
//         url: url
//       });

//       // Update the result state with the classification result
//       setResult(response.data.result);

//       if(result == 'Unsafe'){
//         addNotification({
//             title : 'WARNING !',
//             message : 'The link is Unsafe',
//             duration : 4000,
//             icon : caution2,
//             native : true,
//         });
//       }
//       else{
//         addNotification({
//             title : 'OK !',
//             message : 'The link is Safe',
//             duration : 4000,
//             icon : tick,
//             native : true,
//         });

//       }
//     // } catch (error) {
//     //   console.error('Error classifying URL:', error);
//     //   setResult('Error occurred');
//     // }
//   };

// //   const clickToNotify = async () =>{
// //     addNotification({
// //         title : 'WARNING !',
// //         message : 'The Link is unsafe',
// //         duration : 5000,
// //         icon : caution,
// //         native : true,
// //     });
// //   }

//   return (
//     <div>
//       <h1>URL Classifier</h1>
//       <input
//         type="url"
//         value={url}
//         onChange={(e) => setUrl(e.target.value)}
//         placeholder="Enter URL"
//       />
//       <button onClick={classifyUrl}>Classify</button>

//       {result && <h2>Result: {result}</h2>}
//     </div>
//   );
// };

// export default URLClassifier;


import React, { useState } from 'react';
import axios from 'axios';
import addNotification from 'react-push-notification';
import caution2 from './caution2.jpg';
import tick from './tick.jpg';
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';
// import { SearchIcon } from '@heroicons/react/24/solid'

const URLClassifier = () => {
  const [url, setUrl] = useState('');
  const [result, setResult] = useState('');

  // Function to handle URL submission
  const classifyUrl = async () => {
    // try {
      // Send the URL to the Flask backend
      const response = await axios.post('http://localhost:5000/classify_url', {
        url: url
      });

      // Get the classification result directly from the response
      const classificationResult = response.data.result;

      // Update the result state
      setResult(classificationResult);

      // Show notification based on the classification result
      if (classificationResult === 'Unsafe') {
        addNotification({
          title: 'WARNING!',
          message: 'The link is Unsafe',
          duration: 4000,
          icon: caution2,
          native: true,
        });
      } else {
        addNotification({
          title: 'OK!',
          message: 'The link is Safe',
          duration: 4000,
          icon: tick,
          native: true,
        });
      }
    // } catch (error) {
    //   console.error('Error classifying URL:', error);
    //   setResult('Error occurred');
    // }
  };

  return (
    <div style={{display : 'flex'}}>
      {/* <h1>URL Classifier</h1> */}
      <input
        type="url"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="Verify your link!"
      />
      <button onClick={classifyUrl} className='btn btn--light' style={{height : "45px"}}> < MagnifyingGlassIcon width={25}    /> </button>
      {/* < MagnifyingGlassIcon  /> */}
      {/* {result && <h2>Result: {result}</h2>} */}
    </div>
  );
};

export default URLClassifier;
