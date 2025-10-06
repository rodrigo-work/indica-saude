'use client'
import { useEffect, useState } from 'react'
export function AppointmentList() {
  const [items, setItems] = useState<any[]>([])
  useEffect(() => {
    fetch('/api/attendances')
      .then((r) => r.json())
      .then((d) => setItems(d || []))
      .catch(() => {})
  }, [])
  return (
    <div className="space-y-2">
      {items.map((i) => (
        <div className="rounded border p-3" key={i.id}>
          <div className="font-medium">{i.referral?.patientName ?? '—'}</div>
          <div className="text-sm">
            {i.status} — {i.date?.split('T')[0]}
          </div>
        </div>
      ))}
    </div>
  )
}
