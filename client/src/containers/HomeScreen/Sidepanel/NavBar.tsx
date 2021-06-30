import React from "react";

const NavBar = () => {
  return (
    <div>
      <div id="metrics" className="navBlock">
        <i className="fas fa-circle-notch"></i>
        <div>Metrics</div>
        <a>Key insights into your Kafka system</a>
      </div>
      <div id="failureReports" className="navBlock">
        <i className="fas fa-print"></i>
        <div>Failure Report</div>
        <a>Key insights into your Kafka system</a>
      </div>
      <div id="darkMode" className="navBlock">
        <i className="fas fa-cog"></i>
        Dark Mode
      </div>
      <div id="documentation" className="navBlock">
        <i className="fas fa-info-circle"></i>
        Documentation
      </div>
    </div>
  );
};

export default NavBar;
