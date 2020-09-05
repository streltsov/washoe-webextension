import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { ErrorFallback } from "../components/ErrorFallback";
import { fetchAllWords } from "../utils/webExtension";
import { ErrorBoundary } from "react-error-boundary";
import { Table } from "./components/Table";

function Dictionary () {
  const [ words, setWords ] = useState([]);
  useEffect(_ => fetchAllWords(setWords), []);
  return <Table words={words} />;
};

ReactDOM.render(
  <ErrorBoundary FallbackComponent={ErrorFallback}>
    <Dictionary />
  </ErrorBoundary>,
  document.getElementById("root")
);
