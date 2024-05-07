import React from 'react'
import { Icon } from './Icon'
import { ButtonColor } from './Button'
import { IconKey } from './Icon'
import { Color } from '../styles'

const COLORS = {
  [ButtonColor.Primary]: 'bg-accent-primary stroke-accentText fill-accentText',
  [ButtonColor.Secondary]:
    'bg-transparent border-1 border-muted stroke-muted fill-muted',
}

const ICON_COLORS = {
  [ButtonColor.Primary]: Color.Primary,
  [ButtonColor.Secondary]: Color.AccentPrimaryDark,
}

export const ButtonIcon = (props: {
  color?: ButtonColor
  size?: number
  iconKey?: IconKey
  className?: string
  disabled?: boolean
  onClick?: () => void
}): JSX.Element => {
  const {
    color = ButtonColor.Primary,
    size = 20,
    className,
    iconKey = 'HelpQuestion',
    disabled,
    onClick,
  } = props

  return (
    <button
      className={`cursor-pointer rounded-full ${COLORS[color]} p-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      <Icon iconKey={iconKey} color={ICON_COLORS[color]} size={size} />
    </button>
  )
}

ButtonIcon.IconKey = Icon.IconKey
