import { delay } from '@/lib/utils'
import { chartData } from '../data'
import { BarGraph } from './components/bar-graph'

export default async function BarStats() {
  await await delay(2000)
  return <BarGraph chartData={chartData} />
}
