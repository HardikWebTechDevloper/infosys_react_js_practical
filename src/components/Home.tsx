import React, { useEffect, useState } from "react";
import StyledButton from "../layout-components/StyledButton";
import RightSlider from "../layout-components/RightSlider";
import { fetchProviders } from "../api/providerApi";
import AppContainer from "../layout-components/AppContainer";

const Home: React.FC = () => {
  const [isOpenSlider, setIsOpenSlider] = useState(false);
  const [providers, setProviders] = useState([]);

  const handleButtonClick = () => setIsOpenSlider(!isOpenSlider);

  useEffect(() => {
    handleFetchProviders();
  }, []);

  const handleFetchProviders = async () => {
    const response = await fetchProviders();
    if (response && response.data && response.data.length > 0) {
      setProviders(response.data);
    }
  };

  return (
    <>
      <AppContainer>
        <StyledButton
          label={"Explore Web APIs"}
          handleButtonClick={handleButtonClick}
        />
        <RightSlider isOpen={isOpenSlider} providers={providers} />
      </AppContainer>
    </>
  );
};

export default Home;
