import * as Types from '../../../gql/types';

import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type SessionFragmentFragment = { __typename?: 'ChatSession', id: string, createdAtISO: string, createdById: string, isUserAnonymous: boolean, updatedAtISO: string, programId: string, mediaChannelId?: string | null, createdBy?: { __typename?: 'User', id: string, firstName: string, lastName: string, email: string } | null, messages: Array<{ __typename?: 'ChatMessage', id: string, status: Types.ChatMessageStatus, createdAtISO: string, updatedAtISO: string, type: Types.ChatMessageType, text: string }> };

export const SessionFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SessionFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ChatSession"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAtISO"}},{"kind":"Field","name":{"kind":"Name","value":"createdById"}},{"kind":"Field","name":{"kind":"Name","value":"createdBy"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}},{"kind":"Field","name":{"kind":"Name","value":"isUserAnonymous"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAtISO"}},{"kind":"Field","name":{"kind":"Name","value":"messages"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"createdAtISO"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAtISO"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"text"}}]}},{"kind":"Field","name":{"kind":"Name","value":"programId"}},{"kind":"Field","name":{"kind":"Name","value":"mediaChannelId"}}]}}]} as unknown as DocumentNode<SessionFragmentFragment, unknown>;