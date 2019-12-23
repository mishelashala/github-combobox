import { IssueLabel } from "./IssueLabel";

export enum IssueStateType {
  OPEN = "open",
  CLOSE = "close"
}

export type Issue = {
  body: string;
  id: number;
  labels: IssueLabel[];
  locked: boolean;
  state: IssueStateType;
  title: string;
  url: string;
};
