import React, { useState } from 'react';
import Child from './Child';

const Parent = () => {
  // State in the parent component to store data from the child
  const [dataFromChild, setDataFromChild] = useState('');

  // Function to receive data from the child
  const receiveDataFromChild = (data) => {
    console.log(data);
    setDataFromChild(data);
  };

  return (
    <>
      <p>Parent</p>
      <ps>Data received from Child: {dataFromChild}</ps>
      {/* Pass the function as a prop to the child */}
      <Child receiveDataFromChild={receiveDataFromChild}  a="p"/>
    </>
  );
}

export default Parent;
