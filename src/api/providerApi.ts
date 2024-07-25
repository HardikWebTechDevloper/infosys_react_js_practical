const API_URL = "https://api.apis.guru/v2/";

export const fetchProviders = async () => {
  try {
    const API_URL_ACTION = `${API_URL}providers.json`;

    const response = await fetch(API_URL_ACTION);
    if (!response.ok) {
      throw new Error("Network response is not ok");
    }

    return await response.json();
  } catch (error) {
    return [];
  }
};

export const fetchProviderDetails = async (providerName: string) => {
  try {
    const API_URL_ACTION = `${API_URL}${providerName}.json`;

    const response = await fetch(API_URL_ACTION);
    if (!response.ok) {
      throw new Error("Network response is not ok");
    }

    return await response.json();
  } catch (error) {
    return {};
  }
};
