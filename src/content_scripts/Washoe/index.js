import React, { useState } from "react";
import AddWord from "../AddWordModal";
import { Pane, Text, TextInput, Button, toaster } from "evergreen-ui";
import "./style.css";

//import { isNotificationOnPage, createShadowDom } from "../utils/dom";
//import { NOTIFICATION_SHADOW_DOM_ID, INTERVALS } from "../constants";

const EnterWord = ({ word }) => (
  <Pane display="flex" zIndex="2147483647">
    <Text>{JSON.parse(word).meaning}</Text>
    <TextInput />
  </Pane>
);

function Washoe () {
  const [ isDrawerOpen, setIsDrawerOpen ] = useState(false);
  const actions = {
    "show add word modal": () => setIsDrawerOpen(true),
    notification: word => toaster.notify(<EnterWord word={word} />, { duration: 9e9, position: "bottom" })
  };

  browser.runtime.onMessage.addListener(({ msg: { action, data } }) => actions[action](data));

  return (
    <>
      <AddWord isShown={isDrawerOpen} onCloseComplete={() => setIsDrawerOpen(false)} />
    </>
  );
};

export { Washoe };
