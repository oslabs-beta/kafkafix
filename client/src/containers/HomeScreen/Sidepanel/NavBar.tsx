import React, { useState } from 'react';

// importing items for menu from Material-UI
import {
  AppBar,
  Toolbar,
  Drawer,
  Button,
  List,
  Divider,
  ListItem,
  ListItemText,
  Typography,
} from '@material-ui/core';

// importing icons
import { Notifications, Menu } from '@material-ui/icons';

// importing Link from react router dom
import { Link } from 'react-router-dom';

// imports for customizing styles
// clsx allows for conditional styling to be used - unsure if we will need clsx
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  appbar: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  list: {
    width: 200,
  },
  logo: {
    color: 'white',
  },
});

const NavBar = () => {
  // state to determine if menu is open or close
  const [state, setState] = useState({ open: false });

  // creating a classes variable to customize styles
  const classes = useStyles();

  // function that returns menu items
  const menuItems = () => {
    return (
      <div
        role='presentation'
        onClick={() => setState({ open: false })}
        className={classes.list}
      >
        <List>
          {/* list item 1 */}
          <Link to='metrics'>
            <ListItem button key='Metrics'>
              <ListItemText primary='Metrics' />
            </ListItem>
          </Link>

          {/* list item 2 */}
          <Link to='failureReports'>
            <ListItem button key='Failure Reports'>
              <ListItemText primary='Failure Reports' />
            </ListItem>
          </Link>
        </List>
        <Divider />

        <List>
          {/* list item 3 */}
          <ListItem button key='Dark Mode'>
            <ListItemText primary='Dark Mode' />
          </ListItem>

          {/* list item 4  -- need to add a link to our documentation */}

          <ListItem button key='Documentation'>
            <ListItemText primary='Documentation' />
          </ListItem>
        </List>
      </div>
    );
  };

  return (
    <div>
      <React.Fragment>
        <AppBar className={classes.appbar}>
          {/* menu button on nav bar */}
          <Toolbar>
            <Button onClick={() => setState({ open: true })}>
              <Menu fontSize='large' style={{ color: 'white' }} />
            </Button>
          </Toolbar>

          {/* Kafka fix logo on Nav bar - takes you back home */}
          <Toolbar>
            <Link to='/'>
              <Button>
                <Typography
                  variant='h4'
                  component='h2'
                  className={classes.logo}
                >
                  KafkaFix
                </Typography>
              </Button>
            </Link>
          </Toolbar>

          {/* Notifications on Nav bar - opens a notifications drawer*/}
          <Toolbar>
            <Button>
              <Notifications fontSize='large' style={{ color: 'white' }} />
            </Button>
          </Toolbar>

          {/* Drawer for menu click */}
          <Drawer
            anchor='left'
            open={state.open}
            onClose={() => setState({ open: false })}
          >
            {state.open ? menuItems() : null}
          </Drawer>

          {/* Need to implement a drawer for notifications */}
        </AppBar>
      </React.Fragment>
    </div>
  );
};

export default NavBar;
