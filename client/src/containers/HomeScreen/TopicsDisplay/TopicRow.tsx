import React, { FC, MouseEvent } from "react";

interface TopicRowProps {
  name: string;
  partitionNum: number;
  consumerNum: number;
  producerNum: number;
}

export const TopicRow: FC<TopicRowProps> = (props) => {
  const handleClickTopic = (e: MouseEvent) => {
    console.log(e.target);
  };
  return (
    <tr onClick={handleClickTopic}>
      <td>{props.name}</td>
      <td>{props.partitionNum}</td>
      <td>{props.consumerNum}</td>
      <td>{props.producerNum}</td>
    </tr>
  );
};
