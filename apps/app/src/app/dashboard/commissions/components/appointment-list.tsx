'use client'

import { Button } from '@workspace/ui/components/button'
import { useState } from 'react'
import { data } from '../data'
import { users } from '../users'
import ProjectToolbar from './ProjectToolbar'

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

export function AppointmentList() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list')

  return (
    <div className="max-w-6xl-- mx-auto--">
      {/* Cabeçalho */}
      <div className="flex justify-between-reverse items-center mb-6">
        <ProjectToolbar />
        <div className="flex gap-2">
          <Button
            className={`p-2 ${
              viewMode === 'grid' ? 'bg-indigo-600-- text-white' : 'hover:bg-gray-200 text-gray-700'
            }`}
            onClick={() => setViewMode('grid')}
            variant={viewMode === 'grid' ? 'destructive' : 'outline'}
          >
            🔲
          </Button>
          <Button
            className={`p-2 border rounded ${
              viewMode === 'list' ? 'bg-indigo-600 text-white' : 'hover:bg-gray-200 text-gray-700'
            }`}
            onClick={() => setViewMode('list')}
            title="Visualizar em lista"
          >
            📋
          </Button>
        </div>
      </div>

      {/* Visualização condicional */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {data.map((project) => (
            <div
              className="bg-white-- border rounded p-4 shadow hover:shadow-md transition"
              key={project.id}
            >
              <p className="font-semibold">{project.id}</p>
              <p className="text-sm text-muted-f">{project.id}</p>
            </div>
          ))}
        </div>
      ) : (
        <ul className="bg-white border rounded divide-y">
          {data.map((project) => (
            <li
              className="p-4 flex justify-between items-center hover:bg-gray-50 transition"
              key={project.id}
            >
              <div>
                <h3 className="text-base font-medium text-gray-800">{project.id}</h3>
                <p className="text-sm text-gray-500">{project.id}</p>
              </div>
              <Button size="sm" variant="link">
                Ver
              </Button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
export function AppointmentList2222() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list')

  return (
    <div className="max-w-6xl-- mx-auto--">
      {/* Cabeçalho */}
      <div className="flex justify-between-reverse items-center mb-6">
        <ProjectToolbar />
        <div className="flex gap-2">
          <Button
            className={`p-2 ${
              viewMode === 'grid' ? 'bg-indigo-600-- text-white' : 'hover:bg-gray-200 text-gray-700'
            }`}
            onClick={() => setViewMode('grid')}
            variant={viewMode === 'grid' ? 'destructive' : 'outline'}
          >
            🔲
          </Button>
          <Button
            className={`p-2 border rounded ${
              viewMode === 'list' ? 'bg-indigo-600 text-white' : 'hover:bg-gray-200 text-gray-700'
            }`}
            onClick={() => setViewMode('list')}
            title="Visualizar em lista"
          >
            📋
          </Button>
        </div>
      </div>

      {/* Visualização condicional */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {data.map((project) => (
            <div
              className="bg-white-- border rounded p-4 shadow hover:shadow-md transition"
              key={project.id}
            >
              <p className="font-semibold">{project.id}</p>
              <p className="text-sm text-muted-f">{project.id}</p>
            </div>
          ))}
        </div>
      ) : (
        <ul className="bg-white border rounded divide-y">
          {data.map((project) => (
            <li
              className="p-4 flex justify-between items-center hover:bg-gray-50 transition"
              key={project.id}
            >
              <div>
                <h3 className="text-base font-medium text-gray-800">{project.id}</h3>
                <p className="text-sm text-gray-500">{project.id}</p>
              </div>
              <Button size="sm" variant="link">
                Ver
              </Button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
