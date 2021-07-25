import React, { FC } from "react";
import NavBar from "./Sidepanel/NavBar";

import { useSelector } from "react-redux";
import { UserState } from "../../state/reducers/userReducer";
import { overallState } from "../../state/reducers/index";
import { Redirect } from "react-router-dom";
// import {logoutActionCreator} from '../state/actions/userActions';

import { StartContainer } from "./StartContainer/StartContainer";

export const HomeScreen: FC = () => {
  // creating a classes variable to customize styles
  const email = useSelector<overallState, UserState["email"]>(
    (state) => state.user.email
  );

  return (
    <React.Fragment>
      <NavBar />
      <StartContainer />
      {/* <button onClick={()=>dispatch(logoutActionCreator())}>Sign Out</button> */}
      {!email && <Redirect to="/" />}
    </React.Fragment>
  );
};
