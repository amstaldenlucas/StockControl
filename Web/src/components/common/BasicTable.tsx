import React from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table"

interface BasicTableProps<T> {
  headers: string[]
  items: T[],
  tableControls?: (item: T) => React.ReactNode
}

export default function BasicTable<T extends object>({
  headers,
  items,
  tableControls
}: BasicTableProps<T>) {
  const headerCells = headers.map((item, i) => (
    <TableCell
      key={i}
      isHeader
      className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
    >
      {item}
    </TableCell>
  ))

  function loadTableCell(item: T) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id, ...itemWithoutId } = item as T;
  return (
    <>
      {
      Object.values(itemWithoutId)
      .map((value, i) => (
        <TableCell
          key={i}
          className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400"
        >
          {String(value)}
        </TableCell>
      ))}

      {tableControls && (
        <TableCell>
          {tableControls(item)}
        </TableCell>
      )}
    </>
  );
}


  const tableRows = items.map((item, i) => (
    <TableRow key={i}>{loadTableCell(item)}</TableRow>
  ))

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <div className="max-w-full overflow-x-auto">
        <div className="min-w-[1102px]">
          <Table>
            <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
              <TableRow>{headerCells}</TableRow>
            </TableHeader>

            <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
              {tableRows}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  )
}
