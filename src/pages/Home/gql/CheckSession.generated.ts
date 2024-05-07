import * as Types from '../../../gql/types';

import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type CheckSessionQueryVariables = Types.Exact<{
  sessionId: Types.Scalars['String']['input'];
}>;


export type CheckSessionQuery = { __typename?: 'Query', checkSession: { __typename?: 'ChatSession', id: string, createdById: string } };


export const CheckSessionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"CheckSession"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sessionId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"checkSession"},"name":{"kind":"Name","value":"session"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"sessionId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sessionId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"createdById"}}]}}]}}]} as unknown as DocumentNode<CheckSessionQuery, CheckSessionQueryVariables>;