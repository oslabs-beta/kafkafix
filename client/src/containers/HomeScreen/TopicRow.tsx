import React, { FC } from "react";

interface TopicRowProps {
  name: string;
  partitionNum: number;
  consumerNum: number;
  producerNum: number;
}

export const TopicRow: FC<TopicRowProps> = (props) => {
  return (
    <tr>
      <td>{props.name}</td>
      <td>{props.partitionNum}</td>
      <td>{props.consumerNum}</td>
      <td>{props.producerNum}</td>
    </tr>
  );
};
