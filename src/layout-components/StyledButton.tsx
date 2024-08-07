import React from "react";
import styled from "styled-components";

interface ButtonProps {
  label: string;
  handleButtonClick: () => void;
}

const Button = styled.button`
  background-color: #00bfff;
  border: none;
  color: white;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
  border-radius: 8px;

  &:hover {
    background-color: #009acd;
  }
`;

const StyledButton: React.FC<ButtonProps> = ({ label, handleButtonClick }) => {
  return <Button onClick={handleButtonClick}>{label}</Button>;
};

export default StyledButton;
