import { Marquee } from '@workspace/ui/components/magicui/marquee'
import { cn } from '@/lib/utils'

const reviews = [
  {
    name: 'Jack',
    username: '@jack',
    body: "I've never seen anything like this before. It's amazing. I love it.",
    img: 'https://avatar.vercel.sh/jack'
  },
  {
    name: 'Jill',
    username: '@jill',
    body: "I don't know what to say. I'm speechless. This is amazing.",
    img: 'https://avatar.vercel.sh/jill'
  },
  {
    name: 'John',
    username: '@john',
    body: "I'm at a loss for words. This is amazing. I love it.",
    img: 'https://avatar.vercel.sh/john'
  },
  {
    name: 'Jane',
    username: '@jane',
    body: "I'm at a loss for words. This is amazing. I love it.",
    img: 'https://avatar.vercel.sh/jane'
  },
  {
    name: 'Jenny',
    username: '@jenny',
    body: "I'm at a loss for words. This is amazing. I love it.",
    img: 'https://avatar.vercel.sh/jenny'
  },
  {
    name: 'James',
    username: '@james',
    body: "I'm at a loss for words. This is amazing. I love it.",
    img: 'https://avatar.vercel.sh/james'
  }
]

const firstRow = reviews.slice(0, reviews.length / 2)
const secondRow = reviews.slice(reviews.length / 2)

const ReviewCard = ({
  img,
  name,
  username,
  body
}: {
  img: string
  name: string
  username: string
  body: string
}) => {
  return (
    <figure
      className={cn(
        'relative h-full w-64 cursor-pointer overflow-hidden rounded-xl border p-4',
        // light styles
        'border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]',
        // dark styles
        'dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]'
      )}
    >
      <div className="flex flex-row items-center gap-2">
        <img alt="" className="rounded-full" height="32" src={img} width="32" />
        <div className="flex flex-col">
          <figcaption className="font-medium text-sm dark:text-white">{name}</figcaption>
          <p className="font-medium text-xs dark:text-white/40">{username}</p>
        </div>
      </div>
      <blockquote className="mt-2 text-sm">{body}</blockquote>
    </figure>
  )
}

export function MarqueeDemo() {
  return (
    <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
      <Marquee className="[--duration:20s]" pauseOnHover>
        {firstRow.map((review) => (
          <ReviewCard key={review.username} {...review} />
        ))}
      </Marquee>
      <Marquee className="[--duration:20s]" pauseOnHover reverse>
        {secondRow.map((review) => (
          <ReviewCard key={review.username} {...review} />
        ))}
      </Marquee>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-background"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-background"></div>
    </div>
  )
}

export default function BackgroundPathsDemo() {
  return (
    <div className="flex w-full flex-col items-center justify-center px-4">
      <h2 className="relative z-20 bg-linear-to-b from-neutral-900 to-neutral-700 bg-clip-text py-2 text-center font-bold font-sans text-2xl text-transparent tracking-tight md:py-10 md:text-4xl lg:text-7xl dark:from-neutral-600 dark:to-white">
        Astra Intelligence, <br /> Neuron Systems.
      </h2>
      <p className="mx-auto max-w-xl text-center text-neutral-700 text-sm md:text-lg dark:text-neutral-400">
        Innovate, automate, and elevate your vision with next-generation solutions for a smarter
        tomorrow.
      </p>

      <div className="max-w-4xl py-16">
        <MarqueeDemo />
      </div>
    </div>
  )
}
