'use client'

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
        <div className="max-w-6xl-- mx-auto transition-all w-full">
          <Grid columns={{ sm: 1, md: 1 }} gap="medium">
            {data.map((item) => (
              <React.Fragment key={item.id}>
                <ReferralViewList data={item} />
              </React.Fragment>
            ))}
          </Grid>
        </div>
      ) : null}
    </>
  )
}
