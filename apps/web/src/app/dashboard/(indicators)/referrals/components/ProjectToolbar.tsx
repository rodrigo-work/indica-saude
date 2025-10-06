'use client'

import { InputGroup, InputGroupAddon, InputGroupInput } from '@workspace/ui/components/input-group'
import { ToggleGroup, ToggleGroupItem } from '@workspace/ui/components/toggle-group'
import { LayoutGrid, List, SearchIcon } from 'lucide-react'
import { useReferrals } from '../referrals-provider'

export const Toolbar = () => {
  const { setViewMode } = useReferrals()

  return (
    <div>
      <div className="flex items-center justify-between w-full max-w-md-- gap-4 py-4">
        <InputGroup>
          <InputGroupInput placeholder="Search referrals..." />
          <InputGroupAddon align="inline-start">
            <SearchIcon />
          </InputGroupAddon>
        </InputGroup>

        <ToggleGroup size="default" type="single" variant="outline">
          <ToggleGroupItem onClick={() => setViewMode('grid')} value="grid">
            <LayoutGrid className="w-4 h-4" />
          </ToggleGroupItem>
          <ToggleGroupItem onClick={() => setViewMode('list')} value="list">
            <List className="w-4 h-4" />
          </ToggleGroupItem>
        </ToggleGroup>
      </div>
    </div>
  )
}
