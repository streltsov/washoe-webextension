import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { Pane } from "evergreen-ui";
import localforage from "localforage";
import { Table } from "./components/Table";


function Dictionary () {
  const [ words, setWords ] = useState([]);

  useEffect(_ => {
    localforage.iterate(function (value, key, iterationNumber) {
      setWords(p => [ ...p, value ]);
    }).then(function () {
      console.log("Iteration has completed");
    }).catch(function (err) {
      console.log(err);
    });
  }, []);

  return <Table words={words} />;
};

ReactDOM.render(<Dictionary />, document.getElementById("root"));
