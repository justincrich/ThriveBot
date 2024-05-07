import React from 'react'
import { Button } from './Button'
import { IconKey } from './Icon'
import { Spacer } from './Spacer'

type Action = {
  label: string
  iconKey?: IconKey
  onClick: () => void
}

export const Header = ({
  title,
  logoUri,
  actions = [],
}: {
  title: string
  logoUri?: string
  actions?: Action[]
}): JSX.Element => {
  return (
    <div className="flex flex-row justify-start items-center w-full">
      {logoUri && <img className="h-12 mr-2" src={logoUri} />}
      <span className="h5">{title}</span>
      {actions ? (
        <>
          <Spacer width="fill" />
          <div className="flex flex-row">
            {actions.map(({ label, iconKey, onClick }) => (
              <Button
                key={label}
                iconKey={iconKey}
                onClick={onClick}
                size={Button.Size.Small}
              >
                {label}
              </Button>
            ))}
          </div>
        </>
      ) : null}
    </div>
  )
}
