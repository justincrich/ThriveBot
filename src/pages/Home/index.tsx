import React from 'react'
import { useImmerReducer } from 'use-immer'
import { useMutation, useQuery } from '@apollo/client'
import CHAT_MESSAGES from '../../content/chatMessages.json'
import { Layout } from '../../components/Layout'
import { Header } from '../../components/Header'
import { Spacer } from '../../components/Spacer'
import { Message } from '../../components/Message'
import { ChatInput } from '../../components/ChatInput'
import { ChatMessageType } from '../../gql/types'
import { SendChatMessageDocument } from './gql/SendChatMessage.generated'
import { GetChatSessionDocument } from './gql/GetChatSession.generated'
import { useHasChanged } from '../../hooks/useHasChanged'
import { Icon } from '../../components/Icon'
import { MEDIA_CHANNEL_ID, PROGRAM_ID } from '../../constants'
import { CreateChatSessionDocument } from './gql/CreateChatSession.generated'
import { ActionType } from '../../types'

type State = {
  messageDraft: string
  sessionId: string
  userId: string
}

const initialState: State = {
  messageDraft: '',
  sessionId: '',
  userId: '',
}

enum ActionKey {
  SET_MESSAGE_DRAFT = 'SET_MESSAGE_DRAFT',
  SET_SESSION = 'SET_SESSION',
  SUBMIT_MESSAGE = 'SUBMIT_MESSAGE',
}

type Action =
  | ActionType<ActionKey.SET_MESSAGE_DRAFT, string>
  | ActionType<
      ActionKey.SET_SESSION,
      {
        sessionId: string
        userId: string
      }
    >
  | ActionType<ActionKey.SUBMIT_MESSAGE, undefined>

const usePageState = (): [State, React.Dispatch<Action>] => {
  const [state, dispatch] = useImmerReducer<State, Action>((draft, action) => {
    switch (action.type) {
      case ActionKey.SET_MESSAGE_DRAFT:
        draft.messageDraft = action.payload
        break
      case ActionKey.SET_SESSION:
        draft.sessionId = action.payload.sessionId
        draft.userId = action.payload.userId
        draft.messageDraft = ''
        break
      case ActionKey.SUBMIT_MESSAGE:
        draft.messageDraft = ''
        break
      default:
    }
  }, initialState)
  return [state, dispatch]
}

export const HomePage = (): JSX.Element => {
  const [state, dispatch] = usePageState()
  const scrollBodyRef = React.useRef<HTMLDivElement>(null)
  const [createSession, { loading: isLoadingSession, data: sessionRequest }] =
    useMutation(CreateChatSessionDocument, {
      variables: {
        mediaChannelId: MEDIA_CHANNEL_ID,
        programId: PROGRAM_ID,
      },
    })
  const sessionId = sessionRequest?.createProgramChatSession?.id ?? ''
  const { data } = useQuery(GetChatSessionDocument, {
    fetchPolicy: 'network-only',
    pollInterval: 1000,
    variables: {
      sessionId: '',
    },
    skip: !sessionId,
  })
  const { session } = data ?? {}
  const { messages = [], createdById = '' } = session ?? {}
  const [request, { loading: isLoading }] = useMutation(SendChatMessageDocument)
  const handleInitialMessageLinkClick = async (
    message: string
  ): Promise<void> => {
    if (message.includes('"Gift of the Mormon Faith Crisis"')) {
      window.open('https://www.mormonfaithcrisis.com/', '_blank')
      return
    }
    await request({
      variables: {
        message,
        sessionId,
        anonomousUserId: createdById,
      },
    })
  }

  useHasChanged(messages, () => {
    if (scrollBodyRef.current) {
      scrollBodyRef.current.scrollTop = scrollBodyRef.current.scrollHeight
    }
  })
  const handleSubmitMessage = async (): Promise<void> => {
    if (!state.messageDraft) {
      return Promise.resolve()
    }
    const nextMessage = state.messageDraft
    dispatch({ type: ActionKey.SUBMIT_MESSAGE })
    await request({
      variables: {
        message: nextMessage,
        sessionId,
        anonomousUserId: createdById,
      },
    })
  }

  const handleCreateSession = async (): Promise<void> => {
    const { data } = await createSession()
    if (!data) return
    dispatch({
      type: ActionKey.SET_SESSION,
      payload: {
        sessionId: data.createProgramChatSession.id,
        userId: data.createProgramChatSession.createdById,
      },
    })
  }

  return (
    <Layout>
      <Header
        title="ThriveBot"
        logoUri="/logo.png"
        actions={[
          {
            label: 'New Chat',
            iconKey: Icon.IconKey.AddPlus,
            onClick: () => {
              handleCreateSession()
            },
          },
        ]}
      />
      <Spacer height={4} />
      <div
        ref={scrollBodyRef}
        className="px-4 flex flex-col h-full w-full overflow-auto items-center"
      >
        <div className="w-full max-w-[800px]">
          {messages.length ? (
            messages.map((message, index) => {
              const isAI = message.type === ChatMessageType.Ai
              return (
                <React.Fragment key={index}>
                  {index !== 0 && <Spacer height={4} />}
                  <Message
                    text={isAI ? message.text.trimStart() : message.text}
                    isAi={isAI}
                    onLinkClick={(_index, element) => {
                      console.log('link click', element?.textContent)
                    }}
                  />
                </React.Fragment>
              )
            })
          ) : (
            <Message
              onLinkClick={(_index, element) => {
                handleInitialMessageLinkClick(element?.textContent ?? '')
              }}
              text={CHAT_MESSAGES.BOT_INTRO_MESSAGE}
              isAi
            />
          )}
        </div>
      </div>
      <Spacer height={4} />
      <div className="p-4 w-full max-w-[800px] self-center">
        <ChatInput
          value={state.messageDraft}
          disabled={isLoading}
          placeholder="Type your message here..."
          onChange={(value) => {
            dispatch({ type: ActionKey.SET_MESSAGE_DRAFT, payload: value })
          }}
          onSubmit={() => {
            handleSubmitMessage()
          }}
        />
      </div>
      <Spacer height={4} />
    </Layout>
  )
}
