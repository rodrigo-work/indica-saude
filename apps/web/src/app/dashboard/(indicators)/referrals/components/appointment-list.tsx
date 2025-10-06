'use client'

import { Button } from '@workspace/ui/components/button'
import { useState } from 'react'
import { useReferrals } from '../referrals-provider'

type Professional = {
  id: string
  name: string
}

type Project = {
  id: number
  patientName: string
  patientEmail: string
  patientPhone: string
  professionalId: string
  scheduledDate: string
  scheduledTime: string
  professional: Professional
  status: string
  specialty: string
  description: string
}

export function AppointmentList({ projects }: { projects: Project[] }) {
  const { viewMode } = useReferrals()

  return (
    <div className="max-w-6xl-- mx-auto-- transition-all">
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.map((project) => (
            <div
              className="bg-white border rounded p-4 shadow hover:shadow-md transition"
              key={project.id}
            >
              <p className="font-semibold">{project.patientName}</p>
              <p className="text-sm text-muted-f">status: {project.status}</p>
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
                <div className="">{project.patientName}</div>
                <div className="">{project.patientEmail}</div>
              </div>
              <div>
                <div className="">{project.professional.name}</div>
              </div>
              <div>
                <div className="">{project.scheduledDate}</div>
                <div className="">{project.scheduledTime}</div>
              </div>
              <div>
                <div className="">{project.status}</div>
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
