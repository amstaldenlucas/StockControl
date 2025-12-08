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
  items: T[]
}

export default function BasicTable<T extends object>({
  headers,
  items,
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
    return Object.values(item).map((value, i) => (
      <TableCell
        key={i}
        className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400"
      >
        {String(value)}
      </TableCell>
    ))
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
