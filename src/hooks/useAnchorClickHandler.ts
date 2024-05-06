import React, { useRef, useEffect } from 'react'

export function useAnchorClickHandler(
  callback?: (index: number, event?: Element) => void
): React.RefObject<HTMLDivElement> {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const node = ref.current
    const elements: {
      element: HTMLAnchorElement
      callback: (event: MouseEvent) => void
    }[] = []
    if (node && callback) {
      const anchors = node.querySelectorAll('a')
      anchors.forEach((element, index) => {
        element.href = '#' // Prevent navigation
        const callbackElement = (event: MouseEvent): void =>
          callback(index, element)
        element.addEventListener('click', callbackElement)
        elements.push({ element, callback: callbackElement })
      })

      // Cleanup function to remove event listeners
      return () => {
        elements.forEach(({ element, callback }) => {
          element.removeEventListener('click', callback)
        })
      }
    }
  }, [callback]) // Re-run the effect if the callback changes

  return ref
}
