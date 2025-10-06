'use client'
import { useEffect, useState } from 'react'
export function ReferralList() {
  const [items, setItems] = useState<any[]>([])
  useEffect(()=>{ fetch('/api/referrals').then(r=>r.json()).then(d=>setItems(d||[])).catch(()=>{}) },[])
  return (
    <div className="space-y-2">
      {items.map(i => (
        <div key={i.id} className="p-3 border rounded">
          <div className="font-medium">{i.patientName}</div>
          <div className="text-sm text-muted-foreground">{i.status} — {i.scheduledDate?.split('T')[0]}</div>
        </div>
      ))}
    </div>
  )
}
