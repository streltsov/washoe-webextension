import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { Pane, Table } from "evergreen-ui";
import localforage from "localforage";



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

  useEffect(_ => console.log(words), [ words ]);

  return (
    <Pane>
      <Table>

        <Table.Head>
          <Table.SearchHeaderCell />
          <Table.TextHeaderCell>Meaning</Table.TextHeaderCell>
          <Table.TextHeaderCell>Example</Table.TextHeaderCell>
          <Table.TextHeaderCell>Stage</Table.TextHeaderCell>
        </Table.Head>

        <Table.Body>
          {words.map(word => (
            <Table.Row key={word.id}>
              <Table.TextCell>{word.word}</Table.TextCell>
              <Table.TextCell>{word.meaning}</Table.TextCell>
              <Table.TextCell>{word.example}</Table.TextCell>
              <Table.TextCell isNumber>{word.stage}</Table.TextCell>
            </Table.Row>
          ))}
        </Table.Body>

      </Table>
    </Pane>
  );
};

ReactDOM.render(<Dictionary />, document.getElementById("root"));
