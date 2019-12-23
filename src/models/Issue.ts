export enum IssueStateType {
  OPEN = "open",
  CLOSE = "close"
}

export type Issue = {
  body: string;
  id: number;
  locked: boolean;
  state: IssueStateType;
  title: string;
  url: string;
};
