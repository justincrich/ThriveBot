import React from 'react'
import { ButtonColor } from './Button'
import { ButtonIcon } from './ButtonIcon'

export const ChatInput = (props: {
  value: string
  placeholder?: string
  disabled?: boolean
  onChange: (value: string) => void
  onSubmit: () => void
}): JSX.Element => {
  const { value, placeholder, disabled, onChange, onSubmit } = props
  const ref = React.useRef<HTMLInputElement>(null)
  return (
    <div className="flex flex-row py-2 px-4 w-full border-[.75px] border-muted bg-transparent rounded-xl">
      <input
        ref={ref}
        disabled={disabled}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        onKeyDown={(e) => {
          if (disabled) return
          if (e.key === 'Enter') {
            onSubmit()
            ref.current?.blur()
          }
        }}
        className="focus:outline-none body-1 bg-transparent placeholder:text-muted w-full disabled:opacity-50 disabled:cursor-not-allowed"
      />
      <ButtonIcon
        disabled={disabled}
        iconKey={ButtonIcon.IconKey.SendMessageDm}
        color={ButtonColor.Secondary}
        onClick={() => {
          onSubmit()
          ref.current?.blur()
        }}
      />
    </div>
  )
}
