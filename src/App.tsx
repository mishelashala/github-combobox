import React from "react";
import styled from "styled-components";
import { reactRepositoryServiceFactory } from "./services/ReactRepositoryService";
import { Issue } from "./models/Issue";
import * as colors from "./styles/colors";

const reactRepositoryService = reactRepositoryServiceFactory();

export const Title = styled.h1`
  font-family: arial;
`;

export const SearchContainer = styled.div`
  position: relative;
`;

export const SearchInput = styled.input.attrs({ type: "text" })`
  border: 1.5px solid ${colors.GRAY_BORDER};
  box-sizing: border-box;
  display: block;
  font-family: arial;
  padding: 0.5rem;
  width: 100%;

  &:focus {
    border-color: ${colors.RED_OUTLINE};
    outline: none;
  }
`;

export const SearchOptionList = styled.ul`
  list-styled: none;
  margin: 0;
  padding: 0;
`;

export interface ISearchOptionItemProps {
  isHovered: boolean;
}

export const SearchOptionItem = styled.li.attrs({ tabIndex: 0 })<ISearchOptionItemProps>`
  background-color: ${props => (props.isHovered ? "gray" : "transparent")};
  border: 1.5px solid transparent;
  display: block;

  &:focus {
    border: 1.5px solid ${colors.RED_OUTLINE};
    outline: none;
  }
`;

const SelectedOption = styled.div`
  background-color: ${colors.RED_OUTLINE};
  border-radius: 0.75rem;
  color: white;
  display: inline-block;
  font-family: arial;
  margin-bottom: 0.5rem;
  padding: 0.25rem 0.5rem;
`;

export const RemoveSelectedOption = styled.span`
  background-color: white;
  border-radius: 100%;
  color: black;
  display: inline-block;
  font-family: arial;
  height: 1rem;
  line-height: 1rem;
  margin: 0 0 0 0.5rem;
  text-align: center;
  width: 1rem;

  &:hover {
    cursor: pointer;
  }
`;

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
