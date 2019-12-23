import React from "react";
import styled from "styled-components";
import { reactRepositoryServiceFactory } from "./services/ReactRepositoryService";
import { Issue } from "./models/Issue";
import { IssueList } from "./atoms/IssueList";
import { IssueItem } from "./atoms/IssueItem";
import { IssueLabel } from "./atoms/IssueLabel";
import { LabelList } from "./atoms/LabelList";
import { LabelItem } from "./atoms/LabelItem";

const reactRepositoryService = reactRepositoryServiceFactory();

const App: React.FC = () => {
  const [isLoading, updateIsLoading] = React.useState(true);
  const [issueList, updateIssueList] = React.useState<Issue[]>([]);

  React.useEffect(() => {
    reactRepositoryService.getIssueList().then(data => {
      updateIsLoading(false);
      updateIssueList(data);
    });
  }, []);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <article>
      <h1>React's Issue List</h1>
      <IssueList>
        {issueList.map(issue => {
          return (
            <IssueItem key={issue.id}>
              <IssueLabel>{issue.title}</IssueLabel>
              <LabelList>
                {issue.labels.map(label => (
                  <LabelItem key={label.id} color={label.color}>
                    {label.name}
                  </LabelItem>
                ))}
              </LabelList>
            </IssueItem>
          );
        })}
      </IssueList>
    </article>
  );
};

export default App;
