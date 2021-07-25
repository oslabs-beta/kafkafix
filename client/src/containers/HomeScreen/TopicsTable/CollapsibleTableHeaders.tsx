import React, { FC } from "react";
import { TableCell, TableHead, TableRow } from "@material-ui/core";

export const CollapsibleTableHeaders: FC = () => {
  return (
    <TableHead>
      <TableRow className="tableHeaderRow">
        <TableCell className="tableHeaderText">Id</TableCell>
        <TableCell className="tableHeaderText">Leader</TableCell>
        <TableCell className="tableHeaderText">Partition-errode</TableCell>
        <TableCell className="tableHeaderText">ISR</TableCell>
        <TableCell className="tableHeaderText">Replicas</TableCell>
      </TableRow>
    </TableHead>
  );
};
