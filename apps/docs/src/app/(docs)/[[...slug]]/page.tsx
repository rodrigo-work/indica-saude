import { readFileSync } from 'node:fs'
import { createMetadata } from '@workspace/seo/metadata'
import { Separator } from '@workspace/ui/components/separator'
import { createRelativeLink } from 'fumadocs-ui/mdx'
import { DocsBody, DocsDescription, DocsPage, DocsTitle } from 'fumadocs-ui/page'
import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { CopyToMarkdown } from '@/components/copy-to-markdown'
import { source } from '@/lib/source'
import { getMDXComponents } from '@/mdx-components'
import Home from './(home)'

type PageProps = {
  params: Promise<{ slug?: string[] }>
}

export default async function Page(props: PageProps) {
  const params = await props.params
  const page = source.getPage(params.slug)

  if (!params.slug) {
    return <Home />
  }

  if (!page) {
    return redirect(`/?error=404&path=${params.slug}`)
    // return notFound()
  }

  const rawMarkdown = readFileSync(`${page.absolutePath}`, 'utf-8')
    .toString()
    // Removes frontmatter
    .replace(/^---\n(?<content>.*?\n)---\n/s, '')
    // Removes import statements for components
    .replace(/^import\s+{[^}]+}\s+from\s+['"]#\/[^'"]+['"];(?<lineEnding>\r?\n|$)/gm, '')

  const MdxContent = page.data.body

  return (
    <DocsPage full={page.data.full} toc={page.data.toc}>
      <div className="flex flex-row items-center justify-between">
        <DocsTitle>{page.data.title}</DocsTitle>
        <CopyToMarkdown markdownContent={rawMarkdown} />
      </div>
      <DocsDescription>{page.data.description}</DocsDescription>
      <div className="-mt-6 mb-6 flex flex-row items-center gap-2">
        <Separator />
        sss
      </div>
      <DocsBody>
        <MdxContent
          components={getMDXComponents({
            // this allows you to link to other pages with relative file paths
            a: createRelativeLink(source, page)
          })}
        />
      </DocsBody>
    </DocsPage>
  )
}

export const generateStaticParams = () => source.generateParams()

export const generateMetadata = async (props: PageProps): Promise<Metadata> => {
  const params = await props.params
  const page = source.getPage(params.slug)

  const desc =
    'Um sistema de gestão de saúde que utiliza inteligência artificial para ajudar a melhorar a qualidade de vida dos pacientes.'

  if (!params.slug) {
    return {
      title: 'Índica Saúde',
      description: desc
    }
  }

  if (!page) {
    return {}
  }

  const image = ['/og', ...(params.slug || []), 'opengraph-image.png'].join('/')

  return createMetadata({
    title: page.data.title,
    description: page.data.description || desc,
    image
  })
}
