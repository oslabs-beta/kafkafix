import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { overallState } from '../../state/reducers';
import { KafkaState } from '../../state/reducers/kafkaDataReducer';
import { TopicRow } from './TopicsDisplay/TopicRow';

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

// create fucntion that returns table

// CollapsibleTable was the previous TopicsDisplay

const TopicsDisplay = () => {
  const classes = useRowStyles();
  const isConnected = useSelector<overallState, KafkaState['isConnected']>(
    (state) => state.kafka.isConnected
  );
  const rows = useSelector<overallState, KafkaState['data']>(
    (state) => state.kafka.data
  ); // [{topicName, partitions, ... }, {}]
  console.log('rows/data grabbed from store ', rows);
  // useSelector( (state) => state.kafka.data)
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
        {isConnected && (
          <TableBody>
            {rows.map((row) => (
              <TopicRow key={row.topicName} row={row} />
            ))}
          </TableBody>
        )}
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
