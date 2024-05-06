import React from 'react'

export const Header = ({ title }: { title: string }): JSX.Element => {
  return (
    <div className="flex flex-col justify-start items-start w-full">
      <span className="h6">{title}</span>
    </div>
  )
}
