import React, { FC } from "react";
import { Connect } from "./Connect";
import { TopicsDisplay } from "../TopicsDisplay/TopicsDisplay";

export const StartContainer: FC = () => {
  return (
    <div className="startContainer">
      <Connect />
      <TopicsDisplay />
    </div>
  );
};
