import type { Meta, StoryObj } from '@storybook/react'
import { FilterSurface } from './FilterSurface'

const meta: Meta<typeof FilterSurface> = {
  title: 'SVG Filters / FilterSurface',
  component: FilterSurface,
  tags: ['autodocs'],
  argTypes: {
    preset: {
      control: 'select',
      options: [
        'perf-riso-grain',
        'perf-posterize',
        'perf-ambient-noise-glass'
      ]
    },
    animate: {
      control: 'boolean'
    },
    className: {
      control: 'text'
    }
  }
}

export default meta

type Story = StoryObj<typeof FilterSurface>

const CardContent = () => (
  <div style={{ width: 320, padding: 32 }}>
    <h3 style={{ margin: '0 0 8px', fontSize: 18 }}>Filter Surface</h3>
    <p style={{ margin: 0, fontSize: 14, lineHeight: 1.6 }}>
      This surface demonstrates the SVG filter applied via CSS filter property.
    </p>
  </div>
)

export const RisographGrain: Story = {
  name: 'Risograph Grain',
  args: {
    preset: 'perf-riso-grain',
    animate: false,
    className: 'rounded-3xl border border-black/10 bg-amber-50'
  },
  render: (args) => (
    <FilterSurface {...args}>
      <CardContent />
    </FilterSurface>
  )
}

export const PosterizationPass: Story = {
  name: 'Posterization Pass',
  args: {
    preset: 'perf-posterize',
    animate: false,
    className: 'rounded-3xl border border-black/10 bg-rose-100'
  },
  render: (args) => (
    <FilterSurface {...args}>
      <CardContent />
    </FilterSurface>
  )
}

export const AmbientNoiseGlassStatic: Story = {
  name: 'Ambient Noise Glass — Static',
  args: {
    preset: 'perf-ambient-noise-glass',
    animate: false,
    className:
      'rounded-3xl border border-white/50 bg-white/45 backdrop-blur-xl'
  },
  render: (args) => (
    <FilterSurface {...args}>
      <CardContent />
    </FilterSurface>
  )
}

export const AmbientNoiseGlassAnimated: Story = {
  name: 'Ambient Noise Glass — Animated',
  args: {
    preset: 'perf-ambient-noise-glass',
    animate: true,
    className:
      'rounded-3xl border border-white/50 bg-white/45 backdrop-blur-xl'
  },
  render: (args) => (
    <FilterSurface {...args}>
      <CardContent />
    </FilterSurface>
  )
}
