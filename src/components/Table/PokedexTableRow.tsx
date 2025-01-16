import React, { useState } from "react";
import styled from "styled-components";
import { TableColumn } from "./PokedexTable";

const TableRow = styled.tr`
  background-color: #ffffff;
  border-bottom: 1px solid #e5e7eb;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #f3f4f6;
  }

  td {
    padding: 8px;
    text-align: left;
    font-size: 0.875rem;
    color: #4b5563;
  }
`;

const TableCell = styled.td`
  padding: 8px 15px;
`;

interface TableRowProps<T> {
  item: T;
  columns: TableColumn<T>[];
  onRowClick: (itemRow: T) => void;
}

const PokedexTableRow = <T,>({ item, columns, onRowClick }: TableRowProps<T>): React.ReactElement => {

  return (

    <tr onClick={() => onRowClick(item)}>

      {columns.map((column) => (

        <td key={String(column.accessor)}>

          {column.render ? column.render(item[column.accessor]) : (item[column.accessor] as React.ReactNode)}

        </td>

      ))}

    </tr>

  );

};



export default PokedexTableRow;
