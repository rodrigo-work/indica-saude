'use client'

import { Button } from '@workspace/ui/components/button'
import { useState } from 'react'

const items = [
  { id: 1, title: 'Item 1', description: 'Descrição do item listado.' },
  { id: 2, title: 'Item 2', description: 'Outro item interessante.' },
  { id: 3, title: 'Item 3', description: 'Mais um conteúdo aqui.' },
  { id: 4, title: 'Item 4', description: 'Descrição extra.' }
]

export default function ResponsiveList() {
  const [view, setView] = useState<'grid' | 'list'>('grid')

  return (
    <div className="p-6">
      {/* Menu de opções */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Minha Listagem</h1>
        <div className="space-x-2">
          <Button
            className={`px-4 py-2 rounded ${
              view === 'grid'
                ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
            }`}
            onClick={() => setView('grid')}
          >
            Grade
          </Button>
          <Button
            className={`px-4 py-2 rounded ${
              view === 'list'
                ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
            }`}
            onClick={() => setView('list')}
          >
            Lista
          </Button>
        </div>
      </div>

      {/* Container dos itens */}
      <div
        className={`transition-all ${
          view === 'grid'
            ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'
            : 'flex flex-col gap-4'
        }`}
      >
        {items.map((item) => (
          <div className="bg-white rounded-lg shadow p-4 flex flex-col" key={item.id}>
            <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
            <p className="text-gray-600 mb-4">{item.description}</p>
            <Button className="mt-auto text-indigo-600 hover:underline">Ver mais</Button>
          </div>
        ))}
      </div>
    </div>
  )
}
