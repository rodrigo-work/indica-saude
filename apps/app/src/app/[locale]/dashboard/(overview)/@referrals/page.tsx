import { delay } from '@/lib/utils'
import { fetchApi } from '@/services'
import { referralsSchema } from '../data'
import { RecentReferrals } from './components/recent-referrals'

export const revalidate = 0

export default async function Referrals() {
  const { data } = await fetchApi('/api/referrals')
  const referralData = referralsSchema.parse(data)

  await delay(2000)
  return (
    <>
      {/* {JSON.stringify(data)} */}
      <RecentReferrals referralData={referralData} />
    </>
  )
}
