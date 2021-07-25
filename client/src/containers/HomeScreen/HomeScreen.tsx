import React, { FC } from "react";
import NavBar from "./Sidepanel/NavBar";

import { useDispatch, useSelector } from "react-redux";
import { UserState } from "../../state/reducers/userReducer";
import { overallState } from "../../state/reducers/index";
import { Redirect } from "react-router-dom";
// import {logoutActionCreator} from '../state/actions/userActions';

// importing components from Material UI
import { makeStyles } from "@material-ui/core";
import { StartContainer } from "./StartContainer/StartContainer";

// styles for homescreen component
const useStyles = makeStyles({
  startContainer: {
    display: "flex",
    height: "100vh",
    alignItems: "start",
  },
  rightSideWrapper: {
    height: "100%",
  },
});

export const HomeScreen: FC = () => {
  // creating a classes variable to customize styles
  const classes = useStyles();
  const dispatch = useDispatch();
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
