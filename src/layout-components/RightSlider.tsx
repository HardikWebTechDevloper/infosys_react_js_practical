import React, { useState } from "react";
import styled from "styled-components";
import Accordion from "./Accordian";
import { FiX } from "react-icons/fi";

interface RightSliderProps {
  isOpen: boolean;
  providers: string[];
  onCloseSlider: () => void;
}

interface SliderContainerProps {
  isOpen: boolean;
}

const Backdrop = styled.div<SliderContainerProps>`
  display: ${({ isOpen }) => (isOpen ? "block" : "none")};
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 500;
  opacity: ${({ isOpen }) => (isOpen ? 1 : 0)};
  transition: opacity 0.3s ease-in-out;
`;

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
  z-index: 1000;
  transition: transform 0.3s ease-in-out;
  transform: ${({ isOpen }) => (isOpen ? "translateX(0)" : "translateX(100%)")};
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

const CloseButtonDiv = styled.div`
  width: 100%;
  text-align: right;
`;

const CloseButton = styled.button`
  background-color: #a10d32;
  border: none;
  color: white;
  padding: 5px 5px 1px 5px;
  text-align: center;
  border-radius: 50%;
  cursor: pointer;

  &:hover {
    background-color: #e81146;
  }
`;

const RightSlider: React.FC<RightSliderProps> = ({
  isOpen,
  providers,
  onCloseSlider,
}) => {
  return (
    <>
      <Backdrop isOpen={isOpen} />

      <SliderContainer isOpen={isOpen}>
        <CloseButtonDiv>
          <CloseButton onClick={onCloseSlider}>
            <FiX />
          </CloseButton>
        </CloseButtonDiv>
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
    </>
  );
};

export default RightSlider;
