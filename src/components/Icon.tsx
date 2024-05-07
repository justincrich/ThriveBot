import * as RIcon from 'react-basicons'
import { Color } from '../styles'

export type IconKey = keyof typeof RIcon

export const Icon = ({
  iconKey,
  color,
  size,
  weight,
}: {
  iconKey: IconKey
  color?: Color
  size?: number
  weight?: number
}): JSX.Element => {
  const Component = RIcon[iconKey]
  return <Component color={color} size={size} weight={weight} />
}

Icon.IconKey = Object.keys(RIcon).reduce(
  (acc, key) => {
    const keyName = key as IconKey
    acc[keyName] = keyName
    return acc
  },
  {} as Record<IconKey, IconKey>
)

Icon.Color = Color
