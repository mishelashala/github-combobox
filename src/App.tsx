import React from "react";
import { reactRepositoryServiceFactory } from "./services/ReactRepositoryService";
import { Issue } from "./models/Issue";
import { IssueList } from "./atoms/IssueList";
import { IssueItem } from "./atoms/IssueItem";

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
      <IssueList>
        {issueList.map(issue => {
          return <IssueItem key={issue.id}>{issue.title}</IssueItem>;
        })}
      </IssueList>
    </article>
  );
};

export default App;
