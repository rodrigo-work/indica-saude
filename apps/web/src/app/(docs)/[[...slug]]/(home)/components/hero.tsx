'use client'

import { Button } from '@workspace/ui/components/button'
import Image from 'next/image'
import { useState } from 'react'
import { Video } from '@/components/video'
import Link from 'next/link'

const videos = [
  {
    id: 'orcdev',
    url: 'https://www.youtube.com/watch?v=48XBN3RpIvY',
    title: 'Canada Health Infoway',
    avatar: 'https://github.com/rodrigo-work.png'
  },
  {
    id: 'betterstack',
    url: 'https://www.youtube.com/watch?v=WPRTSUnmONk',
    title: 'Inlera University',
    avatar: 'https://github.com/rodrigo-work.png'
  }
]

export const Hero = () => {
  const [video, setVideo] = useState(videos[0].id)
  const activeVideo = videos.find((v) => v.id === video)

  return (
    <div className="grid items-center gap-8 lg:grid-cols-2">
      <div className="grid gap-6">
        <h1 className="mb-0 text-balance font-semibold text-4xl! tracking-tighter! md:text-5xl! xl:text-6xl!">
          Referring patients has never been this simple and secure.
        </h1>
        <p className="max-w-xl text-muted-foreground md:text-xl">

          Earn transparent <a className="underline" href="#">
            commissions
          </a>, track everything in real time,
with no paperwork involved.
Whether you're a health <a className="underline" href="#">
            professional
          </a>  or a <a className="underline" href="#">
            referrer
          </a>,
we make patient referrals easier and more efficient.
        </p>
        <div className="flex w-full max-w-lg items-center gap-4">
 {/* <Installer /> */}
          <Button asChild className="px-4" size="lg" variant="outline">
            <Link href="/docs/introduction">Read the docs</Link>
          </Button>
          <Button asChild className="px-8" size="lg" variant="default" >
            <Link href="/docs/introduction">Read the docs</Link>
          </Button>
        </div>
      </div>
      <div>
        {activeVideo && <Video video={activeVideo.url} />}
        <div className="mt-4 flex items-center justify-center gap-2">
          {videos.map((v) => (
            <Button
              key={v.id}
              onClick={() => setVideo(v.id)}
              variant={video === v.id ? 'secondary' : 'ghost'}
            >
              <Image alt={v.title} height={20} src={v.avatar} width={20} />
              {v.title}
            </Button>
          ))}
        </div>
      </div>
    </div>
  )
}
