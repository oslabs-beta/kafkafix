import React from 'react';

// Home screen renders two componenets - the left panel (Sidepane) and the right topics display (topicsDisplay)

// importing Sidepane component
import Sidepane from './HomeScreen/Sidepane';

// importing TopicsDisplay
import TopicsDisplay from './HomeScreen/TopicsDisplay';

const HomeScreen = () => {
  return (
    <div>
      <h1>Homescreen</h1>
      <Sidepane />
      <TopicsDisplay />
    </div>
  );
};

export default HomeScreen;
