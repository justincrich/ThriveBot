import React from 'react'
import { Interweave } from 'interweave'
import { useAnchorClickHandler } from '../hooks/useAnchorClickHandler'
import { Spacer } from './Spacer'
import { Loading } from './Loading'

const AI_STYLES = `bg-accent-primary text-primary`
const HUMAN_STYLES = `bg-accent-muted text-primary`

export const Message = ({
  isAi,
  text,
  isLoading = false,
  onLinkClick,
}: {
  name?: string
  text: string
  isLoading?: boolean
  isAi?: boolean
  onLinkClick?: (index: number, event?: Element) => void
}): JSX.Element => {
  const ref = useAnchorClickHandler(onLinkClick)
  return (
    <div
      ref={ref}
      className={`flex w-full items-start align-start ${isAi ? 'flex-row-reverse' : 'flex-row'}`}
    >
      <Spacer width="fill" />
      <div
        className={`flex flex-col rounded-xl bg-accent px-4 py-3 base1 ${isAi ? AI_STYLES : HUMAN_STYLES} max-w-[600px]`}
      >
        {isLoading ? (
          <Loading size={Loading.Size.Small} />
        ) : (
          <Interweave className={` `} content={text} />
        )}
      </div>
      <Spacer height={4} />
      <img
        className={`mx-4 w-12 h-12 rounded-full bg-accent-muted`}
        src={isAi ? '/ai.png' : '/human.png'}
      />
    </div>
  )
}
