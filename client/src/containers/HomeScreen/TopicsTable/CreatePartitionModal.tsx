import React, { FC, useRef } from "react";
import { Button, Typography, Input, Modal } from "@material-ui/core";
import { populateData } from "../../../helperFunctions/populateData";
import { useDispatch } from "react-redux";

interface CreatePartitionModalProps {
  modalStatus: boolean;
  setModalStatus: React.Dispatch<React.SetStateAction<boolean>>;
  topic: string;
  currPartitionNumber: number;
}

export const CreatePartitionModal: FC<CreatePartitionModalProps> = ({
  modalStatus,
  setModalStatus,
  topic,
  currPartitionNumber,
}) => {
  const inputPartition = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch();

  const handleCreatePartition = () => {
    if (inputPartition.current) {
      let count: number | string = inputPartition.current.value;
      if (count.length === 0) {
        alert("Cannot leave number of partitions field empty");
        return;
      }
      count = parseInt(count);
      if (count <= 0) {
        alert("Number of partitions must be a positive integer");
        return;
      }
      const options = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic, count }),
      };
      fetch("http://localhost:3000/api/partition", options)
        .then((data: any) => data.json())
        .then((data) => {
          console.log(
            "data from backend after sending to add partition ",
            data
          );
          populateData(data, dispatch);
          setModalStatus(false);
        })
        .catch((e) => console.log(e));
    }
  };

  return (
    <>
      <Modal
        open={modalStatus}
        onClose={setModalStatus}
        aria-labelledby="create-partition"
        aria-describedby="create-partition"
        className="modal"
      >
        <div className="insideModalDiv">
          <Typography variant="h3">
            Create Partitions for Topic {topic}
          </Typography>
          <Typography variant="h4">
            Current Number of Partitions {currPartitionNumber}
          </Typography>
          <Typography variant="h6">Add # of Partitions</Typography>
          <Input
            id="inputPartition"
            inputRef={inputPartition}
            type="number"
            placeholder="#"
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleCreatePartition}
            className="button"
          >
            Create Partitions
          </Button>
        </div>
      </Modal>
    </>
  );
};
