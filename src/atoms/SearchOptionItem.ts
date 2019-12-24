import styled from "styled-components";
import * as colors from "../styles/colors";

export interface ISearchOptionItemProps {
  isHovered: boolean;
}

export const SearchOptionItem = styled.li.attrs({ tabIndex: 0 })<ISearchOptionItemProps>`
  border: 1.5px solid transparent;
  box-sizing: border-box;
  display: block;
  font-family: arial;
  padding: 0.5rem;

  &:nth-child(2n + 1) {
    background-color: ${colors.LIGHT_GRAY};
  }

  &:hover {
    background-color: ${props => (props.isHovered ? colors.ORANGE_HOVER : "transparent")};
  }

  &:focus {
    border: 1.5px solid ${colors.ORANGE_OUTLINE};
    outline: none;
  }
`;
