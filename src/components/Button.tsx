import React from 'react'
import { Icon, IconKey } from './Icon'
import { Color } from '../styles'
import { Spacer } from './Spacer'

export enum ButtonColor {
  Primary = 'Primary',
  Secondary = 'Secondary',
}

const COLORS = {
  [ButtonColor.Primary]: 'bg-accent-primary text-primary',
  [ButtonColor.Secondary]: 'bg-transparent border-1 border-muted text-muted',
}

enum ButtonSize {
  Small = 'Small',
  Medium = 'Medium',
  Large = 'Large',
}

const SIZES = {
  [ButtonSize.Small]: 'py-1 px-2 base2',
  [ButtonSize.Medium]: 'py-2 px-4 base1',
  [ButtonSize.Large]: 'py-2 px-4 h6',
}

const ICON_SIZES = {
  [ButtonSize.Small]: 10,
  [ButtonSize.Medium]: 12,
  [ButtonSize.Large]: 14,
}

export const Button = ({
  children,
  onClick,
  disabled = false,
  color = ButtonColor.Primary,
  iconKey,
  iconColor,
  size = ButtonSize.Medium,
}: {
  children: string
  size?: ButtonSize
  onClick?: () => void
  disabled?: boolean
  color?: ButtonColor
  iconKey?: IconKey
  iconColor?: Color
}): JSX.Element => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`flex flex-row items-center py-1 px-2 rounded-lg font-bold cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 hover:opacity-75 active:opacity-50 ${COLORS[color]} ${SIZES[size]}`}
    >
      {children}
      {iconKey && (
        <>
          <Spacer width={size === ButtonSize.Small ? 1 : 2} />
          <Icon
            weight={4}
            iconKey={iconKey}
            color={iconColor}
            size={ICON_SIZES[size]}
          />
        </>
      )}
    </button>
  )
}

Button.Color = ButtonColor
Button.Size = ButtonSize
