import React, { FC, useState } from 'react';
import { useDispatch } from 'react-redux';

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
  ButtonGroup,
  Paper,
} from '@material-ui/core';

// importing icons
import {
  Notifications,
  AccountCircle,
  Menu,
  Assessment,
  BugReport,
  Brightness4,
  Description,
} from '@material-ui/icons';

import GroupIcon from '@material-ui/icons/Group';
import TableChartIcon from '@material-ui/icons/TableChart';
// importing Link from react router dom
import { Link } from 'react-router-dom';

// imports for customizing styles
// clsx allows for conditional styling to be used - unsure if we will need clsx
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { any } from 'prop-types';

import { NotifItems } from './NotifItems';
import {logoutActionCreator} from '../../../state/actions/userActions';

// import login function

// styles for Navbar component - using makeStyles hook - invoked within function
const useStyles = makeStyles({
  navbar: {
    marginBottom: 70,
  },
  appbar: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'black',
  },
  list: {
    display: 'flex',
    flexDirection: 'column',
    width: 200,
    height: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  topHalfList: {
    marginTop: 25,
  },
  bottomHalfList: {
    // marginTop: 250,
    justifySelf: 'end',
  },
  listItem: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  listItemText: {
    marginLeft: 10,
  },
  logo: {
    color: 'white',
    textDecoration: 'none',
  },
  logoOnMenu: {
    color: 'black',
    textDecoration: 'none',
  },
  buttonGroup: {
    color: 'black',
  },
  imgIcon: {
    height: '100%',
    width: '100%',
  },
});

interface Error {
  level: string;
  namespace: string;
  message: string;
  error: string;
  clientId: string;
  broker: string;
  timestamp: string;
}

const NavBar: FC = () => {
  // state to determine if menu is open or close
  const [state, setState] = useState({ open: false });

  // state to determine if notifications is open or closed
  const [notifState, setNotif] = useState({ open: false });

  // creating a classes variable to customize styles
  const classes = useStyles();

  const dispatch = useDispatch();

  // function that returns menu items
  const menuItems = () => {
    return (
      <div
        role='presentation'
        onClick={() => setState({ open: false })}
        className={classes.list}
      >
        <List className={classes.topHalfList}>
          {/* KafkaFix Logo  */}
          <Link to='/' style={{ textDecoration: 'none' }}>
            <Button>
              <Typography
                variant='h4'
                component='h2'
                className={classes.logoOnMenu}
              >
                KafkaFix
              </Typography>
            </Button>
          </Link>
          {/* list item 1 */}
          <Divider />
          <Link to='metrics' style={{ textDecoration: 'none', color: 'black' }}>
            <ListItem button key='Metrics' className={classes.listItem}>
              <Assessment></Assessment>
              <ListItemText
                primary='Metrics'
                className={classes.listItemText}
              />
            </ListItem>
          </Link>

          {/* list item 2 */}
          <Link
            to='failureReports'
            style={{ textDecoration: 'none', color: 'black' }}
          >
            <ListItem button key='Failure Reports' className={classes.listItem}>
              <BugReport></BugReport>
              <ListItemText
                primary='Failure Reports'
                className={classes.listItemText}
              />
            </ListItem>
          </Link>

          <Link
            to='partition/topic1/part1'
            style={{ textDecoration: 'none', color: 'black' }}
          >
            <ListItem
              button
              key='Visualize Streams'
              className={classes.listItem}
            >
              <TableChartIcon />
              <ListItemText
                primary='Visualize Streams'
                className={classes.listItemText}
              >
                Message Streams
              </ListItemText>
            </ListItem>
          </Link>

          {/* New Item - Groups */}
          <Link to='Groups' style={{ textDecoration: 'none', color: 'black' }}>
            <ListItem button key='Groups' className={classes.listItem}>
              <GroupIcon></GroupIcon>
              <ListItemText
                primary='Consumer Groups'
                className={classes.listItemText}
              />
            </ListItem>
          </Link>
          <Divider />
        </List>

        <List className={classes.bottomHalfList}>
          {/* list item 3 */}
          <Divider />
          <ListItem button key='Dark Mode' className={classes.listItem}>
            <Brightness4></Brightness4>
            <ListItemText
              primary='Dark Mode'
              className={classes.listItemText}
            />
          </ListItem>

          {/* list item 4  -- need to add a link to our documentation */}

          <ListItem button key='Documentation' className={classes.listItem}>
            <Description></Description>
            <ListItemText
              primary='Documentation'
              className={classes.listItemText}
            />
          </ListItem>

          {/* List item 5 -- need to add a link to our privacy policies and need to add a link to our Terms and conditions */}

          <ListItem key='ButtonGroup' className={classes.listItem}>
            <ButtonGroup className={classes.buttonGroup}>
              <Button>Privacy</Button>
              <Button>Terms</Button>
            </ButtonGroup>
          </ListItem>
        </List>
      </div>
    );
  };

  return (
    <div className={classes.navbar}>
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
            <Link to='/' style={{ textDecoration: 'none' }}>
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

          {/* Notifications and login on Nav bar - open drawers on click*/}
          <Toolbar>
            <Button onClick={() => setNotif({ open: true })}>
              <Notifications fontSize='large' style={{ color: 'white' }} />
            </Button>
            <Button onClick={()=>{
              console.log('inside button click for signout');
              dispatch(logoutActionCreator())}}>
              <AccountCircle fontSize='large' style={{ color: 'white' }} />
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

          {/* Drawer for notifications */}
          <Drawer
            anchor='right'
            open={notifState.open}
            onClose={() => setNotif({ open: false })}
          >
            {notifState.open ? <NotifItems setNotif={setNotif} /> : null}
          </Drawer>
        </AppBar>
      </React.Fragment>
    </div>
  );
};

export default NavBar;
