import React from "react";
import Partitions from "./HomeScreen/TopicsDisplay/Partitions";

/* ----------------- Update -----------------
I removed the side panel component and moved Navbar and connect to be part of Homescreen.

I removed the partiton component from homescreen. Clicking on topic dropsdown to show more info about topic(including partitions) -- clicking on a partition opens a new window (which shows the live data stream)
---------------------------------------------*/

// importing TopicsDisplay
import TopicsDisplay from "./HomeScreen/TopicsDisplay";

// importing Navbar
import NavBar from "./HomeScreen/Sidepanel/NavBar";

// importing connect
import Connect from "./HomeScreen/Sidepanel/Connect";

import { useDispatch, useSelector } from "react-redux";
import { UserState } from "../state/reducers/userReducer";
import { overallState } from "../state/reducers/index";
import {
  Redirect
} from "react-router-dom";
// import {logoutActionCreator} from '../state/actions/userActions';

// importing components from Material UI
import {
  Button,
  Card,
  Divider,
  Typography,
  makeStyles,
} from "@material-ui/core";

// styles for homescreen component
const useStyles = makeStyles({
  homeWrapper: {
    display: "flex",
    height: "100vh",
    alignItems: "start",
  },
  rightSideWrapper: {
    height: "100%",
  },
});

const HomeScreen = () => {
  // creating a classes variable to customize styles
  const classes = useStyles();
  const dispatch = useDispatch();
  const email = useSelector<overallState, UserState["email"]>(
    (state) => state.user.email
  );

  return (
    <React.Fragment>
      <NavBar />
      <div className={classes.homeWrapper}>
        <Connect />
        <TopicsDisplay />
      </div>
      {/* <button onClick={()=>dispatch(logoutActionCreator())}>Sign Out</button> */}
      {!email && <Redirect to='/'/>}
    </React.Fragment>
  );
};

export default HomeScreen;
