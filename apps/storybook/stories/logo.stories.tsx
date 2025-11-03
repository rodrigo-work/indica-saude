import type { Meta, StoryObj } from '@storybook/react'
import { LogoIndicaSaude } from '@workspace/about'
import type { Button } from '@workspace/ui/components/button'

/**
 * Displays a button or a component that looks like a button.
 */
const meta = {
  title: 'Logo',
  component: LogoIndicaSaude,
  tags: ['autodocs'],
  // argTypes: {
  //   children: {
  //     control: 'text'
  //   }
  // },
  parameters: {
    layout: 'centered'
  }
  // args: {
  //   variant: 'default',
  //   size: 'default',
  //   children: 'Button'
  // }
} satisfies Meta<typeof Button>

export default meta

type Story = StoryObj<typeof meta>

/**
 * The default form of the button, used for primary actions and commands.
 */
export const Default: Story = {}

/**
 * Use the `outline` button to reduce emphasis on secondary actions, such as
 * canceling or dismissing a dialog.
 */
// export const Outline: Story = {
//   args: {
//     variant: 'outline'
//   }
// }
