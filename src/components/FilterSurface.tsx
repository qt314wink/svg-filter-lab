'use client'

import type { ReactNode } from 'react'
import { useSVGFilter } from '../hooks/useSVGFilter'
import { SVG_FILTER_PRESETS, type SVGFilterPresetId } from '../lib/svgFilterPresets'

type FilterSurfaceProps = {
  preset: SVGFilterPresetId
  animate?: boolean
  className?: string
  children: ReactNode
}

export function FilterSurface({
  preset,
  animate = false,
  className = '',
  children
}: FilterSurfaceProps) {
  const presetDef = SVG_FILTER_PRESETS[preset]

  useSVGFilter({
    filterId: presetDef.id,
    result: presetDef.animatedNoise?.result ?? 'ambientNoise',
    enabled: animate && !presetDef.static,
    interval: presetDef.animatedNoise?.interval ?? 220,
    minX: presetDef.animatedNoise?.minX ?? 0.72,
    maxX: presetDef.animatedNoise?.maxX ?? 0.88,
    minY: presetDef.animatedNoise?.minY ?? 0.72,
    maxY: presetDef.animatedNoise?.maxY ?? 0.88
  })

  return (
    <div
      className={className}
      style={{
        filter: presetDef.cssFilter,
        transform: 'translateZ(0)'
      }}
      data-filter-id={presetDef.id}
      data-filter-category={presetDef.category}
      data-filter-title={presetDef.title}
    >
      {children}
    </div>
  )
}
