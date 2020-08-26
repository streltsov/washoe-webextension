import React, { useState, useEffect, useRef } from "react";
import { filter, map, take, finalize } from "rxjs/operators";
import { Pane, Text, TextInput } from "evergreen-ui";
import { fromEvent } from "rxjs";

export const EnterWord = ({ word: { id, word, meaning }, onSuccess, onFail }) => {
  const inputEl = useRef(null);

  useEffect(() => {
    const keyDown$ = fromEvent(inputEl.current, "keydown");
    const enterKeyDown$ = keyDown$.pipe(
      filter(({ key }) => key == "Enter"),
      map(({ target: { value } }) => value),
      take(3),
      finalize(onFail)
    );
    enterKeyDown$.subscribe(value => value == word ? onSuccess() : null);
    return enterKeyDown$.unsubscrube;
  }, []);

  return (
    <Pane {...styles} >
      <Text marginRight="8px">{meaning}</Text>
      <TextInput innerRef={inputEl} />
    </Pane>
  );
};


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
