'use client'

import { useState } from 'react'

type Project = {
  id: number
  name: string
  description: string
}

const projects: Project[] = [
  { id: 1, name: 'Projeto A', description: 'Descrição do projeto A' },
  { id: 2, name: 'Projeto B', description: 'Descrição do projeto B' },
  { id: 3, name: 'Projeto C', description: 'Descrição do projeto C' },
  { id: 4, name: 'Projeto D', description: 'Descrição do projeto D' },
  { id: 5, name: 'Rodrig D', description: 'Descojeto D' }
]

export default function Dashboard() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

  return (
    <div className="bg-gray-100 p-6 min-h-screen">
      <div className="max-w-6xl mx-auto">
        {/* Botões de alternância */}
        <div className="flex justify-end mb-4 gap-2">
          <button
            aria-label="Grid View"
            className={`p-2 border rounded ${
              viewMode === 'grid' ? 'bg-gray-200' : 'hover:bg-gray-200'
            }`}
            onClick={() => setViewMode('grid')}
          >
            🔲
          </button>
          <button
            aria-label="List View"
            className={`p-2 border rounded ${
              viewMode === 'list' ? 'bg-gray-200' : 'hover:bg-gray-200'
            }`}
            onClick={() => setViewMode('list')}
          >
            📋
          </button>
        </div>

        {/* Renderização condicional */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {projects.map((project) => (
              <div
                className="bg-white border rounded p-4 shadow hover:shadow-md transition"
                key={project.id}
              >
                <h3 className="text-lg font-semibold">{project.name}</h3>
                <p className="text-sm text-gray-600">{project.description}</p>
              </div>
            ))}
          </div>
        ) : (
          <ul className="bg-white border rounded divide-y">
            {projects.map((project) => (
              <li
                className="p-4 flex justify-between items-center hover:bg-gray-50 transition"
                key={project.id}
              >
                <div>
                  <h3 className="text-base font-medium">{project.name}</h3>
                  <p className="text-sm text-gray-500">{project.description}</p>
                </div>
                <button className="text-blue-600 text-sm hover:underline">Ver</button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
