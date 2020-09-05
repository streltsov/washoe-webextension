import React from "react";
import ReactDOM from "react-dom";
import { Pane, Menu } from "evergreen-ui";

const { Group, Item, Divider } = Menu;

const handleAddWord = _ => {
  browser.runtime.sendMessage({ action: "showAddWordForm" });
  window.close();
};

const handleDictionary = _ => {
  browser.tabs.create({
    url: "/dictionary.html"
  });
  window.close();
};

function Popup () {
  return (
    <Pane display="flex" flexDirection="column" width={320}>
      <Menu>
        <Group>
          <Item onClick={handleAddWord} icon="plus">Add word</Item>
          <Item onClick={handleDictionary} icon="font">Dictionary</Item>
        </Group>
      </Menu>
    </Pane>
  );
};

ReactDOM.render(<Popup />, document.getElementById("root"));
