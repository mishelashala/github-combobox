import axios from "axios";
import { Issue } from "../models/Issue";

export interface IReactRepositoryService {
  getIssueList: () => Promise<Issue[]>;
}

export const reactRepositoryServiceFactory = (): IReactRepositoryService => {
  const getIssueList = async (): Promise<Issue[]> => {
    const res = await axios.get("https://api.github.com/repos/facebook/react/issues");
    return res.data;
  };

  return {
    getIssueList
  };
};
