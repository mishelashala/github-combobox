import React from "react";
import { Issue } from "../models/Issue";
import { IssueListContainer } from "../atoms/IssueListContainer";
import { IssueItem } from "../atoms/IssueItem";
import { IssueLabel } from "../atoms/IssueLabel";
import { LabelList } from "../components/LabelList";

export interface IIssueListProps {
  data: Issue[];
}

export const IssueList: React.FC<IIssueListProps> = ({ data }) => {
  if (!data.length) {
    return <p>No issues</p>;
  }

  return (
    <IssueListContainer>
      {data.map(issue => {
        return (
          <IssueItem key={issue.id}>
            <IssueLabel>{issue.title}</IssueLabel>
            <LabelList data={issue.labels}></LabelList>
          </IssueItem>
        );
      })}
    </IssueListContainer>
  );
};
