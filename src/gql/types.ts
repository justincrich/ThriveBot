export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  _Any: { input: any; output: any; }
  _FieldSet: { input: any; output: any; }
};

export enum AgentKey {
  BrodieAgent = 'BrodieAgent',
  ProgramAgent = 'ProgramAgent'
}

export type AgentMember = {
  __typename?: 'AgentMember';
  agentKey: AgentKey;
  type: ChatMemberType;
};

export type AnonMember = {
  __typename?: 'AnonMember';
  anonomousId: Scalars['String']['output'];
  type: ChatMemberType;
};

export type Article = {
  __typename?: 'Article';
  id: Scalars['String']['output'];
  mediaChannelType: ProgramMediaChannelType;
  versions: Array<ArticleVersion>;
};

export type ArticleSection = {
  __typename?: 'ArticleSection';
  file: File;
  id: Scalars['String']['output'];
  pageEnd: Scalars['String']['output'];
  pageStart: Scalars['String']['output'];
  summary: Scalars['String']['output'];
  tags?: Maybe<Array<Tag>>;
  title: Scalars['String']['output'];
  type: MediaItemType;
};

export type ArticleVersion = {
  __typename?: 'ArticleVersion';
  authors?: Maybe<Array<MediaPerson>>;
  externalUrl: Scalars['String']['output'];
  file: File;
  id: Scalars['String']['output'];
  publicationName: Scalars['String']['output'];
  publishedISODate: Scalars['String']['output'];
  publisherName: Scalars['String']['output'];
  referenceDocumentId: Scalars['String']['output'];
  sections: Array<ArticleSection>;
  summary: Scalars['String']['output'];
  title: Scalars['String']['output'];
  version: Scalars['String']['output'];
};

export type Blog = {
  __typename?: 'Blog';
  id: Scalars['String']['output'];
  mediaChannelType: ProgramMediaChannelType;
  posts: Array<BlogPost>;
  title: Scalars['String']['output'];
  url: Scalars['String']['output'];
};

export type BlogPost = {
  __typename?: 'BlogPost';
  authorName: Scalars['String']['output'];
  authorUrl?: Maybe<Scalars['String']['output']>;
  html: Scalars['String']['output'];
  id: Scalars['String']['output'];
  imageUrl: Scalars['String']['output'];
  isoDate: Scalars['String']['output'];
  link: Scalars['String']['output'];
  text: Scalars['String']['output'];
  title: Scalars['String']['output'];
  type: MediaItemType;
};

export type Book = {
  __typename?: 'Book';
  authors?: Maybe<Array<MediaPerson>>;
  chapters: Array<BookChapter>;
  file: File;
  id: Scalars['String']['output'];
  mediaChannelType: ProgramMediaChannelType;
  referenceDocumentId: Scalars['String']['output'];
  title: Scalars['String']['output'];
  url: Scalars['String']['output'];
};

export type BookChapter = {
  __typename?: 'BookChapter';
  chapterNumber: Scalars['String']['output'];
  file: File;
  id: Scalars['String']['output'];
  summary: Scalars['String']['output'];
  title: Scalars['String']['output'];
  type: MediaItemType;
};

export type ChatMember = AgentMember | AnonMember | SystemMember | UserMember;

export enum ChatMemberType {
  Agent = 'Agent',
  Anon = 'Anon',
  System = 'System',
  User = 'User'
}

export type ChatMessage = {
  __typename?: 'ChatMessage';
  createdAtISO: Scalars['String']['output'];
  createdById: Scalars['String']['output'];
  createdByMember?: Maybe<ChatMember>;
  id: Scalars['String']['output'];
  references: Array<ChatReference>;
  status: ChatMessageStatus;
  text: Scalars['String']['output'];
  type: ChatMessageType;
  updatedAtISO: Scalars['String']['output'];
};

export enum ChatMessageStatus {
  Complete = 'Complete',
  Failed = 'Failed',
  InProgress = 'InProgress'
}

export enum ChatMessageType {
  Ai = 'AI',
  System = 'System',
  User = 'User'
}

export type ChatReference = {
  __typename?: 'ChatReference';
  mediaChannel?: Maybe<MediaChannelUnion>;
  mediaChannelId: Scalars['String']['output'];
  mediaChannelType: ProgramMediaChannelType;
  mediaItem?: Maybe<Program>;
  mediaItemId: Scalars['String']['output'];
  mediaItemType: MediaItemType;
  program?: Maybe<Program>;
  programId: Scalars['String']['output'];
};

