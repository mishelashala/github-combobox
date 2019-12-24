import React from "react";
import styled from "styled-components";
import { reactRepositoryServiceFactory } from "./services/ReactRepositoryService";
import { Issue } from "./models/Issue";
import { Title } from "./atoms/Title";
import { SearchContainer } from "./atoms/SearchContainer";
import { SelectedOption } from "./atoms/SelectedOption";
import { RemoveSelectedOption } from "./atoms/RemoveSelectedOption";
import { SearchInput } from "./atoms/SearchInput";
import { SearchOptionList } from "./atoms/SearchOptionList";
import { SearchOptionItem } from "./atoms/SearchOptionItem";

const reactRepositoryService = reactRepositoryServiceFactory();

export enum EventKeySymbols {
  ARROW_DOWN = "ArrowDown",
  ARROW_UP = "ArrowUp",
  ENTER = "Enter"
}

const App: React.FC = () => {
  const [isLoading, updateIsLoading] = React.useState(true);
  const [isFocused, updateIsFocused] = React.useState(false);
  const [issueList, updateIssueList] = React.useState<Issue[]>([]);
  const [searchValue, updateSearchValue] = React.useState("");
  const [hoveredIssue, updateHoveredIssue] = React.useState<number | null>(null);
  const [selectedIssue, updateSelectedIssue] = React.useState<Issue | null>(null);

  React.useEffect(() => {
    reactRepositoryService.getIssueList().then(data => {
      updateIsLoading(false);
      updateIssueList(data);
    });
  }, []);

  const handleBlurSearch = () => {
    updateIsFocused(false);
    updateHoveredIssue(null);
  };

  const handleFocusSearch = () => {
    updateIsFocused(true);
  };

  const handleKeyDownSearch = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === EventKeySymbols.ARROW_DOWN) {
      let issueId;
      if (hoveredIssue === null) {
        issueId = issueList[0].id;
      } else {
        const issueIndex = issueList.findIndex(issue => hoveredIssue === issue.id);
        issueId =
          issueIndex === issueList.length - 1 ? issueList[0].id : issueList[issueIndex + 1].id;
      }

      updateHoveredIssue(issueId);
    } else if (event.key === EventKeySymbols.ARROW_UP) {
      let issueId;
      if (hoveredIssue === null) {
        issueId = issueList[issueList.length - 1].id;
      } else {
        const issueIndex = issueList.findIndex(issue => hoveredIssue === issue.id);
        issueId =
          issueIndex === 0 ? issueList[issueList.length - 1].id : issueList[issueIndex - 1].id;
      }

      updateHoveredIssue(issueId);
    } else if (event.key === EventKeySymbols.ENTER) {
      let newSearchValue = null;
      let newIsFocused = true;

      if (hoveredIssue !== null) {
        let foundIndex = issueList.findIndex(issue => hoveredIssue === issue.id);
        newSearchValue = foundIndex !== -1 ? issueList[foundIndex] : null;
        newIsFocused = false;
      }

      updateSelectedIssue(newSearchValue);
      updateIsFocused(newIsFocused);
    }
  };

  const handleChangeSearchValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value }
    } = event;
    updateSearchValue(value);
    updateIsFocused(true);
  };

  const handleMouseOverOption = (issueId: number) => () => {
    updateHoveredIssue(issueId);
  };

  const handleMouseDownOption = (issue: Issue) => () => {
    updateSelectedIssue(issue);
  };

  const handleClickRemoveOption = () => {
    updateSelectedIssue(null);
  };

  return (
    <article>
      <Title>React's Issue List</Title>
      <SearchContainer>
        {selectedIssue && (
          <SelectedOption>
            {selectedIssue.title}
            <RemoveSelectedOption onClick={handleClickRemoveOption}>x</RemoveSelectedOption>
          </SelectedOption>
        )}
        <SearchInput
          id="issue"
          name="issue"
          placeholder="Search issue"
          type="text"
          value={searchValue}
          onBlur={handleBlurSearch}
          onChange={handleChangeSearchValue}
          onFocus={handleFocusSearch}
          onKeyDown={handleKeyDownSearch}
        />
        {isFocused && (
          <SearchOptionList>
            {issueList.map(issue => {
              return (
                <SearchOptionItem
                  key={issue.id}
                  isHovered={hoveredIssue === issue.id}
                  onMouseDown={handleMouseDownOption(issue)}
                  onMouseOver={handleMouseOverOption(issue.id)}
                >
                  {issue.title}
                </SearchOptionItem>
              );
            })}
          </SearchOptionList>
        )}
      </SearchContainer>
    </article>
  );
};

export default App;
