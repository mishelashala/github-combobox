import React from "react";
import { reactRepositoryServiceFactory } from "./services/ReactRepositoryService";
import { Issue } from "./models/Issue";
import { Title } from "./atoms/Title";
import { SearchContainer } from "./atoms/SearchContainer";
import { SelectedOption } from "./atoms/SelectedOption";
import { RemoveSelectedOption } from "./atoms/RemoveSelectedOption";
import { SearchInput } from "./atoms/SearchInput";
import { SearchOptionList } from "./atoms/SearchOptionList";
import { SearchOptionItem } from "./atoms/SearchOptionItem";
import { LabelListContainer } from "./atoms/LabelListContainer";
import { LabelItem } from "./atoms/LabelItem";
import { Text } from "./atoms/Text";
import { Wrapper } from "./atoms/Wrapper";
import { When } from "./components/When";

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

  const filteredIssueList = issueList.filter(
    issue => issue.title.toLowerCase().search(searchValue.toLowerCase()) !== -1
  );

  return (
    <Wrapper>
      <Title>React's Issue List</Title>
      <SearchContainer>
        <When predicate={selectedIssue !== null}>
          <SelectedOption>
            {selectedIssue?.title}
            <RemoveSelectedOption onClick={handleClickRemoveOption}>x</RemoveSelectedOption>
          </SelectedOption>
        </When>
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
        <When predicate={isFocused}>
          <SearchOptionList>
            <When predicate={isLoading}>
              <Text>Loading ...</Text>
            </When>
            <When predicate={!isLoading && !filteredIssueList.length}>
              <Text>No issue matching that search</Text>
            </When>
            {filteredIssueList.map(issue => (
              <SearchOptionItem
                key={issue.id}
                isHovered={hoveredIssue === issue.id}
                onMouseDown={handleMouseDownOption(issue)}
                onMouseOver={handleMouseOverOption(issue.id)}
              >
                {issue.title}
                <LabelListContainer>
                  {issue.labels.map(label => (
                    <LabelItem color={label.color}>{label.name}</LabelItem>
                  ))}
                </LabelListContainer>
              </SearchOptionItem>
            ))}
          </SearchOptionList>
        </When>
      </SearchContainer>
    </Wrapper>
  );
};

export default App;
