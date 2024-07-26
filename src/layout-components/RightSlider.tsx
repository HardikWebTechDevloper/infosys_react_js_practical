import React, { useState } from "react";
import styled from "styled-components";
import Accordion from "./Accordian";

interface RightSliderProps {
  isOpen: boolean;
  providers: string[];
}

interface SliderContainerProps {
  isOpen: boolean;
}

const SliderContainer = styled.div<SliderContainerProps>`
  position: fixed;
  top: 0;
  right: ${(props) => (props.isOpen ? "0px" : "-700px")};
  width: 30%;
  height: 100%;
  background-color: #1e3d59;
  color: white;
  transition: right 0.3s ease;
  padding: 20px;
  box-shadow: ${(props) =>
    props.isOpen ? "-2px 0 3px rgba(0,0,0,0.5)" : "none"};
  border-left: ${(props) => (props.isOpen ? "5px solid #00bfff" : "none")};
`;

const Title = styled.p`
  text-align: center;
  font-size: 24px;
`;

const AccordionSection = styled.div`
  height: 85%;
  width: 100%;
  overflow-x: hidden;
  overflow-y: scroll;
  margin-bottom: 100px;

  &::-webkit-scrollbar {
    display: none;
  }

  -ms-overflow-style: none; // IE and Edge
  scrollbar-width: none; // Firefox
`;

const RightSlider: React.FC<RightSliderProps> = ({ isOpen, providers }) => {
  return (
    <SliderContainer isOpen={isOpen}>
      <Title>Select Provider</Title>
      <AccordionSection>
        {providers && providers.length > 0 ? (
          providers.map((provider, index) => (
            <Accordion key={index} provider={provider} />
          ))
        ) : (
          <>
            <Title>No Data Found</Title>
          </>
        )}
      </AccordionSection>
    </SliderContainer>
  );
};

export default RightSlider;
