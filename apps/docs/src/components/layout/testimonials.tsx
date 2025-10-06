import { Avatar, AvatarFallback, AvatarImage } from '@workspace/ui/components/avatar'

export function TestimonialsSection() {
  return (
    <section className="py-16 md:py-32">
      <div className="mx-auto max-w-5xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <blockquote>
            <p className="text-lg font-medium sm:text-xl md:text-3xl">
              Using TailsUI has been like unlocking a secret design superpower. It's the perfect
              fusion of simplicity and versatility, enabling us to create UIs that are as stunning
              as they are user-friendly.
            </p>

            <div className="mt-12 flex items-center justify-center gap-6">
              <Avatar className="size-12">
                <AvatarImage
                  alt="Shekinah Tshiokufila"
                  height="400"
                  loading="lazy"
                  src="https://tailus.io/images/reviews/shekinah.webp"
                  width="400"
                />
                <AvatarFallback>ST</AvatarFallback>
              </Avatar>

              <div className="space-y-1 border-l pl-6">
                <cite className="font-medium">John Doe</cite>
                <span className="text-muted-foreground block text-sm">CEO, Nvidia</span>
              </div>
            </div>
          </blockquote>
        </div>
      </div>
    </section>
  )
}
