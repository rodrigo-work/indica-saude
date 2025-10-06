'use client'

import { Button } from '@workspace/ui/components/button'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { GridCell } from '@/components/grid'
import { Installer } from '@/components/installer'
import { Video } from '@/components/video'
import { MOCK_VIDEOS } from '@/data'

export const Hero = () => {
  const [video, setVideo] = useState(MOCK_VIDEOS[0].id)
  const activeVideo = MOCK_VIDEOS.find((v) => v.id === video)

  return (
    <GridCell className="col-span-2">
      <div className="grid w-full grid-cols-1 gap-x-4 md:grid-cols-2">
        <div className="px-0 md:mb-0">
          <div className="flex flex-col justify-center gap-6 px-6 py-12 md:p-16">
            <h1 className="mb-0 text-balance font-semibold text-4xl! tracking-tighter! md:text-5xl! xl:text-6xl!">
              Referring patients has never been this simple and secure.
            </h1>
            <p className="text-muted-foreground md:text-xl">
              Earn transparent commissions, track everything in real time, with no paperwork
              involved. Whether you're a health professional or a referral{' '}
              <Link className="underline" href={`#`}>
                Indica Saúde
              </Link>
              , we make patient referrals easier and more efficient.
            </p>
            <div className="flex w-full max-w-lg items-center gap-4">
              <Installer />
              <Button asChild className="px-4" size="lg" variant="outline">
                <Link href="/docs/introduction">Read the docs</Link>
              </Button>
            </div>
          </div>
        </div>
        <div>
          {activeVideo && <Video id={activeVideo.id} video={activeVideo.url} />}
          <div className="mt-4 flex items-center justify-center gap-2">
            {MOCK_VIDEOS.map((item, index) => (
              <Button
                key={`video-${item.id}-${index}`}
                onClick={() => setVideo(item.id)}
                size="sm"
                variant={video === item.id ? 'secondary' : 'ghost'}
              >
                <Image alt={item.title} height={20} src={item.avatar} width={20} />
                {item.title}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </GridCell>
  )
}
