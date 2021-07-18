import React, { FC } from 'react';
import { ErrorTable } from './ErrorTable';
import NavBar from '../HomeScreen/Sidepanel/NavBar';

export const FailureReportScreen: FC = () => {
  return (
    <>
      <NavBar />
      <ErrorTable />
    </>
  );
};
