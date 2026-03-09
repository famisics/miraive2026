import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'ui-next-template'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function Image() {
  return new ImageResponse(
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
        background: '#09090b',
        color: '#fafafa',
        fontSize: 64,
        fontWeight: 700,
        letterSpacing: '-0.02em',
      }}>
      ui-next-template
    </div>,
    { ...size },
  )
}
