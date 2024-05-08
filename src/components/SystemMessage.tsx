import React from 'react'

export const SystemWelcomeMessage = ({
  onQuery,
}: {
  onQuery: (query: string) => void
}): JSX.Element => {
  const handleClick = (e: React.MouseEvent): void => {
    e.preventDefault()
    onQuery(e.currentTarget.textContent || '')
  }
  return (
    <span>
      Hi, My name is Thrivey. I am an AI-powered chatbot designed to provide
      support, guidance, and information to those experiencing a faith crisis
      within the Mormon community. My answers are based on hours of coaching
      that can be found in the podcast{' '}
      <a
        className="link"
        href="https://www.mormonfaithcrisis.com/"
        target="_blank"
      >
        "Gift of the Mormon Faith Crisis"
      </a>
      .<br />
      <br /> You can ask questions like:
      <br />-{' '}
      <a className="link" href="#" onClick={handleClick}>
        How can I set boundaries with church leaders?
      </a>
      <br />-{' '}
      <a className="link" href="#" onClick={handleClick}>
        How can I maintain family relationships after leaving the church?
      </a>
      <br />-{' '}
      <a className="link" href="#" onClick={handleClick}>
        How can I teach my children to be good people after leaving the church?
      </a>
    </span>
  )
}

/**
 *
 */
