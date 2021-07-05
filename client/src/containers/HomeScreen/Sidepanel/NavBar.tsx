import React, { useState } from 'react';

// importing items for menu from Material-UI
import {
  Drawer,
  Button,
  List,
  Divider,
  ListItem,
  ListItemText,
} from '@material-ui/core';

// importing Link from react router dom
import { Link } from 'react-router-dom';

// imports for customizing styles
// clsx allows for conditional styling to be used - unsure if we will need clsx
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  list: {
    width: 200,
  },
  fullList: {
    width: 'auto',
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
        <Button onClick={() => setState({ open: true })}>Menu</Button>
        <Drawer
          anchor='left'
          open={state.open}
          onClose={() => setState({ open: false })}
        >
          {state.open ? menuItems() : null}
        </Drawer>
      </React.Fragment>
    </div>
  );
};

export default NavBar;

{
  /* <div>
      <div id='metrics' className='navBlock'>
        <i className='fas fa-circle-notch'></i>
        <div>Metrics</div>
        <a>Key insights into your Kafka system</a>
      </div>
      <div id='failureReports' className='navBlock'>
        <i className='fas fa-print'></i>
        <div>Failure Report</div>
        <a>Key insights into your Kafka system</a>
      </div>
      <div id='darkMode' className='navBlock'>
        <i className='fas fa-cog'></i>
        Dark Mode
      </div>
      <div id='documentation' className='navBlock'>
        <i className='fas fa-info-circle'></i>
        Documentation
      </div>
    </div> */
}
