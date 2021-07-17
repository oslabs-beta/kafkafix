import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { populateNotifActionCreator } from '../../../state/actions/actions';
import { KafkaState } from '../../../state/reducers/kafkaDataReducer';
import { overallState } from '../../../state/reducers';

// importing component
import { Paper, Typography, Card, makeStyles } from '@material-ui/core';

// fucntion that returns the object to be saved in state
interface Error {
  level: string;
  namespace: string;
  message: string;
  error: string;
  clientId: string;
  broker: string;
  timestamp: string;
}
// fucntion that calls the action creator on the return value of
// const populateNotif = (data: any, dispatch: any) => {
//     dispatch(dispatch(populateNotifActionCreator(data)));
//   };

interface notifItemsProps {
  setNotif: any;
}

const useStyles = makeStyles({
  list: {
    display: 'flex',
    flexDirection: 'column',
    width: 700,
    height: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  listItem: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  listItemText: {
    marginLeft: 10,
  },
  paper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export const NotifItems: FC<notifItemsProps> = ({ setNotif }) => {
  const classes = useStyles();

  // fetch request for new notifs

  // fetch('/api/notification')
  //   .then((data: any) => data.json())
  //   .then((data: Error[]) => {
  //     populateNotif(data, dispatch);
  //   })
  //   .catch((e: any) => console.log('error in fetching data from notifs', e));

  // init a websocket connection
  const notifs = useSelector<overallState, KafkaState['notif']>((state) =>
    state.kafka.notif.slice(-10)
  );
  // can edit the slices to depend on a state/allow user to config

  console.log('NOTIFS', notifs);

  return (
    <React.Fragment>
      <div
        role='presentation'
        className={classes.list}
        onClick={() => setNotif({ open: false })}
      >
        {/* use cards for the errors */}
        {notifs.map((el) => (
          <Paper className={classes.paper}>
            <Typography>{el.namespace}</Typography>
            <Typography>{el.message}</Typography>
            <Typography>{el.error}</Typography>
            <Typography>{el.clientID}</Typography>
            <Typography>{el.broker}</Typography>
            <Typography>{el.timestamp}</Typography>
          </Paper>
        ))}
      </div>
    </React.Fragment>
  );
};
