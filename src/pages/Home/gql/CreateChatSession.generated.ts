import * as Types from '../../../gql/types';

import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type CreateChatSessionMutationVariables = Types.Exact<{
  programId: Types.Scalars['String']['input'];
  mediaChannelId?: Types.InputMaybe<Types.Scalars['String']['input']>;
}>;


export type CreateChatSessionMutation = { __typename?: 'Mutation', createProgramChatSession: { __typename?: 'ChatSession', createdById: string, id: string, mediaChannelId?: string | null, programId: string } };


export const CreateChatSessionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateChatSession"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"programId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"mediaChannelId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createProgramChatSession"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"programId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"programId"}}},{"kind":"Argument","name":{"kind":"Name","value":"mediaChannelId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"mediaChannelId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createdById"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"mediaChannelId"}},{"kind":"Field","name":{"kind":"Name","value":"programId"}}]}}]}}]} as unknown as DocumentNode<CreateChatSessionMutation, CreateChatSessionMutationVariables>;