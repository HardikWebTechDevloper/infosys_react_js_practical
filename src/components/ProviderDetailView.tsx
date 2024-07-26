import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchProviderDetails } from "../api/providerApi";
import styled from "styled-components";
import StyledButton from "../layout-components/StyledButton";
import DefaultLogo from "../statics/default-logo.png";

const Container = styled.div`
  color: #ffffff;
  padding: 5px 15% 5px 15%;
  min-height: 100vh;
  background-color: #1e3d59;
`;

const Logo = styled.img`
  width: 70px;
`;

const SubTitle = styled.p`
  font-size: 1.5rem;
  text-align: left;
`;

const Description = styled.p`
  font-size: 1rem;
  max-width: 600px;
`;

const Link = styled.a`
  font-size: 1.1rem;
  color: #ffffff;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

const Contact = styled.div`
  font-size: 1rem;
  max-width: 600px;
`;

const Header = styled.div`
  display: flex;
  gap: 30px;
  align-items: center;
  justify-content: center;
`;

const ButtonDiv = styled.div`
  text-align: center;
`;

interface ContentProps {
  content: string;
}

const ProviderDetailView: React.FC = () => {
  const { providerName }: any = useParams();
  const navigate = useNavigate();
  const [providerInfo, setProviderInfo]: any = useState();
  const [logoSrc, setLogoSrc] = useState(
    "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Adobe_Experience_Manager_logo.svg/1024px-Adobe_Experience_Manager_logo.svg.png"
  );

  useEffect(() => {
    fetchProviderInfo();
  }, [providerName]);

  const fetchProviderInfo = async () => {
    let response = await fetchProviderDetails(providerName);
    if (response && response?.apis) {
      const apiResponse: any = Object.values(response?.apis)[0];

      setLogoSrc(apiResponse?.info["x-logo"]?.url);
      setProviderInfo(apiResponse);
    }
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

  const isHTML = (str: string): boolean => {
    const doc = new DOMParser().parseFromString(str, "text/html");
    return Array.from(doc.body.childNodes).some((node) => node.nodeType === 1);
  };

  return (
    <Container>
      <Header>
        <Logo
          src={logoSrc}
          alt={providerInfo?.info?.title}
          onError={handleImageError}
          onLoad={handleImageLoad}
        />
        <SubTitle>{providerInfo?.info?.title}</SubTitle>
      </Header>

      {/* Description */}
      <SubTitle>Description</SubTitle>
      <Description>
        {isHTML(providerInfo?.info?.description) ? (
          <div
            dangerouslySetInnerHTML={{
              __html: providerInfo?.info?.description,
            }}
          />
        ) : (
          <span>{providerInfo?.info?.description ?? "N/A"}</span>
        )}
      </Description>

      {/* Swagger */}
      <SubTitle>Swagger</SubTitle>
      <Link href={providerInfo?.swaggerUrl}>{providerInfo?.swaggerUrl}</Link>

      {/* Contact */}
      <SubTitle>Contact</SubTitle>
      <Contact>
        <p>Email: {providerInfo?.info?.contact?.email ?? "N/A"}</p>
        <p>Name: {providerInfo?.info?.contact?.name ?? "N/A"}</p>
        <p>
          URL:{" "}
          <Link href={providerInfo?.info?.contact?.url}>
            {providerInfo?.info?.contact?.url ?? "N/A"}
          </Link>
        </p>
      </Contact>
      <ButtonDiv>
        <StyledButton
          label={"Explore Web APIs"}
          handleButtonClick={() => navigate(`/`)}
        />
      </ButtonDiv>
    </Container>
  );
};

export default ProviderDetailView;
