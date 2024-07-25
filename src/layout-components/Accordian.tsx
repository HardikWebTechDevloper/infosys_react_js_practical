import React, { useState } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import styled from "styled-components";

interface AccordionProps {
  title: string;
  content: string;
}

const AccordionContainer = styled.div`
  width: 100%;
  margin: 10px 0;
`;

const AccordionTitle = styled.div<{ isOpen: boolean }>`
  color: white;
  cursor: pointer;
  padding: 10px;
  text-align: left;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 8px 8px 0 0;
  background-color: ${(props) => (props.isOpen ? "#0e1d2b" : "#1e3d59")};
`;

const AccordionContent = styled.div<{ isOpen: boolean }>`
  background-color: #1e3d59;
  color: white;
  max-height: ${(props) => (props.isOpen ? "100px" : "0")};
  overflow: hidden;
  transition: max-height 0.2s ease;
  padding: ${(props) => (props.isOpen ? "10px" : "0 10px")};
  border-radius: 0 0 8px 8px;
  background-color: ${(props) => (props.isOpen ? "#0e1d2b" : "#1e3d59")};
`;

const Accordion: React.FC<AccordionProps> = ({ title, content }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <AccordionContainer>
      <AccordionTitle onClick={toggleAccordion} isOpen={isOpen}>
        {title}
        {isOpen ? <FiChevronUp /> : <FiChevronDown />}
      </AccordionTitle>
      <AccordionContent isOpen={isOpen}>{content}</AccordionContent>
    </AccordionContainer>
  );
};

export default Accordion;
