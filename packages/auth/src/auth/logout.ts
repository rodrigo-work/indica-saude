import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { settings } from '../constants/data'
import { removeSession } from '../lib/cognito'

export const AuthLogout = async () => {
  const cookieStore = await cookies()

  try {
    const accessToken = cookieStore.get(settings.cookies.access_token)?.value

    const logoutCognito = await removeSession(accessToken)

    console.log('logoutCognito', logoutCognito)

    cookieStore.delete(settings.cookies.id_token)
    cookieStore.delete(settings.cookies.access_token)
    cookieStore.delete(settings.cookies.refresh_token)

    return NextResponse.json({ ok: true })
  } catch (error) {
    // console.error(error)
    return NextResponse.json({ error: (error as Error).message }, { status: 500 })
  }
}
