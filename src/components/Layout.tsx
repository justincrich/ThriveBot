import React from 'react'

export const Layout = (props: {
  children: JSX.Element[] | JSX.Element
}): JSX.Element => {
  const { children } = props
  return (
    <div className="flex flex-col justify-start items-start w-full h-full">
      {children}
    </div>
  )
}
