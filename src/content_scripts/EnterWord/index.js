import React, { useState, useEffect, useRef } from "react";
import { Pane, Text, TextInput, Pill, ErrorIcon, TickCircleIcon } from "evergreen-ui";
import { filter, take, finalize, tap, pluck } from "rxjs/operators";
import { fromEvent } from "rxjs";

const Input = ({ isInvalid, isSuccess, ...props }) => (
  <Pane marginRight={24} display="flex" alignItems="center">
    <TextInput {...props} />
    <Pane height={16} width={16} marginLeft={-24} zIndex="9999">
      { isSuccess ? <TickCircleIcon color="success" /> : null }
      { isInvalid ? <ErrorIcon color="danger" /> : null }
    </Pane>
  </Pane>
);

export const EnterWord = ({ word: { id, word, meaning, stage }, onSuccess, onFail }) => {
  const [ isSuccess, setIsSuccess ] = useState(false);
  const [ isInvalid, setIsInvalid ] = useState(false);
  const inputEl = useRef(null);

  useEffect(() => {
    const keyDown$ = fromEvent(inputEl.current, "keydown");
    const enterKeyDown$ = keyDown$.pipe(
      tap(_ => setIsInvalid(false)), // Hides error icon on any key press
      filter(({ key }) => key == "Enter"),
      pluck("target", "value"),
      tap(value => value == word && handleSuccess()),

      filter(value => value != word), // Passes only errors
      tap(_ => setIsInvalid(true)),
      take(3),
      finalize(handleFinalFail)
    );
    enterKeyDown$.subscribe();
    return enterKeyDown$.unsubscrube;
  }, []);

  function handleSuccess () {
    setIsSuccess(true);
    setTimeout(onSuccess, 400);
  };

  function handleFinalFail (value) {
    onFail();
  };

  return (
    <Pane {...styles} >
      <Text marginRight="8px">{meaning}</Text>
      <Input autoFocus isSuccess={isSuccess} isInvalid={isInvalid} innerRef={inputEl} />
      <Pill marginLeft={8}>{stage}</Pill>
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
