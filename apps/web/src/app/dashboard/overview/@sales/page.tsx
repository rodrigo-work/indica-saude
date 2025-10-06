import { RecentSales } from './components/recent-sales'

export default async function Sales() {
  await new Promise((resolve) => setTimeout(resolve, 3000))
  return <RecentSales />
}
