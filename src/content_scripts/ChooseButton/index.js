import React from "react";
import { Text, Button, Pill } from "evergreen-ui";
import { Notification } from "../components/Notification";

export const ChooseButton = ({ word: { word, stage }, onSuccess, onFail }) => (
  <Notification>
    <Text marginRight={8}>{word}</Text>
    <Button onClick={onSuccess} height={32} marginRight={16} appearance="minimal" intent="none">Yes</Button>
    <Button onClick={onFail} height={32} marginRight={16} appearance="minimal" intent="success">No</Button>
    <Pill marginLeft={8}>{stage}</Pill>
  </Notification>
);
