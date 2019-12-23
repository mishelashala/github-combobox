import React from "react";
import { IssueLabel } from "../models/IssueLabel";
import { LabelListContainer } from "../atoms/LabelListContainer";
import { LabelItem } from "../atoms/LabelItem";

export interface ILabelListProps {
  data: IssueLabel[];
}

export const LabelList: React.FC<ILabelListProps> = ({ data }) => {
  if (!data.length) {
    return <React.Fragment />;
  }

  return (
    <LabelListContainer>
      {data.map(label => (
        <LabelItem key={label.id} color={label.color}>
          {label.name}
        </LabelItem>
      ))}
    </LabelListContainer>
  );
};
