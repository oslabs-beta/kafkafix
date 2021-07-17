import React from 'react';
import Partitions from './HomeScreen/TopicsDisplay/Partitions';

/* ----------------- Update -----------------
I removed the side panel component and moved Navbar and connect to be part of Homescreen.

I removed the partiton component from homescreen. Clicking on topic dropsdown to show more info about topic(including partitions) -- clicking on a partition opens a new window (which shows the live data stream)
---------------------------------------------*/

// importing TopicsDisplay
import TopicsDisplay from './HomeScreen/TopicsDisplay';

// importing Navbar
import NavBar from './HomeScreen/Sidepanel/NavBar';

// importing connect
import Connect from './HomeScreen/Sidepanel/Connect';

// importing components from Material UI
import {
  Button,
  Card,
  Divider,
  Typography,
  makeStyles,
} from '@material-ui/core';

// styles for homescreen component
const useStyles = makeStyles({
  homeWrapper: {
    display: 'flex',
    height: '100vh',
    alignItems: 'start',
  },
  rightSideWrapper: {
    height: '100%',
  },
});

const HomeScreen = () => {
  // creating a classes variable to customize styles
  const classes = useStyles();

  return (
    <React.Fragment>
      <NavBar />
      <div className={classes.homeWrapper}>
        <Connect />
        <TopicsDisplay />
      </div>
    </React.Fragment>
  );
};

export default HomeScreen;
