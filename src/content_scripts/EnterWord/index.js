import React from "react";
import { Pane, Text, TextInput } from "evergreen-ui";

const EnterWord = ({ word: { meaning } }) => (
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
    <Text marginRight="8px">
      {meaning}
    </Text>
    <TextInput autoFocus />
  </Pane>
);

export { EnterWord };
