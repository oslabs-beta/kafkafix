import React, { useState } from 'react';

const Connect = () => {
  // display form function -> onSubmit -> send fetch request to backend with Broker URI
  const [form, setForm] = useState(false);

  const returnForm = () => {
    return (
      <form >
        <label>Enter Your Broker ID</label>
        <input id='brokerID' name='brokerID' placeholder='localhost:9092'></input>
        <button>Connect</button>
      </form>
    );
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   const inputField = document.querySelector('#brokerID');
  //   // setForm(true);
  //   const formData: any = new FormData(e.target);

  //   for (let [key, value] of formData.entries()) {
  //     formData[key] = value;
  //   }

  //   console.log('form data object => ', formData);

  //   const options = {
  //     method: 'POST',
  //     headers: { 'content-type': 'application/json' },
  //     body: JSON.stringify(formData),
  //   };

  //   fetch('/api', options);
  // };

  return (
    // display form on click - using state
    <>
      <button onClick={() => setForm(true)}> Connect Your Broker URI</button>
      {form ? returnForm() : null}
    </>
  );
};

export default Connect;
