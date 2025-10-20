'use client'

import { Button } from '@workspace/ui/components/button'
import React from 'react'
import { Grid } from '@/components/layout/grid/grid'
import { useReferrals } from '../referrals-provider'
import type { Referrals } from '../schema'
import { ReferralViewCard, ReferralViewList } from './referral-view-card'

export function ReferralView({ data }: { data: Referrals }) {
  const { viewMode } = useReferrals()

  return (
    <>
      {viewMode === 'grid' ? (
        <div className="max-w-6xl-- mx-auto transition-all w-full">
          <Grid columns={{ sm: 1, md: 2, lg: 3, xl: 4 }} gap="medium">
            {data.map((item) => (
              <React.Fragment key={item.id}>
                <ReferralViewCard data={item} />
              </React.Fragment>
            ))}
          </Grid>
        </div>
      ) : null}

      {viewMode === 'list' ? (
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
        // <div className="max-w-6xl-- mx-auto transition-all w-full">
        //   <Grid columns={{ sm: 1, md: 1 }} gap="medium">
        //     {data.map((item) => (
        //       <React.Fragment key={item.id}>
        //         <ReferralViewList data={item} />
        //       </React.Fragment>
        //     ))}
        //   </Grid>
        // </div>
      ) : null}
    </>
  )
}
