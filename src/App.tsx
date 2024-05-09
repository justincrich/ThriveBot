import React from 'react'
import { CookiesProvider } from 'react-cookie'
import { Router } from './Router'
import { ApolloProvider } from '@apollo/client'
import { apolloClient } from './apollo/client'

export const App = (): JSX.Element => {
  return (
    <CookiesProvider>
      <ApolloProvider client={apolloClient}>
        <Router />
      </ApolloProvider>
    </CookiesProvider>
  )
}
