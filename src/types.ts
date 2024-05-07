export type ActionType<A extends string, P = undefined> = P extends undefined
  ? { type: A; payload?: undefined }
  : {
      type: A
      payload: P
    }
