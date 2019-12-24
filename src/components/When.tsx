import * as React from "react";

export interface IWhenProps {
  predicate?: boolean;
}

export const When: React.FC<IWhenProps> = ({ predicate, children }) => {
  if (!predicate) {
    return <React.Fragment />;
  }

  return <React.Fragment>{children}</React.Fragment>;
};
