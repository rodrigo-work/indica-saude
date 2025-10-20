export const getCommissionByIndicatorId = async (indicatorId: string) => {
  const res = await fetch(`http://localhost:3000/api/commissions/${indicatorId}`)
  return res.json()
}
