import React, { useState } from "react";
import AddWord from "../AddWordModal";
import { EnterWord } from "../EnterWord";
import { ChooseButton } from "../ChooseButton";
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
    browser.runtime.sendMessage({ action: "resetWordStage", data: { id: word.id } });
    setWord({});
  };

  function onSuccess () {
    browser.runtime.sendMessage({ action: "incrementWordStage", data: { id: word.id } });
    setWord({});
  };

  return (
    <>

      { !Object.keys(word).length
        ? null
        : word.stage % 2
          ? <EnterWord onFail={onFail} onSuccess={onSuccess} word={word} />
          : <ChooseButton onFail={onFail} onSuccess={onSuccess} word={word} /> }

      <AddWord isShown={isDrawerOpen} onCloseComplete={() => setIsDrawerOpen(false)} />

    </>
  );
};

export { Washoe };
