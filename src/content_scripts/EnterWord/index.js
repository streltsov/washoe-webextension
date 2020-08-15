import React from "react";
import { INTERVALS } from "../../constants";
import { equals, prop, props } from "sanctuary";
import { Pane, Text, TextInput } from "evergreen-ui";

const EnterWord = ({ word: { id, word, meaning }, close }) => {

  const incrementWordStage = data =>
    browser.runtime.sendMessage({ action: "incrementWordStage", data });

  const handleSubmit = event => {
    if (equals(13) (prop("keyCode") (event))) {
      if (equals(word) (props([ "target", "value" ])(event))) {
        incrementWordStage({ id });
        close();
      }
    };
  };

  return (
    <Pane
      elevation="3"
      margin="12px"
      padding="12px"
      display="flex"
      position="fixed"
      bottom="12px"
      right="12px"
      maxWidth="650px"
      borderRadius="2"
      alignItems="center"
      background="blueTint">
      <Text marginRight="8px">{meaning}</Text>
      <TextInput autoFocus onKeyDown={handleSubmit} />
    </Pane>
  );
};

export { EnterWord };
