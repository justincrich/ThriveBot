import React from 'react'
import { v4 as uuid } from 'uuid'
import { useMutation, useQuery } from '@apollo/client'
import {
  CreateChatSessionDocument,
  CreateChatSessionMutation,
} from '../pages/Home/gql/CreateChatSession.generated'
import { MEDIA_CHANNEL_ID, PROGRAM_ID } from '../constants'
import { CheckSessionDocument } from '../pages/Home/gql/CheckSession.generated'
import { useCookies } from 'react-cookie'
import { useStatefulCookie } from './useStatefulCookie'
import { ChatSession } from '../gql/types'

export const usePageSession = (args?: {
  onSessionReset: (sessionId: string, userId: string) => void
}): {
  isLoading: boolean
  sessionId: string
  userId: string
  error?: Error
  createSession: (message?: string) => Promise<void>
} => {
  const { setCookie, cookies } = useStatefulCookie([
    '__fcb_userId',
    '__fcb_sessionId',
  ])
  useQuery(CheckSessionDocument, {
    variables: {
      sessionId: cookies['__fcb_sessionId'],
    },
    skip: !cookies['__fcb_sessionId'],
    fetchPolicy: 'no-cache',
    onCompleted: (data) => {
      const nextSessionId = data?.checkSession?.id ?? ''
      const nextUserId = data?.checkSession?.createdById ?? ''
      console.log(`Next Session ID: ${nextSessionId} User ID: ${nextUserId}`)
      if (nextUserId !== cookies['__fcb_userId']) {
        setCookie('__fcb_userId', nextUserId)
      }
      setCookie('__fcb_sessionId', nextSessionId)
    },
    onError: () => {
      console.log(
        `Session invalid, refetching with userId: ${cookies['__fcb_userId']}`
      )
      createSession({
        variables: {
          mediaChannelId: MEDIA_CHANNEL_ID,
          programId: PROGRAM_ID,
          anonomousUserId: cookies['__fcb_userId'],
        },
      })
    },
  })
  const [createSession, { loading, error, reset }] = useMutation(
    CreateChatSessionDocument,
    {
      variables: {
        mediaChannelId: MEDIA_CHANNEL_ID,
        programId: PROGRAM_ID,
        anonomousUserId: cookies['__fcb_userId'] ?? undefined,
      },
      onCompleted: (data) => {
        const nextSessionId = data?.createProgramChatSession?.id ?? ''
        const nextUserId = data?.createProgramChatSession?.createdById ?? ''
        setCookie('__fcb_userId', nextUserId)
        setCookie('__fcb_sessionId', nextSessionId)
        args?.onSessionReset?.(nextSessionId, nextUserId)
      },
    }
  )

  React.useEffect(() => {
    if (!cookies['__fcb_userId']) {
      setCookie('__fcb_userId', uuid())
    }
  }, [cookies])

  return {
    isLoading: loading,
    sessionId: cookies['__fcb_sessionId'] ?? '',
    error,
    userId: cookies['__fcb_userId'] ?? '',
    createSession: async (message) => {
      reset()
      await createSession({
        variables: {
          mediaChannelId: MEDIA_CHANNEL_ID,
          programId: PROGRAM_ID,
          anonomousUserId: cookies['__fcb_userId'],
          message: message,
        },
      })
    },
  }
}
