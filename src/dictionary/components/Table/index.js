import React from "react";
import { Table as ETable } from "evergreen-ui";
const { Head, Body, SearchHeaderCell, Row, TextHeaderCell, TextCell } = ETable;

export const Table = ({ words }) => (
  <ETable>
    <Head>
      <SearchHeaderCell />
      <TextHeaderCell>Meaning</TextHeaderCell>
      <TextHeaderCell>Example</TextHeaderCell>
      <TextHeaderCell>Stage</TextHeaderCell>
    </Head>

    <Body>
      {words.map(word => (
        <Row key={word.id}>
          <TextCell>{word.word}</TextCell>
          <TextCell>{word.meaning}</TextCell>
          <TextCell>{word.example}</TextCell>
          <TextCell isNumber>{word.stage}</TextCell>
        </Row>
      ))}
    </Body>
  </ETable>
);
