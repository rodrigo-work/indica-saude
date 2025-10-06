import { z } from 'zod'

export const videoSchema = z.object({
  id: z.string(),
  url: z.url(),
  title: z.string(),
  avatar: z.url()
})

export type Video = z.infer<typeof videoSchema>

export const videosSchema = z.array(videoSchema)
export type Videos = z.infer<typeof videosSchema>

/**
 * Mock videos data.
 */
export const MOCK_VIDEOS: Videos = [
  {
    id: '48XBN3RpIvY',
    url: 'https://www.youtube.com/watch?v=48XBN3RpIvY',
    title: 'Effective Management',
    avatar: 'https://github.com/rodrigo3d.png'
  },
  {
    id: 'WPRTSUnmONk',
    url: 'https://www.youtube.com/watch?v=WPRTSUnmONk',
    title: 'What is a Dr. Referral?',
    avatar: 'https://github.com/rodrigo-work.png'
  }
]
