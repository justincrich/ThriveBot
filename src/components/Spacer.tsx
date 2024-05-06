import React from 'react'

const baseSize = 4

const SIZES = new Array(100)
  .fill(null)
  .map((_, index) => `${index * baseSize}px`)

/**
 * All sizes base 4px (ex: 0=0px, 1=4px ... 100 = 400px)
 */
export const Spacer = ({
  width,
  height,
}: {
  width?: number | 'fill'
  height?: number | 'fill'
}): JSX.Element => {
  const size = width || height || 0
  const sizePx = SIZES[size] ?? '0px'

  let SIZE_STYLE = {}

  if (size === 'fill' && width) {
    SIZE_STYLE = {
      marginLeft: 'auto',
      flexFlow: 'row nowrap',
    }
  } else if (size === 'fill') {
    SIZE_STYLE = {
      marginTop: 'auto',
      flexFlow: 'column nowrap',
    }
  } else if (width) {
    SIZE_STYLE = {
      width: sizePx,
      minWidth: sizePx,
      maxWidth: sizePx,
    }
  } else if (height) {
    SIZE_STYLE = {
      height: sizePx,
      minHeight: sizePx,
      maxHeight: sizePx,
    }
  }

  return <div style={SIZE_STYLE} />
}
