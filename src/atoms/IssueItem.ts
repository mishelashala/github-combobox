import styled from "styled-components";

export const IssueItem = styled.li.attrs({ tabIndex: 0 })`
  border: 1.5px solid #c1c1c1;
  border-radius: 0.2rem;
  box-sizing: border-box;
  display: block;
  margin-bottom: 1rem;
  padding: 0.75rem 0.5rem;

  &:focus {
    border: 1.5px solid #ce4403;
    outline: none;
  }

  &:last-child {
    margin-bottom: 0;
  }
`;
