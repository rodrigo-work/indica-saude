// components/ProjectToolbar.tsx
'use client'

import { ChevronDown, LayoutGrid, List, Plus, Search } from 'lucide-react'
import { useState } from 'react'

export default function ProjectToolbar() {
  const [view, setView] = useState<'grid' | 'list'>('list')

  return (
    <div className="flex w-full items-center gap-2 p-4 bg-red border border-gray-200 rounded-md shadow-sm">
      {/* Search Input */}
      <div className="relative flex-1">
        <Search className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400 w-4 h-4" />
        <input
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Search Projects..."
          type="text"
        />
      </div>

      {/* View toggle */}
      <div className="flex border border-gray-300 rounded-md overflow-hidden">
        <button
          aria-label="Grid View"
          className={`p-2 hover:bg-gray-100 ${view === 'grid' ? 'bg-gray-200' : ''}`}
          onClick={() => setView('grid')}
        >
          <LayoutGrid className="w-4 h-4" />
        </button>
        <button
          aria-label="List View"
          className={`p-2 hover:bg-gray-100 ${view === 'list' ? 'bg-gray-200' : ''}`}
          onClick={() => setView('list')}
        >
          <List className="w-4 h-4" />
        </button>
      </div>

      {/* Add New button */}
      <div className="relative">
        <button className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition">
          <Plus className="w-4 h-4" />
          Add New...
          <ChevronDown className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}
