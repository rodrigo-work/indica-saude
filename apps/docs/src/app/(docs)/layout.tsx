import { DocsLayout } from 'fumadocs-ui/layouts/notebook'
import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { ConditionalContainer } from '@/components/conditional-container'
import { baseOptions } from '@/lib/layout.config'
import { source } from '@/lib/source'

type DocsLayoutProps = {
  children: ReactNode
}

export const metadata: Metadata = {
  title: {
    template: '%s | Índica Saúde',
    default: 'Índica Saúde'
  }
}

const DocLayout = async (props: DocsLayoutProps) => (
  <ConditionalContainer>
    <DocsLayout
      {...baseOptions}
      nav={{
        ...baseOptions.nav,
        mode: 'top'
      }}
      sidebar={{ collapsible: false }}
      // tableOfContent={{
      // single: false,
      // style: 'clerk'
      // header: (
      //   <div className="flex flex-col gap-6 mb-6">
      //     {/* <NotVercel />
      //     <div className="grid grid-cols-3 text-sm gap-y-4 text-muted-foreground">
      //       <div>Updated:</div>
      //       <time className="col-span-2 text-foreground" dateTime={updatedISO} title={updatedISO}>
      //         {updatedHuman}
      //       </time>
      //       <div>Author{page.data.authors.length > 1 ? 's' : ''}:</div>
      //       <div className="col-span-2 flex flex-col gap-2">
      //         {page.data.authors.map((author) => (
      //           <Link
      //             className="text-foreground transition-colors flex flex-row items-center gap-2 group"
      //             href={`https://github.com/${author}`}
      //             key={author}
      //           >
      //             <img
      //               className="w-4 h-4 rounded-full border border-background group-hover:border-muted-foreground transition-colors"
      //               src={`https://github.com/${author}.png?size=16`}
      //             />
      //             <span className="flex-grow truncate">{author}</span>
      //           </Link>
      //         ))}
      //       </div>
      //     </div> */}
      //   </div>
      // ),
      // footer: (
      //   <div className="flex flex-col gap-2 justify-start text-sm text-muted-foreground mt-6">
      //     footer
      //     {/* <Link
      //       className="hover:text-foreground transition-colors"
      //       href={`https://github.com/joulev/nextjs-faq/blob/main/content${page.url}.mdx`}
      //     >
      //       <PenLine className="inline size-4 mr-2" />
      //       Edit this page
      //     </Link>
      //     <div>
      //       <CopyButton className="hover:text-foreground transition-colors" />
      //     </div> */}
      //   </div>
      // )
      // }}
      tabMode="navbar"
      tree={source.pageTree}
    >
      {props.children}
    </DocsLayout>
  </ConditionalContainer>
)

export default DocLayout
