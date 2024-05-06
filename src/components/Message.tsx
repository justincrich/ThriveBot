import React from 'react'
import { Interweave } from 'interweave'
import { useAnchorClickHandler } from '../hooks/useAnchorClickHandler'
import { Spacer } from './Spacer'

const AI_STYLES = `bg-accent-muted text-primary`

type Reference = {
  title: string
  link: string
}

export const Message = ({
  isAi,
  text,
  onLinkClick,
}: {
  text: string
  isAi?: boolean
  onLinkClick?: (index: number, event?: Element) => void
}): JSX.Element => {
  const ref = useAnchorClickHandler(onLinkClick)
  return (
    <div ref={ref} className={`flex flex-row w-full items-start align-start`}>
      <Interweave
        className={`rounded-xl bg-accent px-4 py-3 base1 ${isAi ? AI_STYLES : ''} max-w-[600px]`}
        content={text}
      />
      <Spacer width="fill" />
      <img
        className="ml-4 w-12 h-12 rounded-full"
        src={isAi ? '/ai.png' : '/human.png'}
      />
    </div>
  )
}
