import React from "react";
import styled from "styled-components";

const Card = ({ children, ...props }) => {
  return <CardContent {...props}>{children}</CardContent>;
};

export default Card;

const CardContent = styled.div`
  border-radius: 12px;
  width: 200px;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: ${({ theme }) => theme.spacing.md};
  border: 1px solid #dedede;
  margin: ${({ theme }) => theme.spacing.md};
  transition: box-shadow 0.1s ease-out;
  box-shadow: 0 7px 16px 0 rgba(0, 0, 0, 0.2), 0 1px 3px 0 rgba(0, 0, 0, 0.1);

  &:hover {
    box-shadow: 0 7px 16px 0 rgb(0 0 0 / 0.6), 0 1px 3px 0 rgba(0, 0, 0, 0.1);
  }
`;
