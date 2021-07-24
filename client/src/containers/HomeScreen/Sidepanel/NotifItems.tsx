import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { populateNotifActionCreator } from '../../../state/actions/actions';
import { KafkaState } from '../../../state/reducers/kafkaDataReducer';
import { overallState } from '../../../state/reducers';

// importing component
import { Typography, Card, makeStyles } from '@material-ui/core';

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
    width: 420,
    margin: 20,
    // marginBottom: 100,
    justifyContent: 'center',
  },
  divForNotifs: {
    display: 'flex',
    flexDirection: 'column',
    // justifyContent: 'center',
    alignItems: 'center',
    width: 400,
    marginBottom: 20,
    padding: 10,
    backgroundColor: 'white',
  },
  span: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  errorMessage: {
    fontWeight: 'bold',
    textAlign: 'center',
    margin: 10,
  },
});

export const NotifItems: FC<notifItemsProps> = ({ setNotif }) => {
  const classes = useStyles();

  // fetch request for new notifs

  // fetch('http://localhost:3000/api/notification')
  //   .then((data: any) => data.json())
  //   .then((data: Error[]) => {
  //     populateNotif(data, dispatch);
  //   })
  //   .catch((e: any) => console.log('error in fetching data from notifs', e));

  // init a websocket connection
  // can edit the slices to depend on a state/allow user to config
  const notifs = useSelector<overallState, KafkaState['notif']>((state) =>
    state.kafka.notif.slice(-10)
  );

  return (
    <React.Fragment>
      <div
        role='presentation'
        className={classes.list}
        onClick={() => setNotif({ open: false })}
      >
        {notifs.map((el) => (
          <Card className={classes.divForNotifs}>
            <div className={classes.span}>
              <Typography variant='overline'>{el.namespace}</Typography>
              <Typography variant='overline'>{el.broker}</Typography>
            </div>

            <Typography variant='body2' className={classes.errorMessage}>
              {el.error}
            </Typography>

            <div className={classes.span}>
              <Typography variant='button'>{el.clientID}</Typography>
              <Typography variant='caption'>{el.message}</Typography>
            </div>
          </Card>
        ))}
      </div>
    </React.Fragment>
  );
};
