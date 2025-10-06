import type { Metadata } from 'next'
import SignInViewPage from '../components/sign-in-view'

export const metadata: Metadata = {
  title: 'Authentication | Sign In',
  description: 'Sign In page for authentication.'
}

export default async function Page() {
  let stars = 3000 // Default value

  try {
    const response = await fetch('https://api.github.com/repos/rodrigo-work/indica-saude', {
      next: { revalidate: 86_400 }
    })

    if (response.ok) {
      const data = await response.json()
      stars = data.stargazers_count || stars // Update stars if API response is valid
    }
  } catch (error) {
    // biome-ignore lint/suspicious/noConsole: Needed
    console.error('Error fetching GitHub stars:', error)
  }
  return <SignInViewPage stars={stars} />
}
