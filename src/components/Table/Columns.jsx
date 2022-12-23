// This file contains the columns for the tables

const ProductColumns = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "quantity",
    header: "Quantity",
  },
  {
    accessorKey: "price",
    header: "Price",
  },
  {
    accessorKey: "subTotal",
    header: "SubTotal",
  },
];

const InvoiceColumns = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "name",
    header: "Client",
  },
  {
    accessorKey: "date",
    header: "Date",
  },
  {
    accessorKey: "subTotal",
    header: "SubTotal",
    accessorFn: (row) => {
      return Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(row.total);
    },
  },
  {
    accessorKey: "discount",
    header: "Discount",
    accessorFn: (row) => {
      return row.discount + "%";
    },
  },
  {
    accessorKey: "total",
    header: "Total",
    accessorFn: (row) => {
      return Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(row.total);
    },
  },
];


const InvoiceDetailsColumns = [
    {
        accessorKey: "id",
        header: "ID",
    },
    {
        accessorKey: "id_invoice",
        header: "Invoice ID",
    },
    {
        accessorKey: "id_product",
        header: "Product ID",
    },
    {
        accessorKey: "name",
        header: "Name",
    },
    {
        accessorKey: "quantity",
        header: "Quantity",
    },
    {
        accessorKey: "price",
        header: "Price",
        accessorFn: (row) => {
            return Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD",
            }).format(row.price);
          },
    },
];

export { ProductColumns, InvoiceColumns, InvoiceDetailsColumns};
