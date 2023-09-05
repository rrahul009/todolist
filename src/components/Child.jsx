import React from 'react';

const Child = (props) => {
  // Function to send data to the parent
  const sendDataToParent = () => {
    const data = 'Hello from Child!';
    // Call the function passed from the parent with the data
    props.receiveDataFromChild(data);
  };

  return (
    <>
      <button onClick={sendDataToParent}>Click me</button>
    </>
  );
}

export default Child;
