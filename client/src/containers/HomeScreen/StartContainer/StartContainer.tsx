import React, { FC } from "react";
import { Connect } from "./Connect";
import { UploadDocker } from "./UploadDocker";
import "../../../../stylesheets/StartContainer.css";

export const StartContainer: FC = () => {
  return (
    <div className="startContainer">
      <Connect />
      <UploadDocker />
    </div>
  );
};
