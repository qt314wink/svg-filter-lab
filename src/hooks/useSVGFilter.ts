'use client'

import { useEffect } from 'react'

export type UseSVGFilterOptions = {
  filterId: string
  result?: string
  enabled?: boolean
  interval?: number
  minX?: number
  maxX?: number
  minY?: number
  maxY?: number
  pauseWhenHidden?: boolean
}

export function useSVGFilter({
  filterId,
  result = 'ambientNoise',
  enabled = true,
  interval = 220,
  minX = 0.72,
  maxX = 0.88,
  minY = 0.72,
  maxY = 0.88,
  pauseWhenHidden = true
}: UseSVGFilterOptions) {
  useEffect(() => {
    if (!enabled) return

    const turbulence = document.querySelector(
      `#${filterId} feTurbulence[result="${result}"]`
    ) as SVGElement | null

    if (!turbulence) return

    let timer: number | null = null

    const update = () => {
      const fx = (minX + Math.random() * (maxX - minX)).toFixed(3)
      const fy = (minY + Math.random() * (maxY - minY)).toFixed(3)
      turbulence.setAttribute('baseFrequency', `${fx} ${fy}`)
    }

    const start = () => {
      if (timer !== null) return
      update()
      timer = window.setInterval(update, interval)
    }

    const stop = () => {
      if (timer === null) return
      window.clearInterval(timer)
      timer = null
    }

    const onVisibilityChange = () => {
      if (!pauseWhenHidden) return
      if (document.hidden) stop()
      else start()
    }

    document.addEventListener('visibilitychange', onVisibilityChange)
    start()

    return () => {
      stop()
      document.removeEventListener('visibilitychange', onVisibilityChange)
    }
  }, [
    enabled,
    filterId,
    result,
    interval,
    minX,
    maxX,
    minY,
    maxY,
    pauseWhenHidden
  ])
}
