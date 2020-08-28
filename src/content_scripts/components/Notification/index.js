import React from "react";
import { Pane } from "evergreen-ui";

const styles = {
  elevation: "3",
  margin: "12px",
  padding: "12px",
  display: "flex",
  position: "fixed",
  bottom: "12px",
  right: "12px",
  maxWidth: "650px",
  borderRadius: "2",
  alignItems: "center",
  background: "blueTint"
};

export const Notification = ({ children }) =>
  <Pane {...styles}>{children}</Pane>;
