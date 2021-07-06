import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { overallState } from '../../state/reducers';
import { KafkaState } from '../../state/reducers/kafkaDataReducer';

/*
------------------------------Update------------------------
Topics Row is now part of topics display becasue of the collapsable table
*/

// importing IPCReder
const { ipcRenderer } = window.require('electron');

// importing prop types
import PropTypes from 'prop-types';
// importing componenets from Material UI
import {
  Button,
  Box,
  Collapse,
  Divider,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Input,
  makeStyles,
} from '@material-ui/core';
import { ErrorRounded } from '@material-ui/icons';

// importing icons from material-UI
import { KeyboardArrowDown, KeyboardArrowUp } from '@material-ui/icons';

// fucntion to make styles for rows
const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
  tableWrapper: {
    margin: 30,
    boxShadow: '10px 5px 5px lightgrey;',
  },
  tableHeaderRow: {
    backgroundColor: 'black',
  },
  tableHeaderText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

// function to add data to a row (consumers and producers may not be available to display- talk to kyu)
const createData = (
  topicName: string,
  partitions: number,
  partitionData: any
) => {
  return {
    topicName: topicName,
    partitions: partitions,
    partitionData: [
      {
        id: partitionData[0].id,
        parttionErrode: partitionData[0].parttionErrode,
        leader: partitionData[0].leader ? 'true' : 'false',
        replicas: partitionData[0].replicas[0],
        isr: partitionData[0].isr[0],
      },
    ],
  };
};

// function to create rows
const Row = (props: { row: ReturnType<typeof createData> }) => {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();

  // function to handle partition click -- opens a new window -- we need to know which partiton to show live data for
  const handleClickPartition = (topic: any) => {
    console.log(topic);
    ipcRenderer.send('open-partition');
  };

  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell>
          {/* onclick - arrow changes */}
          <IconButton
            aria-label='expand row'
            size='small'
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
          </IconButton>
        </TableCell>

        <TableCell component='th' scope='row'>
          {row.topicName}
        </TableCell>
        <TableCell>{row.partitions}</TableCell>
      </TableRow>

      {/* Create another TableRow for the partitions*/}
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={5}>
          <Collapse in={open} timeout='auto' unmountOnExit>
            <Box margin={3}>
              <Typography
                style={{ fontWeight: 'bold' }}
                align='left'
                variant='h6'
                gutterBottom
                component='div'
              >
                Partitions
              </Typography>

              {/* Table headers for Partitions */}
              <Table size='small' aria-label='partitions'>
                <TableHead>
                  <TableRow className={classes.tableHeaderRow}>
                    <TableCell className={classes.tableHeaderText}>
                      Id
                    </TableCell>
                    <TableCell className={classes.tableHeaderText}>
                      Leader
                    </TableCell>
                    <TableCell className={classes.tableHeaderText}>
                      Parttion-errode
                    </TableCell>
                    <TableCell className={classes.tableHeaderText}>
                      ISR
                    </TableCell>
                    <TableCell className={classes.tableHeaderText}>
                      Replicas
                    </TableCell>
                  </TableRow>
                </TableHead>

                {/* Table Body */}
                {/* Mapping through array of partitions -- row needs to be state */}
                <TableBody>
                  {row.partitionData.map((data) => (
                    <TableRow
                      hover={true}
                      key={data.id}
                      onClick={() => handleClickPartition(row.topicName)}
                    >
                      <TableCell component='th' scope='row'>
                        {data.id}
                      </TableCell>
                      <TableCell>{data.leader}</TableCell>
                      <TableCell>{data.parttionErrode}</TableCell>
                      <TableCell>{data.isr}</TableCell>
                      <TableCell>{data.replicas}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
};

// rows array-- temoporary state for information, need to use redux to store data

const rows = [
  createData('topic 1', 3, [
    { id: 1, parttionErrode: 'test', leader: true, replicas: [3], isr: [1] },
  ]),
  createData('topic 2', 3, [
    { id: 1, parttionErrode: 'test', leader: true, replicas: [3], isr: [1] },
  ]),
  createData('topic 3', 3, [
    { id: 1, parttionErrode: 'test', leader: true, replicas: [3], isr: [1] },
  ]),
  createData('topic 4', 3, [
    { id: 1, parttionErrode: 'test', leader: true, replicas: [3], isr: [1] },
  ]),
  createData('topic 5', 3, [
    { id: 1, parttionErrode: 'test', leader: true, replicas: [3], isr: [1] },
  ]),
  createData('topic 6', 3, [
    { id: 1, parttionErrode: 'test', leader: true, replicas: [3], isr: [1] },
  ]),
];

// create fucntion that returns table

// CollapsibleTable was the previous TopicsDisplay

const TopicsDisplay = () => {
  const classes = useRowStyles();

  // state

  return (
    <TableContainer component={Paper} className={classes.tableWrapper}>
      <Table aria-label='collapsible table'>
        {/* Table Head */}
        <TableHead>
          <TableRow className={classes.tableHeaderRow}>
            <TableCell />
            <TableCell className={classes.tableHeaderText}>
              Topic Name
            </TableCell>
            <TableCell className={classes.tableHeaderText}>
              Partitions
            </TableCell>
          </TableRow>
        </TableHead>

        {/* Table Body - why is it not centered*/}
        <TableBody>
          {rows.map((row) => (
            <Row key={row.topicName} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TopicsDisplay;

// const TopicsDisplay: FC = (props) => {
//   const isConnected = useSelector<overallState, KafkaState['isConnected']>(
//     (state) => state.kafka.isConnected
//   );

//   const topicsArr = useSelector<overallState, KafkaState['topics']>((state) => {
//     return state.kafka.topics;
//   });

//   // console.log(topicsArr);
//   return (
//     <table className='topicsDisplay'>
//       <thead>
//         <tr>
//           <th>Topics</th>
//           <th>Partitions</th>
//           <th>Consumers</th>
//           <th>Products</th>
//         </tr>
//       </thead>
//       <tbody>
//         {isConnected &&
//           topicsArr.map((el, i) => (
//             <TopicRow
//               key={i}
//               name={el.name}
//               partitionNum={el.partitionNum}
//               consumerNum={el.consumerNum}
//               producerNum={el.producerNum}
//             />
//           ))}
//       </tbody>
//     </table>
//   );
// };

// export default TopicsDisplay;
