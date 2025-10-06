'use client'

import { Skeleton } from '@workspace/ui/components/skeleton'
import Player from 'react-player'

type VideoProps = {
  id: string
  video: string
}

export const Video = ({ id, video }: VideoProps) => (
  <div className="relative isolate aspect-video overflow-hidden rounded-lg">
    <Skeleton className="size-full bg-zinc-200" />
    <Player
      config={{
        youtube: {
          color: 'white'
        }
      }}
      key={id}
      pip={true}
      src={video}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 1
      }}
    />
  </div>
)
