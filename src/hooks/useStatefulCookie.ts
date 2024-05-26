import { useState, useEffect } from 'react'
import { useCookies } from 'react-cookie'

interface UseStatefulCookieResult<T extends string> {
  cookies: { [K in T]?: any }
  setCookie: (name: T, value: string) => void
  removeCookie: (name: T) => void
  refresh: boolean
}

export const useStatefulCookie = <T extends string>(
  cookieNames: T[]
): UseStatefulCookieResult<T> => {
  const [cookies, setCookie, removeCookie] = useCookies(cookieNames)
  const [refresh, setRefresh] = useState(false)

  useEffect(() => {
    const handleCookieChange = (): void => {
      setRefresh((prevRefresh) => !prevRefresh)
    }

    const observer = new MutationObserver(handleCookieChange)
    observer.observe(document, {
      attributes: true,
      attributeFilter: ['cookie'],
    })

    return (): void => {
      observer.disconnect()
    }
  }, [cookies])

  return { cookies, setCookie, removeCookie, refresh }
}
