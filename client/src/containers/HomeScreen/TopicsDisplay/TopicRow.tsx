import React, { FC, useState } from "react";
// // importing IPCReder
// const { ipcRenderer } = window.require("electron");
import { KeyboardArrowDown, KeyboardArrowUp } from "@material-ui/icons";
import { DataEntries } from "../../../state/reducers/kafkaDataReducer";
import { CollapsibleTable } from "./CollapsibleTable";
import { IconButton, TableCell, TableRow } from "@material-ui/core";

interface TopicRowProps {
  row: DataEntries;
}

export const TopicRow: FC<TopicRowProps> = ({ row }) => {
  const [openInnerTable, setOpenInnerTable] = useState<boolean>(false);
  return (
    <>
      <TableRow className="root">
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpenInnerTable(!openInnerTable)}
          >
            {openInnerTable ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
          </IconButton>
        </TableCell>

        <TableCell component="th" scope="row">
          {row.topicName}
        </TableCell>
        <TableCell>{row.partitions}</TableCell>
      </TableRow>

      {/* Create another TableRow for the partitions*/}
      <TableRow>
        <TableCell className="removeVerticalPadding" colSpan={5}>
          <CollapsibleTable openTable={openInnerTable} dataEntries={row} />
        </TableCell>
      </TableRow>
    </>
  );
};
