import React from 'react';
// app renders 1 component -- Home Screen --

// importing HomeScreen
import HomeScreen from './containers/HomeScreen';


const App: React.FC = () => {
  return (
    <>
      <div>KafkaFix logo</div>
        <HomeScreen />
    </>
  );
};

export default App;
