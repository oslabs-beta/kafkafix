import {
  populateDataActionCreator,
} from '../state/actions/actions';

const createData = (
  topicName: string,
  partitions: number,
  partitionData: any
) => {
  return {
    topicName: topicName,
    partitions: partitions,
    partitionData: partitionData.map((el: any) => ({
      id: el.partitionId,
      partitionErrorCode: el.partitionErrorCode,
      leader: !!el.leader,
      replicas: el.replicas[0],
      isr: el.isr[0],
    })),
  };
};

export const populateData = (data: any, dispatch: any) => {
  const array = data.metadata.topics;
  const rows = array.map((el: any) =>
    createData(el.name, el.partitions.length, el.partitions)
  );
  dispatch(populateDataActionCreator(rows));
};
