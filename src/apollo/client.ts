import { ApolloClient, InMemoryCache } from '@apollo/client'
import { gatewayUrl } from '../env'

export const apolloClient = new ApolloClient({
  uri: gatewayUrl,
  cache: new InMemoryCache(),
})
