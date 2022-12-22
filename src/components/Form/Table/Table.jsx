import React, { useState } from 'react';
import MaterialReactTable from 'material-react-table';

const Table = ({ data, columns, ...props }) => {
  const [selectedRows, setSelectedRows] = useState([]);

  const handleRowSelection = (selectedRows) => {
    setSelectedRows(selectedRows);
  };

  return (
    <div>
      <MaterialReactTable
        columns={columns}
        data={data}
        options={{
          selection: true,
          selectionProps: (rowData) => ({
            disabled: rowData.disabled,
          }),
        }}
        onSelectionChange={handleRowSelection}
        {...props}
      />
    </div>
  );
};

export default Table;