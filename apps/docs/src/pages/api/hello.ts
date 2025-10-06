// pages/api/hello.ts
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  message: string
}

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (req.method === 'GET') {
    res.status(200).json({ message: 'Olá do TypeScript!' })
  } else {
    res.status(405).json({ message: 'Método não permitido' })
  }
}
