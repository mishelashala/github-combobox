import React from "react";
import styled from "styled-components";
import { reactRepositoryServiceFactory } from "./services/ReactRepositoryService";
import { Issue } from "./models/Issue";
import { IssueList } from "./components/IssueList";

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
      <IssueList data={issueList}></IssueList>
    </article>
  );
};

export default App;
