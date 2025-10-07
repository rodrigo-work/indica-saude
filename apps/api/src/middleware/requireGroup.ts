import type { NextFunction, Request, Response } from 'express'

export function requireGroup(groupName: string) {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = (req as any).user

    if (!user) {
      return res.status(401).json({ message: 'Usuário não autenticado' })
    }

    const groups = user['cognito:groups'] as string[] | undefined

    if (!groups || !groups.includes(groupName)) {
      return res.status(403).json({ message: `Acesso restrito ao grupo: ${groupName}` })
    }

    next()
  }
}
