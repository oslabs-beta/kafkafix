// import React, { FC, useState } from 'React';
// import { MTPaginationOptions } from './MTPaginationOptions';

// import {
//   Button,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   TableFooter,
//   TablePagination,
//   Paper,
//   Typography,
//   Input,
//   makeStyles,
//   Modal,
// } from '@material-ui/core';

// const useRowStyles = makeStyles({
//   root: {
//     '& > *': {
//       borderBottom: 'unset',
//     },
//   },
//   tableWrapper: {
//     margin: 30,
//     boxShadow: '10px 5px 5px lightgrey;',
//   },
//   tableHeaderRow: {
//     backgroundColor: 'black',
//   },
//   tableHeaderText: {
//     color: 'white',
//     fontWeight: 'bold',
//   },
// });

// interface MessageTableProps {
//   messages: {}[];
//   ws: WebSocket;
//   setMessages: React.Dispatch<React.SetStateAction<{}[]>>;
// }

// export const MessageTable: FC<MessageTableProps> = ({
//   messages,
//   ws,
//   setMessages,
// }) => {
//   const classes = useRowStyles();

//   ws.onmessage = (event: any) => {
//     console.log('client received: ', event.data);
//     // console.log('type of data for event.data', typeof event.data);
//     const array = event.data.split('message: ');
//     // console.log(array);
//     // console.log(array[1]);
//     const data = JSON.parse(array[1]);
//     // console.log('data after parse', data);
//     // dispatch(appendMessageActionCreator(data));
//     setMessages([...messages, data]);
//   };

//   const [pageSize, setPageSize] = useState(25);
//   const [pageIndex, setPageIndex] = useState(
//     Math.floor(messages.length / pageSize)
//   );
//   const [togglePause, setTogglePause] = useState(false);
//   if (!togglePause) setPageIndex(Math.floor(messages.length / pageSize));
//   const start = (pageIndex + 1) * pageSize;
//   const end = Math.min(start + pageSize, messages.length);
//   const showMessages = messages.slice(start, end);
//   const numEmptyRows = end - (start + pageSize);
//   const emptyRows = [];
//   for (let i = 0; i < numEmptyRows; i++) {
//     emptyRows.push(<TableRow />);
//   }

//   const handleChangePage = (
//     e: React.MouseEvent<HTMLButtonElement> | null,
//     pageIndex: number
//   ) => {
//     setPageIndex(pageIndex);
//   };

//   const handleChangePageSize = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
//   ) => {
//     const newPageIndex = Math.floor(start / parseInt(e.target.value));
//     setPageSize(parseInt(e.target.value));
//     setPageIndex(newPageIndex);
//   };

//   return (
//     <>
//       <TableContainer component={Paper} className={classes.tableWrapper}>
//         <Table aria-label='custom pagination table'>
//           <TableHead>
//             <TableRow className={classes.tableHeaderRow}>
//               {messages[0] &&
//                 Object.keys(messages[0]).map((key) => {
//                   <TableCell>{key}</TableCell>;
//                 })}
//             </TableRow>
//           </TableHead>

//           <TableBody>
//             {showMessages.map((el, index) => (
//               <TableRow key={index} >
//                 {Object.values(el).map((value: any) => (
//                   <TableCell>{value}</TableCell>
//                 ))}
//               </TableRow>
//             ))}
//             {emptyRows}
//           </TableBody>

//           <TableFooter>
//             <TableRow>
//               <TablePagination
//                 rowsPerPageOptions={[25, 50, 100]}
//                 count={messages.length}
//                 rowsPerPage={pageSize}
//                 page={pageIndex}
//                 SelectProps={{
//                   inputProps: { 'aria-label': 'rows per page' },
//                   native: true,
//                 }}
//                 onPageChange={handleChangePage}
//                 onRowsPerPageChange={handleChangePageSize}
//                 ActionsComponent={(props) => (
//                   <MTPaginationOptions
//                     {...props}
//                     togglePause={togglePause}
//                     setTogglePause={setTogglePause}
//                     pageIndex={pageIndex}
//                     pageSize={pageSize}
//                     totalMessages={messages.length}
//                   />
//                 )}
//               />
//             </TableRow>
//           </TableFooter>
//         </Table>
//       </TableContainer>
//     </>
//   );
// };
