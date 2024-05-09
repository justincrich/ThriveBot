import React from 'react'
import { useMutation, useQuery } from '@apollo/client'
import { Layout } from '../../components/Layout'
import { Header } from '../../components/Header'
import { Spacer } from '../../components/Spacer'
import { Message } from '../../components/Message'
import { ChatInput } from '../../components/ChatInput'
import {
  ChatMessage,
  ChatMessageStatus,
  ChatMessageType,
} from '../../gql/types'
import { SendChatMessageDocument } from './gql/SendChatMessage.generated'
import {
  GetChatSessionDocument,
  GetChatSessionQuery,
} from './gql/GetChatSession.generated'
import { useHasChanged } from '../../hooks/useHasChanged'
import { Icon } from '../../components/Icon'
import { usePageSession } from '../../hooks/usePageSession'
import { SystemWelcomeMessage } from '../../components/SystemMessage'
import { Spinner } from '../../components/Spinner'

type QueryChatMessage = GetChatSessionQuery['session']['messages'][number]
const getLatestAIMessage = (
  messages: QueryChatMessage[]
): QueryChatMessage | null => {
  for (let i = messages.length - 1; i >= 0; i--) {
    if (messages[i].type === ChatMessageType.Ai) {
      return messages[i]
    }
  }
  return null
}

export const HomePage = (): JSX.Element => {
  const [messageDraft, setMessageDraft] = React.useState<string>('')
  const scrollBodyRef = React.useRef<HTMLDivElement>(null)
  const {
    isLoading: isLoadingSession,
    createSession,
    sessionId,
    userId,
  } = usePageSession({
    onSessionReset: () => {
      setMessageDraft('')
    },
  })
  const { data, loading: isMessagesLoading } = useQuery(
    GetChatSessionDocument,
    {
      fetchPolicy: 'no-cache',
      pollInterval: 1000,
      variables: {
        sessionId,
      },
      skip: !sessionId || !userId,
    }
  )
  const { messages = [] } = data?.session ?? { messages: [] }
  const [request, { loading: isMessageSending }] = useMutation(
    SendChatMessageDocument
  )

  useHasChanged(messages, () => {
    if (scrollBodyRef.current) {
      scrollBodyRef.current.scrollTop = scrollBodyRef.current.scrollHeight
    }
  })
  const handleSubmitMessage = async (): Promise<void> => {
    if (!messageDraft) return
    const nextDraft = messageDraft
    setMessageDraft('')
    await request({
      variables: {
        message: nextDraft,
        sessionId,
        anonomousUserId: userId,
      },
    })
  }

  const latestBotMessage = getLatestAIMessage(messages)

  const isLatestBotMessageLoading =
    !!messages.length && latestBotMessage?.status !== ChatMessageStatus.Complete

  const showMessages = !!messages && messages.length > 0
  const showLoadingSpinner = isMessagesLoading || isLoadingSession
  const showIntroMessage = !showLoadingSpinner && messages.length === 0
  const disableActions =
    isMessageSending || isLoadingSession || isLatestBotMessageLoading
  return (
    <Layout>
      <Header
        title="Faith Crisis Companion"
        logoUri="/logo.png"
        actions={[
          {
            label: 'New Chat',
            iconKey: Icon.IconKey.AddPlus,
            onClick: () => {
              createSession()
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
          {showLoadingSpinner && (
            <div className="z-auto absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <Spinner size={100} />
            </div>
          )}
          {showIntroMessage && (
            <Message
              content={
                <SystemWelcomeMessage
                  onQuery={(nextQuery) => {
                    request({
                      variables: {
                        message: nextQuery,
                        sessionId,
                        anonomousUserId: userId,
                      },
                    })
                  }}
                />
              }
              isAi
            />
          )}
          {showMessages && messages.length
            ? messages.map((message, index) => {
                const isAI = message.type === ChatMessageType.Ai
                return (
                  <React.Fragment key={index}>
                    {index !== 0 && <Spacer height={4} />}
                    <Message
                      content={isAI ? message.text.trimStart() : message.text}
                      isLoading={!message.text}
                      isAi={isAI}
                    />
                  </React.Fragment>
                )
              })
            : null}
        </div>
      </div>
      <Spacer height={4} />
      <div className="p-4 w-full max-w-[800px] self-center">
        <ChatInput
          value={messageDraft}
          disabled={disableActions}
          placeholder="Type your message here..."
          onChange={(value) => {
            setMessageDraft(value)
          }}
          onSubmit={() => {
            if (messageDraft.trim() === '') return
            handleSubmitMessage()
          }}
        />
      </div>
      <Spacer height={4} />
    </Layout>
  )
}
