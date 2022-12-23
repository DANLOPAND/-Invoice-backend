import React, { useState } from "react";
import MaterialReactTable from "material-react-table";

const Table = ({ data, columns, ...props }) => {
  const [rowSelection] = useState({});

  return (
    <MaterialReactTable
      columns={columns}
      data={data}
      {...props}
      getRowId={(row) => row.userId}
      state={{ rowSelection }}
      enableBottomToolbar={false}     
    />
  );
};

export default Table;