export type ChatSession = {
  __typename?: 'ChatSession';
  createdAtISO: Scalars['String']['output'];
  createdBy?: Maybe<ChatMember>;
  createdById: Scalars['String']['output'];
  id: Scalars['String']['output'];
  isUserAnonymous: Scalars['Boolean']['output'];
  mediaChannelId?: Maybe<Scalars['String']['output']>;
  memberIds: Array<Scalars['String']['output']>;
  messages: Array<ChatMessage>;
  programId?: Maybe<Scalars['String']['output']>;
  title: Scalars['String']['output'];
  updatedAtISO: Scalars['String']['output'];
};

export type ChatSessionResponse = {
  __typename?: 'ChatSessionResponse';
  hasMore: Scalars['Boolean']['output'];
  items: Array<ChatSession>;
  limit: Scalars['Int']['output'];
  start: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
};

export type File = {
  __typename?: 'File';
  /** The file extention such, ex: "mp3" */
  extention: Scalars['String']['output'];
  id: Scalars['String']['output'];
  lengthMs: Scalars['String']['output'];
  /** The name of the file, ex: "audio", can be combined with extention to form the full system file name "audio.mp3" */
  name: Scalars['String']['output'];
  rssSrc: Scalars['String']['output'];
  src: Scalars['String']['output'];
  type: FileType;
};

export enum FileType {
  AudioMpeg = 'AudioMPEG',
  Pdf = 'PDF',
  Text = 'TEXT'
}

export type MediaChannelInput = {
  mediaChannels: Array<MediaChannelInputItem>;
};

export type MediaChannelInputItem = {
  mediaChannelId: Scalars['String']['input'];
  programId: Scalars['String']['input'];
};

export type MediaChannelUnion = Article | Blog | Book | Podcast | Website;

export enum MediaItemType {
  ArticleSection = 'ArticleSection',
  BlogPost = 'BlogPost',
  BookChapter = 'BookChapter',
  PodcastEpisode = 'PodcastEpisode',
  Webpage = 'Webpage'
}

export type MediaPerson = {
  __typename?: 'MediaPerson';
  email: Scalars['String']['output'];
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  organization: Scalars['String']['output'];
  twitterHandle: Scalars['String']['output'];
  websiteUrl: Scalars['String']['output'];
  wikipediaUrl: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createAgentChatSession: ChatSession;
  createProgramChatSession: ChatSession;
  submitMessage: ChatSession;
};


export type MutationCreateAgentChatSessionArgs = {
  agentKey: AgentKey;
  anonomousUserId?: InputMaybe<Scalars['String']['input']>;
  userMessage?: InputMaybe<Scalars['String']['input']>;
};


export type MutationCreateProgramChatSessionArgs = {
  anonomousUserId?: InputMaybe<Scalars['String']['input']>;
  mediaChannelId?: InputMaybe<Scalars['String']['input']>;
  message?: InputMaybe<Scalars['String']['input']>;
  programId: Scalars['String']['input'];
};


export type MutationSubmitMessageArgs = {
  anonomousUserId?: InputMaybe<Scalars['String']['input']>;
  message: Scalars['String']['input'];
  sessionId: Scalars['String']['input'];
};

export type PaginationInput = {
  limit?: Scalars['Int']['input'];
  start: Scalars['Int']['input'];
};

export type Podcast = {
  __typename?: 'Podcast';
  description: Scalars['String']['output'];
  episodes: Array<PodcastEpisode>;
  id: Scalars['String']['output'];
  imageUrl?: Maybe<Scalars['String']['output']>;
  mediaChannelType: ProgramMediaChannelType;
  rssUrl: Scalars['String']['output'];
  title: Scalars['String']['output'];
  url: Scalars['String']['output'];
};

export type PodcastEpisode = {
  __typename?: 'PodcastEpisode';
  contentHTML: Scalars['String']['output'];
  description: Scalars['String']['output'];
  file: File;
  id: Scalars['String']['output'];
  isoDate: Scalars['String']['output'];
  keywords: Array<Scalars['String']['output']>;
  link: Scalars['String']['output'];
  people: Array<PodcastEpisodePerson>;
  publishedAtIso: Scalars['String']['output'];
  resourceUrls: Array<Scalars['String']['output']>;
  summary: Scalars['String']['output'];
  title: Scalars['String']['output'];
  topics: Array<Scalars['String']['output']>;
  transcript?: Maybe<Transcript>;
  transcriptUrl: Scalars['String']['output'];
  type: MediaItemType;
};

export type PodcastEpisodePerson = {
  __typename?: 'PodcastEpisodePerson';
  firstName: Scalars['String']['output'];
  lastName: Scalars['String']['output'];
  middleName: Scalars['String']['output'];
  type: ProgramMediaChannelType;
};

