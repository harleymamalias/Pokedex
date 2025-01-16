import React from "react";
import styled, { keyframes } from "styled-components";
import PokedexTableRow from "./PokedexTableRow";

const smoothFadeIn = keyframes`
  0% {
    opacity: 0;
    transform: translateY(10px); /* Starts slightly below */
  }
  100% {
    opacity: 1;
    transform: translateY(0); /* Ends in normal position */
  }
`;

const Table = styled.table`
  border-collapse: collapse;
  margin: 10px auto;
  font-size: 1rem;
  font-family: "Roboto", sans-serif;
  min-width: 700px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  overflow: hidden;
`;

const TableHead = styled.thead`
  background-color: #ffde00;
  color: #000000;
  text-align: left;

  th {
    padding: 12px 16px;
    text-transform: uppercase;
    font-weight: 600;
    letter-spacing: 0.5px;
  }
`;

const TableBody = styled.tbody`
  tr {
    animation: ${smoothFadeIn} 0.6s ease-in-out forwards;
    &:nth-child(even) {
      background-color: #f9f9f9;
    }
    &:hover {
      background-color: #ffef9a;
      cursor: pointer;
    }
  }

  td {
    padding: 12px 16px;
    text-align: left;
    border-bottom: 1px solid #ddd;
  }
`;

export interface TableColumn<T> {
  header: string;
  accessor: keyof T;
  render?: (value: any) => React.ReactNode;
}

interface TableProps<T> {
  data: T[];
  columns: TableColumn<T>[];
  onRowClick: (itemRow: T) => void;
}

const PokedexTable = <T,>({
  data,
  columns,
  onRowClick,
}: TableProps<T>): React.ReactElement => {
  if (!data || data.length === 0) {
    return <div>No data found. Try searching for something else.</div>;
  }

  return (
    <Table>
      <TableHead>
        <tr>
          {columns.map((column) => (
            <th key={String(column.accessor)}>{column.header}</th>
          ))}
        </tr>
      </TableHead>
      <TableBody>
        {data.map((item, index) => (
          <PokedexTableRow
            key={index}
            item={item}
            columns={columns}
            onRowClick={onRowClick}
          />
        ))}
      </TableBody>
    </Table>
  );
};

export default PokedexTable;
