/** biome-ignore-all lint/suspicious/noExplicitAny: Needed */
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@workspace/ui/components/accordion'

type Props = {
  data: unknown | any
  show?: boolean
  title?: string
}

export function ShowJsonData({
  data,
  show = false,
  title = 'You show the following values:'
}: Props) {
  return (
    <div className="w-full">
      <Accordion
        className="w-full"
        collapsible
        defaultValue={show ? 'item-one' : undefined}
        type="single"
      >
        <AccordionItem value="item-one">
          <AccordionTrigger>{title}</AccordionTrigger>
          <AccordionContent className="flex flex-col gap-4 text-balance">
            <p>
              We offer worldwide shipping through trusted courier partners. Standard delivery takes
              3-5 business days, while express shipping ensures delivery within 1-2 business days.
            </p>
            <pre className="whitespace-pre-wrap rounded-md border border-yellow-400 bg-yellow-200 p-4 text-xs">
              {JSON.stringify(data, null, 2)}
            </pre>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}
