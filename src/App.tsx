import React from 'react'
import { Router } from './Router'
import { ApolloProvider } from '@apollo/client'
import { apolloClient } from './apollo/client'

export const App = (): JSX.Element => {
  return (
    <ApolloProvider client={apolloClient}>
      <Router />
    </ApolloProvider>
  )
}
