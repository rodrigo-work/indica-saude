import { delay } from '@/lib/utils'
import { salesData } from '../data'
import { RecentSales } from './components/recent-sales'

export const revalidate = 0

export default async function Sales() {
  await delay(2000)
  return <RecentSales salesData={salesData} />
}
