import React from 'react'
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
import { usePageSession } from './hooks/usePageSession'

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
  const { data } = useQuery(GetChatSessionDocument, {
    fetchPolicy: 'no-cache',
    pollInterval: 1000,
    variables: {
      sessionId,
    },
    skip: !sessionId || !userId,
  })
  const { messages = [] } = data?.session ?? {}
  const [request, { loading: isMessageSending }] = useMutation(
    SendChatMessageDocument
  )
  const isLoading = isLoadingSession || isMessageSending
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
        anonomousUserId: userId,
      },
    })
  }

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
          {messages.length ? (
            messages.map((message, index) => {
              const isAI = message.type === ChatMessageType.Ai
              return (
                <React.Fragment key={index}>
                  {index !== 0 && <Spacer height={4} />}
                  <Message
                    text={isAI ? message.text.trimStart() : message.text}
                    isLoading={!message.text}
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
          value={messageDraft}
          disabled={isLoading || !sessionId}
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
