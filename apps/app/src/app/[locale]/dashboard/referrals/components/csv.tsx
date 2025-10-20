'use client'

import { getCoreRowModel, useReactTable } from '@tanstack/react-table'

export function MyTable({ data, columns }: any) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel()
  })

  // 📤 Exportar CSV (apenas dados renderizados)
  const exportToCSV = () => {
    // Colunas visíveis
    const visibleColumns = table.getVisibleFlatColumns()
    const headers = visibleColumns.map((col) =>
      typeof col.columnDef.header === 'string' ? col.columnDef.header : col.id
    )

    // Linhas visíveis (respeita filtros, ordenação e paginação)
    const rows = table.getRowModel().rows.map((row) =>
      row.getVisibleCells().map((cell) => {
        const val = cell.getValue()
        // Escapar aspas duplas e vírgulas
        return typeof val === 'string' ? `"${val.replace(/"/g, '""')}"` : val
      })
    )

    // Gerar CSV
    const csvContent = [headers, ...rows].map((row) => row.join(',')).join('\n')

    // Baixar arquivo
    const blob = new Blob([csvContent], {
      type: 'text/csv;charset=utf-8;'
    })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'tabela.csv'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div>
      <button onClick={exportToCSV}>📤 Exportar CSV</button>

      {/* <table
        border={1}
        cellPadding={4}
        style={{ borderCollapse: 'collapse', width: '100%', marginTop: 10 }}
      >
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table> */}
    </div>
  )
}
