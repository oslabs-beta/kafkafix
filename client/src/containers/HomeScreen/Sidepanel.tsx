import React, { FC } from "react";

// importing Connect
import Connect from "./Sidepane/Connect";

// importing Navbar
import NavBar from "./Sidepane/NavBar";

const Sidepanel: FC = (props) => {
  return (
    <div className="sidepanel">
      {/* <h1>Sidepane</h1> */}
      <Connect />
      <NavBar />
    </div>
  );
};

export default Sidepanel;
