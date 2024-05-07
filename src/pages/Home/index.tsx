import React from 'react'
import { useMutation, useQuery } from '@apollo/client'
import CHAT_MESSAGES from '../../content/chatMessages.json'
import { Layout } from '../../components/Layout'
import { Header } from '../../components/Header'
import { Spacer } from '../../components/Spacer'
import { Message } from '../../components/Message'
import { ChatInput } from '../../components/ChatInput'
import { ChatMessageType } from '../../gql/types'
import { SendChatMessageDocument } from './SendChatMessage.generated'
import { GetChatSessionDocument } from './GetChatSession.generated'
import { useHasChanged } from '../../hooks/useHasChanged'
import { Icon } from '../../components/Icon'

export const HomePage = (): JSX.Element => {
  const sessionId = ''
  const scrollBodyRef = React.useRef<HTMLDivElement>(null)
  const [draftMessage, setDraftMessage] = React.useState('')
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

  React.useLayoutEffect(() => {
    if (scrollBodyRef.current) {
      scrollBodyRef.current.scrollTop = scrollBodyRef.current.scrollHeight
    }
  }, [scrollBodyRef])
  useHasChanged(messages, () => {
    if (scrollBodyRef.current) {
      scrollBodyRef.current.scrollTop = scrollBodyRef.current.scrollHeight
    }
  })
  const handleSubmitMessage = async (): Promise<void> => {
    if (!draftMessage) {
      return Promise.resolve()
    }
    setDraftMessage('')
    await request({
      variables: {
        message: draftMessage,
        sessionId,
        anonomousUserId: createdById,
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
              setDraftMessage('')
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
          value={draftMessage}
          disabled={isLoading}
          placeholder="Type your message here..."
          onChange={setDraftMessage}
          onSubmit={() => {
            handleSubmitMessage()
          }}
        />
      </div>
      <Spacer height={4} />
    </Layout>
  )
}
