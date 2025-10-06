import { readFileSync } from 'node:fs'
import { createRelativeLink } from 'fumadocs-ui/mdx'
import { DocsBody, DocsDescription, DocsPage, DocsTitle } from 'fumadocs-ui/page'
import { redirect } from 'next/navigation'
import { CopyToMarkdown } from '@/components/copy-to-markdown'
import { TocFooter } from '@/components/toc-footer'
import { source } from '@/lib/source'
import { getMDXComponents } from '@/mdx-components'
import IndexPage from './(home)/index'

type PageProps = {
  params: Promise<{ slug?: string[] }>
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params
  const page = source.getPage(slug)

  if (!slug) {
    return <IndexPage />
  }

  if (!page) {
    return redirect(`/?path=${slug.join('/')}`)
  }

  const MdxContent = page.data.body

  const rawMarkdown = readFileSync(page.absolutePath)
    .toString()
    // Removes frontmatter
    .replace(/^---\n(?<content>.*?\n)---\n/s, '')
    // Removes import statements for components
    .replace(/^import\s+{[^}]+}\s+from\s+['"]#\/[^'"]+['"];(?<lineEnding>\r?\n|$)/gm, '')

  return (
    <DocsPage
      full={page.data.full}
      tableOfContent={{
        style: 'clerk',
        footer: <TocFooter />
      }}
      toc={page.data.toc}
    >
      <div className="flex flex-row items-center justify-between gap-2 border">
        <DocsTitle>{page.data.title}</DocsTitle>
        <CopyToMarkdown markdownContent={rawMarkdown} />
      </div>
      <DocsDescription>{page.data.description}</DocsDescription>

      <DocsBody>
        <MdxContent
          components={getMDXComponents({
            // this allows you to link to other pages with relative file paths
            a: createRelativeLink(source, page)
          })}
        />
      </DocsBody>
      {/* <Feedback className="mt-12" /> */}
    </DocsPage>
  )
}

// export const generateStaticParams = () => source.generateParams()

// export const generateMetadata = async (props: PageProps): Promise<Metadata> => {
//   const params = await props.params
//   const page = source.getPage(params.slug)

//   if (!params.slug) {
//     return {
//       title: 'The AI-ready formatter that helps you write and generate code faster. | Ultracite',
//       description:
//         'Ultracite is a zero- config Biome preset that provides a robust linting and formatting experience for your team and your AI integrations.'
//     }
//   }

//   if (!page) {
//     return {}
//   }

//   const image = ['/og', ...(params.slug || []), 'image.png'].join('/')

//   return {
//     title: page.data.title,
//     description: page.data.description,
//     openGraph: {
//       title: page.data.title,
//       description: page.data.description,
//       images: image
//     },
//     twitter: {
//       title: page.data.title,
//       description: page.data.description,
//       creator: '@haydenbleasel',
//       card: 'summary_large_image',
//       images: image
//     }
//   }
// }
