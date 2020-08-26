import React, { useState } from "react";
import AddWord from "../AddWordModal";
import { EnterWord } from "../EnterWord";
import "./style.css";

function Washoe () {
  const [ word, setWord ] = useState({});
  const [ isDrawerOpen, setIsDrawerOpen ] = useState(false);

  const actions = {
    showAddWordForm: _ => setIsDrawerOpen(true),
    closeAddWordForm: _ => setIsDrawerOpen(false),
    notification: setWord
  };

  browser.runtime.onMessage.addListener(({ action, data }) => actions[action](data));

  function onFail () {
    console.log("On Fail from Washoe component!");
    console.log("Word: ", word);
    browser.runtime.sendMessage({ action: "resetWordStage", data: { id: word.id } });
    setWord({});
  };

  function onSuccess () {
    console.log("On Success from Washoe component!");
    console.log("Word: ", word);
    browser.runtime.sendMessage({ action: "incrementWordStage", data: { id: word.id } });
    setWord({});
  };

  return (
    <>
      { Object.keys(word).length ? <EnterWord onFail={onFail} onSuccess={onSuccess} word={word} /> : null }
      <AddWord isShown={isDrawerOpen} onCloseComplete={() => setIsDrawerOpen(false)} />
    </>
  );
};

export { Washoe };
