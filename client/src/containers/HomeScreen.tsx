import React from "react";

// Home screen renders two componenets - the left panel (Sidepane) and the right topics display (topicsDisplay)

// importing Sidepane component
import Sidepanel from "./HomeScreen/Sidepanel";

// importing TopicsDisplay
import TopicsDisplay from "./HomeScreen/TopicsDisplay";

const HomeScreen = () => {
  return (
    <div className="homeScreen">
      <h1>Homescreen</h1>
      <Sidepanel />
      <TopicsDisplay />
    </div>
  );
};

export default HomeScreen;
