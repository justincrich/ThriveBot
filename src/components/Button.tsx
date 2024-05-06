import React from 'react'

export const Button = ({
  children,
  onClick,
  disabled = false,
}: {
  children: string
  onClick?: () => void
  disabled?: boolean
}): JSX.Element => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="py-1 px-2 rounded-lg base2 font-bold bg-accent-primary text-accentText cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 hover:opacity-75 active:opacity-50"
    >
      {children}
    </button>
  )
}
