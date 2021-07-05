import React from 'react';
import Partitions from './HomeScreen/TopicsDisplay/Partitions';
// Home screen renders two componenets - the left panel (Sidepane) and the right topics display (topicsDisplay)

/* ----------------- Update -----------------
I removed the side panel component and moved Navbar and connect to be part of Homescreen.

I removed the partiton component from homescreen. The parttions componet will be rendered (via ReactRouter) when a user clicks on a topic
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
    alignItems: 'center',
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
        {/* the table showing topics - clicking on topic routes to metadata about topic */}
        <TopicsDisplay />
        <Partitions />
      </div>
    </React.Fragment>
  );
};

export default HomeScreen;
