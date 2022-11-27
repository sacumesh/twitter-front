export interface Tweet {
  id: number;
  author: string;
  content: string;
  status: TweetStatus;
  timestamp: number;
}

export enum TweetStatus {
  CREATED = '0',
  UPDATED = '1',
  DELETED = '2',
}
