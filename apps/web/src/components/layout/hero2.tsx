'use client'

import { Button } from '@workspace/ui/components/button'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { Video } from '../video'

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

export function HeroSection() {
  const [video, setVideo] = useState(videos[0].id)
  const activeVideo = videos.find((v) => v.id === video)

  return (
    <section className="pb-24 pt-12-- md:pb-32 lg:pb-56 lg:pt-44--">
      <div className="relative-- mx-auto flex max-w-6xl flex-col gap-4 justify-between items-center px-6 lg:block border border-red-500">
        <div className="mx-auto max-w-lg text-center lg:ml-0 lg:w-1/2-- lg:text-left border border-blue-500">
          <h1 className="mt-8 max-w-2xl text-balance text-5xl font-medium md:text-6xl lg:mt-16 xl:text-7xl">
            Ship 10x Faster with NS
          </h1>
          <p className="mt-8 max-w-2xl text-pretty text-lg">
            Highly customizable components for building modern websites and applications that look
            and feel the way you mean it.
          </p>

          <div className="mt-12 flex flex-col items-center justify-center gap-2 sm:flex-row lg:justify-start">
            <Button asChild className="px-5 text-base" size="lg">
              <Link href="#link">
                <span className="text-nowrap">Start Building</span>
              </Link>
            </Button>
            <Button asChild className="px-5 text-base" key={2} size="lg" variant="ghost">
              <Link href="#link">
                <span className="text-nowrap">Request a demo</span>
              </Link>
            </Button>
          </div>
        </div>
        <div className="mx-auto max-w-lg text-center lg:ml-0 lg:w-1/2-- lg:text-left border border-blue-500">
          <h1 className="mt-8 max-w-2xl text-balance text-5xl font-medium md:text-6xl lg:mt-16 xl:text-7xl">
            Ship 10x Faster with NS
          </h1>
          <p className="mt-8 max-w-2xl text-pretty text-lg">
            Highly customizable components for building modern websites and applications that look
            and feel the way you mean it.
          </p>

          <div className="mt-12 flex flex-col items-center justify-center gap-2 sm:flex-row lg:justify-start">
            <Button asChild className="px-5 text-base" size="lg">
              <Link href="#link">
                <span className="text-nowrap">Start Building</span>
              </Link>
            </Button>
            <Button asChild className="px-5 text-base" key={2} size="lg" variant="ghost">
              <Link href="#link">
                <span className="text-nowrap">Request a demo</span>
              </Link>
            </Button>
          </div>
        </div>

        {/* Aqui colocamos a div de vídeo na posição do background */}
        {/* <div className="border border-blue-500">
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
        </div> */}
      </div>
    </section>
  )
}
