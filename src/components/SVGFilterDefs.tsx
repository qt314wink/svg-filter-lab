'use client'

export function SVGFilterDefs() {
  return (
    <svg
      aria-hidden="true"
      style={{ position: 'absolute', width: 0, height: 0, overflow: 'hidden' }}
    >
      <defs>
        <filter id="perf-riso-grain" x="0%" y="0%" width="100%" height="100%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.58"
            numOctaves="2"
            stitchTiles="stitch"
            result="risoNoise"
          />
          <feColorMatrix
            type="saturate"
            values="0"
            in="risoNoise"
            result="grayNoise"
          />
          <feComponentTransfer in="grayNoise" result="grain">
            <feFuncA type="linear" slope="0.065" />
          </feComponentTransfer>
          <feBlend mode="multiply" in="SourceGraphic" in2="grain" />
        </filter>

        <filter id="perf-posterize" x="0%" y="0%" width="100%" height="100%">
          <feComponentTransfer in="SourceGraphic">
            <feFuncR type="discrete" tableValues="0 0.33 0.66 1" />
            <feFuncG type="discrete" tableValues="0 0.33 0.66 1" />
            <feFuncB type="discrete" tableValues="0 0.5 1" />
          </feComponentTransfer>
        </filter>

        <filter
          id="perf-ambient-noise-glass"
          x="-8%"
          y="-8%"
          width="116%"
          height="116%"
        >
          <feGaussianBlur
            in="SourceGraphic"
            stdDeviation="2.5"
            result="glassBlur"
          />
          <feColorMatrix
            in="glassBlur"
            type="matrix"
            values="
              1 0 0 0 0
              0 1 0 0 0
              0 0 1 0 0
              0 0 0 0.18 0"
            result="glassBody"
          />
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.8"
            numOctaves="1"
            stitchTiles="stitch"
            result="ambientNoise"
          />
          <feColorMatrix
            type="saturate"
            values="0"
            in="ambientNoise"
            result="ambientGray"
          />
          <feComponentTransfer in="ambientGray" result="ambientTexture">
            <feFuncA type="linear" slope="0.025" />
          </feComponentTransfer>
          <feBlend
            mode="multiply"
            in="glassBody"
            in2="ambientTexture"
            result="texturedGlass"
          />
          <feSpecularLighting
            in="glassBlur"
            surfaceScale="3"
            specularConstant="0.45"
            specularExponent="14"
            lightingColor="#ffffff"
            result="specular"
          >
            <fePointLight x="80" y="-60" z="140" />
          </feSpecularLighting>
          <feComposite
            in="specular"
            in2="SourceAlpha"
            operator="in"
            result="specularMasked"
          />
          <feComposite
            in="texturedGlass"
            in2="SourceAlpha"
            operator="in"
            result="glassMasked"
          />
          <feMerge>
            <feMergeNode in="glassMasked" />
            <feMergeNode in="specularMasked" />
          </feMerge>
        </filter>
      </defs>
    </svg>
  )
}
