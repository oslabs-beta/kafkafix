import React, { FC } from "react";
import { useSelector } from "react-redux";
import { overallState } from "../../state/reducers";
import { KafkaState } from "../../state/reducers/kafkaDataReducer";
import { TopicRow } from "./TopicRow";

const TopicsDisplay: FC = (props) => {
  const topicsArr = useSelector<overallState, KafkaState["topics"]>((state) => {
    return state.kafka.topics;
  });
  // console.log(topicsArr);
  return (
    <div>
      <table className="topicsDisplay">
        <thead>
          <tr>
            <th>Topics</th>
            <th>Partitions</th>
            <th>Consumers</th>
            <th>Products</th>
          </tr>
        </thead>
        <tbody>
          {topicsArr.map((el, i) => (
            <TopicRow
              key={i}
              name={el.name}
              partitionNum={el.partitionNum}
              consumerNum={el.consumerNum}
              producerNum={el.producerNum}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TopicsDisplay;
