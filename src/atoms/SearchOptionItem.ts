import styled from "styled-components";
import * as colors from "../styles/colors";

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
