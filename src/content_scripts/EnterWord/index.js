import React from "react";
import { equals, prop, props } from "sanctuary";
import { Pane, Text, TextInput } from "evergreen-ui";

const EnterWord = ({ word: { word, meaning, word_id: wordId }, close }) => {

  const stageUp = data =>
    browser.runtime.sendMessage({ action: "stage up", data });

  const handleSubmit = event => {
    if (equals(13) (prop("keyCode") (event))) {
      if (equals(word) (props([ "target", "value" ])(event))) {
        stageUp({ wordId });
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
