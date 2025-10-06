export type SectionHeaderProps = {
  title?: string
  description?: string
}

export const SectionHeader = ({ title, description }: SectionHeaderProps) => (
  <div className="mx-auto grid max-w-2xl gap-4 py-4 text-center">
    {title && <h2 className="font-semibold text-3xl tracking-tight sm:text-4xl">{title}</h2>}
    <p className="text-lg text-muted-foreground sm:text-xl">
      {description ||
        `Hundreds of rules for your framework to optimize your JavaScript / TypeScript code, while
      still allowing you to cusd.`}
    </p>
  </div>
)
