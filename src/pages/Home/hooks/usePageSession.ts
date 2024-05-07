import React from 'react'
import { useMutation, useLazyQuery } from '@apollo/client'
import { useSearchParams } from 'react-router-dom'
import { useImmer } from 'use-immer'
import { CreateChatSessionDocument } from '../gql/CreateChatSession.generated'
import { MEDIA_CHANNEL_ID, PROGRAM_ID } from '../../../constants'
import { CheckSessionDocument } from '../gql/CheckSession.generated'

export const usePageSession = (args?: {
  onSessionReset: (sessionId: string, userId: string) => void
}): {
  isLoading: boolean
  sessionId: string
  userId: string
  error?: Error
  createSession: () => Promise<void>
} => {
  const [state, dispatch] = useImmer<{
    sessionId: string
    userId: string
  }>({
    sessionId: '',
    userId: '',
  })
  const [checkSession] = useLazyQuery(CheckSessionDocument, {
    fetchPolicy: 'no-cache',
  })
  const [searchParams, setSearchParams] = useSearchParams({
    'session-id': '',
    'useer-id': '',
  })
  const [createSession, { loading, error }] = useMutation(
    CreateChatSessionDocument,
    {
      variables: {
        mediaChannelId: MEDIA_CHANNEL_ID,
        programId: PROGRAM_ID,
      },
      onCompleted: (data) => {
        const nextSessionId = data?.createProgramChatSession?.id ?? ''
        const userId = data?.createProgramChatSession?.createdById ?? ''
        if (!nextSessionId) return
        setSearchParams({
          'session-id': nextSessionId,
          'useer-id': userId,
        })
        dispatch((draft) => {
          draft.sessionId = nextSessionId
          draft.userId = userId
        })
        args?.onSessionReset?.(state.sessionId, state.userId)
      },
    }
  )

  React.useEffect(() => {
    const handleSessionCreate = async (): Promise<void> => {
      const nextSessionId = searchParams.get('session-id') ?? ''
      const nextUserId = searchParams.get('useer-id') ?? ''
      if (!nextSessionId || !nextUserId) {
        await createSession()
        return
      }
      await checkSession({
        variables: {
          sessionId: nextSessionId,
        },
        onError: () => {
          createSession()
        },
      })
      dispatch((draft) => {
        draft.sessionId = nextSessionId
        draft.userId = nextUserId
      })
    }
    handleSessionCreate()
  }, [])
  return {
    isLoading: loading,
    sessionId: state.sessionId,
    error,
    userId: state.userId,
    createSession: async (): Promise<void> => {
      await createSession()
    },
  }
}