export type Program = {
  __typename?: 'Program';
  /** Articles */
  articles: Array<Article>;
  /** Blog, if empty no blog */
  blogs: Array<Blog>;
  /** Books, if empty no blog */
  books: Array<Book>;
  id: Scalars['String']['output'];
  onboardedAtISO: Scalars['String']['output'];
  /** Podcast, if empty no podcast */
  podcasts: Array<Podcast>;
  programKey: Scalars['String']['output'];
  tags: Array<Tag>;
  title: Scalars['String']['output'];
  updatedAtISO: Scalars['String']['output'];
  /** Websites */
  websites: Array<Website>;
};

/** Program media channel type */
export enum ProgramMediaChannelType {
  Article = 'Article',
  Blog = 'Blog',
  Book = 'Book',
  Podcast = 'Podcast',
  Website = 'Website'
}

export type Query = {
  __typename?: 'Query';
  _entities: Array<Maybe<_Entity>>;
  _service: _Service;
  mediaChannel: MediaChannelUnion;
  mediaChannels: Array<MediaChannelUnion>;
  program: Program;
  session: ChatSession;
  userSessions: ChatSessionResponse;
};


export type Query_EntitiesArgs = {
  representations: Array<Scalars['_Any']['input']>;
};


export type QueryMediaChannelArgs = {
  mediaChannelId: Scalars['String']['input'];
  programId: Scalars['String']['input'];
};


export type QueryMediaChannelsArgs = {
  mediaChannelInput: MediaChannelInput;
};


export type QueryProgramArgs = {
  programId: Scalars['String']['input'];
};


export type QuerySessionArgs = {
  anonomousUserId?: InputMaybe<Scalars['String']['input']>;
  sessionId: Scalars['String']['input'];
};


export type QueryUserSessionsArgs = {
  anonomousUserId?: InputMaybe<Scalars['String']['input']>;
  pagination?: InputMaybe<PaginationInput>;
};

export type RecordingMetadata = {
  __typename?: 'RecordingMetadata';
  confidance: Scalars['Float']['output'];
  end: Scalars['Float']['output'];
  speaker?: Maybe<Scalars['Float']['output']>;
  speakerConfidance?: Maybe<Scalars['Float']['output']>;
  start: Scalars['Float']['output'];
};

export type SystemMember = {
  __typename?: 'SystemMember';
  type: ChatMemberType;
};

export type Tag = {
  __typename?: 'Tag';
  key: Scalars['String']['output'];
  title: Scalars['String']['output'];
};

export type Transcript = {
  __typename?: 'Transcript';
  channels: Scalars['Float']['output'];
  createdAtISO: Scalars['String']['output'];
  durationSec: Scalars['Float']['output'];
  modelArch: Scalars['String']['output'];
  modelId: Scalars['String']['output'];
  modelname: Scalars['String']['output'];
  requestId: Scalars['String']['output'];
  sha256: Scalars['String']['output'];
  utterances: Array<Utterance>;
  value: Scalars['String']['output'];
};

export type User = {
  __typename?: 'User';
  email: Scalars['String']['output'];
  firstName: Scalars['String']['output'];
  id: Scalars['String']['output'];
  lastName: Scalars['String']['output'];
};

export type UserMember = {
  __typename?: 'UserMember';
  type: ChatMemberType;
  user?: Maybe<User>;
  userId: Scalars['String']['output'];
};

export type Utterance = {
  __typename?: 'Utterance';
  id: Scalars['String']['output'];
  recordingMetadata: RecordingMetadata;
  value: Scalars['String']['output'];
  words: Array<Word>;
};

export type Webpage = {
  __typename?: 'Webpage';
  html: Scalars['String']['output'];
  id: Scalars['String']['output'];
  link: Scalars['String']['output'];
  text: Scalars['String']['output'];
  title: Scalars['String']['output'];
  type: MediaItemType;
  updatedAtIsoDate: Scalars['String']['output'];
};

export type Website = {
  __typename?: 'Website';
  id: Scalars['String']['output'];
  mediaChannelType: ProgramMediaChannelType;
  pages: Array<Webpage>;
  title: Scalars['String']['output'];
  url: Scalars['String']['output'];
};

export type Word = {
  __typename?: 'Word';
  punctuatedWord?: Maybe<Scalars['String']['output']>;
  recordingMetadata: RecordingMetadata;
  value: Scalars['String']['output'];
};

export type _Entity = User;

export type _Service = {
  __typename?: '_Service';
  sdl?: Maybe<Scalars['String']['output']>;
};
