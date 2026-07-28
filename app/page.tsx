import { FilterSurface } from '../src/components/FilterSurface'
import { SVGFilterDefs } from '../src/components/SVGFilterDefs'

export default function Page() {
  return (
    <main style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', padding: 24 }}>
      <SVGFilterDefs />
      <FilterSurface
        preset="perf-ambient-noise-glass"
        className="rounded-3xl border border-black/10 bg-white/70 p-8"
      >
        <section style={{ maxWidth: 480 }}>
          <h1 style={{ margin: '0 0 12px', fontSize: 28 }}>SVG Filter Lab</h1>
          <p style={{ margin: 0, lineHeight: 1.6 }}>
            Production-ready SVG filter presets with Storybook documentation and visual tests.
          </p>
        </section>
      </FilterSurface>
    </main>
  )
}
