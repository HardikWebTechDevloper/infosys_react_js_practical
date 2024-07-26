import React, { useState } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import styled from "styled-components";
import { fetchProviderDetails } from "../api/providerApi";
import { useNavigate } from "react-router-dom";
import DefaultLogo from "../statics/default-logo.png";

interface AccordionProps {
  provider: string;
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
  display: flex;
  gap: 20px;
  align-items: center;
  cursor: pointer;
`;

const Accordion: React.FC<AccordionProps> = ({ provider }) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [providerInfo, setProviderInfo]: any = useState();
  const [logoSrc, setLogoSrc] = useState(
    "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Adobe_Experience_Manager_logo.svg/1024px-Adobe_Experience_Manager_logo.svg.png"
  );

  const toggleAccordion = async () => {
    setIsOpen(!isOpen);
    fetchProviderInfo();
  };

  const fetchProviderInfo = async () => {
    if (!isOpen) {
      let response = await fetchProviderDetails(provider);
      if (response && response?.apis) {
        const apiResponse: any = Object.values(response?.apis)[0];

        setLogoSrc(apiResponse?.info["x-logo"]?.url);
        setProviderInfo(apiResponse);
      }
    }
  };

  const handleRedirect = () => {
    navigate(`/provider-details/${provider}`);
  };

  const handleImageError = () => {
    setLogoSrc(DefaultLogo);
  };

  const handleImageLoad = (
    event: React.SyntheticEvent<HTMLImageElement, Event>
  ) => {
    const img = event.currentTarget;

    if (img.naturalWidth === 0 || img.naturalHeight === 0) {
      handleImageError();
    }
  };

  return (
    <AccordionContainer>
      <AccordionTitle onClick={toggleAccordion} isOpen={isOpen}>
        {provider}
        {isOpen ? <FiChevronUp /> : <FiChevronDown />}
      </AccordionTitle>
      <AccordionContent isOpen={isOpen} onClick={handleRedirect}>
        <img
          src={logoSrc}
          alt={providerInfo?.info?.title}
          width={"30px"}
          height={"30px"}
          onError={handleImageError}
          onLoad={handleImageLoad}
        />
        <p>{providerInfo?.info?.title}</p>
      </AccordionContent>
    </AccordionContainer>
  );
};

export default Accordion;
