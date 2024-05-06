import React from 'react'
import { Button } from './Button'

export const TextInput = (props: {
  value: string
  placeholder?: string
  onChange: (value: string) => void
}): JSX.Element => {
  const { value, placeholder, onChange } = props
  return (
    <div className="flex flex-row p-2 w-full border-[.75px] border-muted bg-transparent rounded-xl">
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="focus:outline-none body-1 bg-transparent placeholder:text-muted w-full"
      />
      <Button>Send</Button>
    </div>
  )
}
