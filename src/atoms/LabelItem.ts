import styled from "styled-components";

export interface ILabelItemProps {
  color: string;
}

export const LabelItem = styled.li<ILabelItemProps>`
  background-color: ${props => `#${props.color}`};
  border-radius: 0.5rem;
  display: inline-block;
  font-family: arial;
  font-size: 0.8rem;
  margin-right: 0.5rem;
  padding: 0.5rem;

  &:last-child {
    margin-right: 0;
  }
`;
