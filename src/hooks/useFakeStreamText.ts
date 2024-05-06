import { useState, useEffect } from 'react'

/**
 * Use this hook to simulate the text streaming of a chatbot.
 * @param text The complete string to be streamed.
 * @param lettersPerSecond The number of letters to stream per second.
 * @returns A stateful value that represents the currently revealed part of the string.
 */
export function useFakeStreamText(
  text: string,
  lettersPerSecond: number
): string {
  // State to hold the current display text
  const [displayText, setDisplayText] = useState('')

  useEffect(() => {
    // Calculate the interval between letters based on the lettersPerSecond parameter
    const intervalTime = 1000 / lettersPerSecond

    // Reset the display text when text or speed changes
    setDisplayText('')

    // Set an interval to update the display text
    const interval = setInterval(() => {
      setDisplayText((currentDisplayText) => {
        // Determine the next length of the string to display
        const nextLength = currentDisplayText.length + 1
        // Stop the interval if the full text is displayed
        if (nextLength > text.length) {
          clearInterval(interval)
          return text
        }
        // Update the display text to the next length
        return text.substring(0, nextLength)
      })
    }, intervalTime)

    // Cleanup function to clear the interval when component unmounts or inputs change
    return () => clearInterval(interval)
  }, [text, lettersPerSecond])

  return displayText
}
