import React from "react";
import { Table as ETable } from "evergreen-ui";
import PropTypes from "prop-types";

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

Table.propTypes = {
  words: PropTypes.arrayOf(
    PropTypes.shape({
      word: PropTypes.string.isRequired,
      meaning: PropTypes.string.isRequired,
      example: PropTypes.string
    })
  )
};
