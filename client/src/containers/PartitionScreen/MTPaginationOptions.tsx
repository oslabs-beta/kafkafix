import React, { FC } from 'React';

interface TablePaginationActionsProp {
  count: number;
  page: number;
  rowsPerPage: number;
  onPageChange(e: Event, pageIndex: number): void;
}

export const MTPaginationOptions: FC<TablePaginationActionsProp> = (props) => {
  return <></>;
};
