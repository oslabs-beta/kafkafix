// import React, { FC, MouseEvent } from 'react';

// // importing IPCReder
// const {ipcRenderer} = window.require("electron")

// interface TopicRowProps {
//   name: string;
//   partitionNum: number;
//   consumerNum: number;
//   producerNum: number;
// }

// export const TopicRow: FC<TopicRowProps> = (props) => {
//   const handleClickTopic = (e: MouseEvent) => {
//     console.log(e.target);
//     ipcRenderer.send('open-partition');
//   };
//   return (
//     <tr onClick={handleClickTopic}>
//       <td>{props.name}</td>
//       <td>{props.partitionNum}</td>
//       <td>{props.consumerNum}</td>
//       <td>{props.producerNum}</td>
//     </tr>
//     // {topicSelector === props.name && p}
//   );
// };
