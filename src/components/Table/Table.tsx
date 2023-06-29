import { TableButtons } from 'components/assets/TableButtons/TableButton';
import { headers } from 'helpers/tableHelpers';
import { getTagName } from 'helpers/tagNameId';
import React from 'react';
import { StyledTable } from 'components/Table/layout';
import { Fruit } from 'types/Fruit';
import { Vegetable } from 'types/Vegetable';

interface TableProps<T> {
  data: T[];
  handleEdit: (fruit: Fruit | Vegetable) => void;
  handleDelete: (id: string) => void;
}

export const Table: React.FC<TableProps<Fruit | Vegetable>> = ({
  data,
  handleEdit,
  handleDelete,
}) => {
  return (
    <StyledTable>
      <thead>
        <tr>
          {headers.map((header, index) => (
            <th key={index}>{header}</th>
          ))}
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {data.length === 0 ? (
          <tr>
            <th colSpan={headers.length + 1}>No products found</th>
          </tr>
        ) : (
          data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              <th>{row.name}</th>
              <th>{row.description}</th>
              <th>{row.tags && row.tags.map(getTagName).join(', ')}</th>
              <th>{row.isArchived ? 'Yes' : 'No'}</th>
              <th>
                <TableButtons
                  onEdit={() => handleEdit(row)}
                  onDelete={() => handleDelete(row.id)}
                />
              </th>
            </tr>
          ))
        )}
      </tbody>
    </StyledTable>
  );
};
