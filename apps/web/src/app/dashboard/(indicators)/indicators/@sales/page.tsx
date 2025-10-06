import { delay } from '@/lib/utils'
import { getUsersFakeLogin } from '../actions'
import { salesData } from '../data'
import { RecentSales } from './components/recent-sales'

export const revalidate = 0

export default async function Sales() {
  await delay(2000)

  // const data = await getUsersFakeLogin()
  return (
    <>
      {/* {JSON.stringify(data)} */}
      <RecentSales salesData={salesData} />
    </>
  )
}
