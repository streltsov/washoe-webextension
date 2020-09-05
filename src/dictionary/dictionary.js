import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { fetchAllWords } from "../utils/webExtension";
import { Table } from "./components/Table";
import localforage from "localforage";
import { Pane } from "evergreen-ui";

function Dictionary () {
  const [ words, setWords ] = useState([]);
  useEffect(_ => fetchAllWords(setWords), []);
  return <Table words={words} />;
};

ReactDOM.render(<Dictionary />, document.getElementById("root"));
