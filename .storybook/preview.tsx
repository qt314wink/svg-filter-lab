import type { Preview } from '@storybook/react'
import { SVGFilterDefs } from '../src/components/SVGFilterDefs'

const preview: Preview = {
  parameters: {
    backgrounds: {
      default: 'light-gradient',
      values: [
        {
          name: 'light-gradient',
          value: 'linear-gradient(180deg, #f8fafc 0%, #e2e8f0 100%)'
        },
        { name: 'white', value: '#ffffff' },
        { name: 'dark', value: '#0f172a' }
      ]
    },
    layout: 'centered',
    nextjs: {
      appDirectory: true
    }
  },
  decorators: [
    (Story) => (
      <>
        <SVGFilterDefs />
        <Story />
      </>
    )
  ]
}

export default preview
