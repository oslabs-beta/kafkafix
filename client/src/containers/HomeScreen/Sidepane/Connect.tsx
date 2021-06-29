import React from 'react';

const Connect = () => {
  // display form function -> onclick -> return a form

  const displayForm = () => {
    return (
      <>
        <form>
          <label>Enter Your Broker ID</label>
          <input></input>
        </form>
      </>
    );
  };

  return (
    // display form on click - using state
    <>
      <h1>Connect</h1>
      <button>Connect</button>
    </>
  );
};

export default Connect;
