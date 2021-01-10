import React from "react";
import styled from "styled-components";
import { Text } from "../";

const Table = ({ data }) => (
  <TableMarkup titles={Object.keys(data[0])} data={data} />
);

const TableMarkup = ({ caption, titles, data }) => (
  <StyledTable>
    <caption><Text align="center" bold>{caption}</Text></caption>
    <colgroup>
      <col />
      <col />
      <col />
    </colgroup>
    <thead>
      <tr>
        {titles.map((title, i) => (
          <th key={i}>{title.toUpperCase()}</th>
        ))}
      </tr>
    </thead>
    <tbody>
      {data.map((item, i) => (
        <tr key={i}>
          {titles.map((title, i) => (
            <td key={i}>{item[title]}</td>
          ))}
        </tr>
      ))}
      
    </tbody>
  </StyledTable>
);

const StyledTable = styled.table`
  ${({ theme }) => `
        border: none;
        border-collapse: collapse;
        caption-side: bottom;
        width: 100%;
    
        td, th {
            border: none;
        }
    
        td {
            padding: 1% 2%;
        }
    
        tbody tr {
        :nth-of-type(even) {
            background-color: ${theme.colors.hover};
            color: ${theme.colors.background};
        }
        :hover {
            background-color: ${theme.colors.accent};
            color: ${theme.colors.background};
            font-weight: bold;
        }
        }
        thead > tr {
            background-color: ${theme.colors.secondary};
            color: ${theme.colors.background};
        }
    `}
`;

export default Table;