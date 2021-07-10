// import { useDispatch } from 'react-redux';
// import { populateNotifActionCreator } from '../state/actions/actions';

// // fucntion that returns the object to be saved in state

// const createNotif = (timestamp: String, message: String, meta: any) => {
//   // iterating through meta to check if it has values
//   const metaval: any = {};
//   for (const key in meta) {
//     if (meta[key]) {
//       metaval[key] = meta[key];
//     }
//   }

//   return {
//     timestamp: timestamp,
//     message: message,
//     meta: metaval,
//   };
// };

// // // fucntion that calls the action creator on the return value of above fucntion
// export const populateNotif = (data: any) => {
//   // const formattedData = data.map((el) => {
//   //   createNotif(el.timestap, el.message, el.meta);
//   // });
//   // const dispatch = useDispatch();
//   // call dispatch w/ action creator - argument formatted data
//   // dispatch();
// };
