import { INTERVALS } from "../data";

import React from "react";
import ReactDOM from "react-dom";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import RotateLeftIcon from "@material-ui/icons/RotateLeft";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import SnackbarContent from "@material-ui/core/SnackbarContent";

const createNotificationsContainer = () => {
  const container = document.createElement("div");
  container.id = "washoe-notification";
  document.body.append(container);
};

const removeNotificationContainer = () =>
  document.querySelector("#washoe-notification").remove();

const EnterWord = ({ word, onStageUp, onReset }) => {

  const handleInputChange = event => {
    if (word.word.toLowerCase() == event.target.value.toLowerCase()) {
      onStageUp();
    }
  };

  return (
    <Box display="flex" flexDirection="row">
      <Typography>{word.meaning}</Typography>
      <TextField autoFocus onChange={handleInputChange} fullWidth />
      <Button><RotateLeftIcon onClick={onReset} /></Button>
    </Box>
  );
};

function Notification ({ children }) {
  return <SnackbarContent open={true} message={children} onClose={() => console.log("closing")} />;
};

browser.runtime.onMessage.addListener(request => {

  if (!document.body.querySelector("#washoe-notification")) {
    return new Promise(resolve => {
      const word = JSON.parse(request);

      const stageUp = () => {
        resolve({ type: "stageup", ...word, notifyIn: INTERVALS[ word.stage + 1 ] });
        removeNotificationContainer();
      };

      const reset = () => {
        resolve({ type: "reset", ...word, notifyIn: INTERVALS[0] });
        removeNotificationContainer();
      };

      createNotificationsContainer();
      ReactDOM.render(
        <Notification>
          <EnterWord onStageUp={stageUp} onReset={reset} word={word} />
        </Notification>,
        document.body.querySelector("#washoe-notification")
      );
    });
  }
});

