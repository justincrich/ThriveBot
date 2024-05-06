import React from 'react'
import CHAT_MESSAGES from '../../content/chatMessages.json'
import { Layout } from '../../components/Layout'
import { Header } from '../../components/Header'
import { Spacer } from '../../components/Spacer'
import { Message } from '../../components/Message'
import { TextInput } from '../../components/TextInput'
import { useImmerReducer } from 'use-immer'

type State = {
  messages: {
    text: string
    isAi: boolean
  }[]
  isLoading: boolean
  error: Error | null
  draftMessage: string
}

const initialState: State = {
  messages: [],
  isLoading: false,
  error: null,
  draftMessage: '',
}

enum ActionName {
  SET_DRAFT_VALUE = 'SET_DRAFT_VALUE',
}

type ActionType<A extends ActionName, P = undefined> = P extends undefined
  ? { type: A; payload?: undefined }
  : {
      type: A
      payload: P
    }
type Action = ActionType<ActionName.SET_DRAFT_VALUE, string>
export const HomePage = (): JSX.Element => {
  const [state, dispatch] = useImmerReducer<State, Action>((draft, action) => {
    switch (action.type) {
      case ActionName.SET_DRAFT_VALUE:
        draft.draftMessage = action.payload
        break
      default:
    }
  }, initialState)
  return (
    <Layout>
      <Header title="Thrive Bot" />
      <Spacer height={4} />
      <div className="flex flex-col h-full w-full overflow-auto items-center">
        <div className=" w-full max-w-[800px]">
          {state.messages.length ? (
            <div>hi</div>
          ) : (
            <Message
              onLinkClick={(_index, element) => {
                console.log('link click', element?.textContent)
              }}
              text={CHAT_MESSAGES.BOT_INTRO_MESSAGE}
              isAi
            />
          )}
        </div>
      </div>
      <Spacer height={4} />
      <TextInput
        value={state.draftMessage}
        placeholder="Type your message here..."
        onChange={(value) => {
          dispatch({ type: ActionName.SET_DRAFT_VALUE, payload: value })
        }}
      />
    </Layout>
  )
}
