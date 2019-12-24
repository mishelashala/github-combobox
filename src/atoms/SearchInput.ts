import styled from "styled-components";
import * as colors from "../styles/colors";

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
