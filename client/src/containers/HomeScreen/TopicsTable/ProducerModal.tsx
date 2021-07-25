import React, { FC, useRef } from "react";
import { Button, Typography, Input, Modal } from "@material-ui/core";

interface ProducerModalInterface {
  modalStatus: boolean;
  setModalStatus: React.Dispatch<React.SetStateAction<boolean>>;
  setProducerButton: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ProducerModal: FC<ProducerModalInterface> = ({
  modalStatus,
  setModalStatus,
  setProducerButton,
}) => {
  const inputProducer = useRef<HTMLInputElement>(null);
  const handleStartProducer = () => {
    if (inputProducer.current !== null) {
      const topic = inputProducer.current.value;
      console.log("topic to start producer: ", topic);
      if (topic.length === 0) {
        alert("Cannot leave topic field empty");
        return;
      }
      const options = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic }),
      };

      fetch("http://localhost:3000/api/producer", options)
        .then((data) => data.json())
        .then((data) => {
          setModalStatus(false);
          setProducerButton(true);
          console.log(data);
        })
        .catch((e) => console.log(e));
    }
  };

  return (
    <>
      <Modal
        open={modalStatus}
        onClose={() => setModalStatus(false)}
        aria-labelledby="start-producer"
        aria-describedby="start-producer"
        className="modal"
      >
        <div className="insideModalDiv">
          <Typography variant="h6">Producer to start</Typography>

          <Input
            id="selectProducer"
            inputRef={inputProducer}
            type="text"
            placeholder="Kafkafix"
          />

          <Button
            variant="contained"
            color="primary"
            onClick={handleStartProducer}
            className="button"
          >
            Start
          </Button>
        </div>
      </Modal>
    </>
  );
};
