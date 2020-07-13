import React, { useState } from "react";
import { compose, props } from "sanctuary";
import { SideSheet, Pane, Card, Heading, TextInput, Textarea, Button, Paragraph } from "evergreen-ui";

function AddWord () {
  const [ word, setWord ] = useState("");
  const [ meaning, setMeaning ] = useState("");
  const [ example, setExample ] = useState("");

  const getValue = props([ "target", "value" ]);
  const onSubmit = data =>
    browser.runtime.sendMessage({ action: "add word", data });

  return (
    <SideSheet
      isShown={true}
      onCloseComplete={() => document.querySelector("#washoe-portal").remove()}
      containerProps={{ display: "flex", flexDirection: "column" }}>

      <Pane padding={16} borderBottom="muted">
        <Heading size={600}>Add word</Heading>
      </Pane>

      <Pane margin={8}>
        <TextInput
          required
          width="100%"
          type="email"
          value={word}
          placeholder="Word"
          onChange={compose (setWord) (getValue)} />
      </Pane>

      <Pane margin={8}>
        <Textarea
          required
          width="100%"
          value={meaning}
          placeholder="Meaning"
          onChange={compose (setMeaning) (getValue)} />
      </Pane>

      <Pane margin={8}>
        <Textarea
          width="100%"
          value={example}
          placeholder="Example (optional)"
          onChange={compose (setExample) (getValue)} />
      </Pane>


      <Pane margin={8} display="flex" flexDirection="row-reverse" >
        <Button onClick={() => onSubmit({ word, meaning, example })}>
          Done
        </Button>
      </Pane>

    </SideSheet>
  );
};

export default AddWord;