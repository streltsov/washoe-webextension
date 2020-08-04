import React, { useState } from "react";
import AddWord from "../AddWordModal";
import { EnterWord } from "../EnterWord";
import "./style.css";

function Washoe () {
  const [ word, setWord ] = useState({});
  const [ isDrawerOpen, setIsDrawerOpen ] = useState(false);

  const actions = {
    "showAddWordForm": _ => setIsDrawerOpen(true),
    notification: word => setWord(JSON.parse(word))
  };

  browser.runtime.onMessage.addListener(({ action, data }) => actions[action](data));

  return (
    <>
      { Object.keys(word).length ? <EnterWord close={() => setWord({})} word={word}/> : null }
      <AddWord isShown={isDrawerOpen} onCloseComplete={() => setIsDrawerOpen(false)} />
    </>
  );
};

export { Washoe };
