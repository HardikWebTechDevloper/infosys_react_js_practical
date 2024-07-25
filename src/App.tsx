import React, { useState } from "react";
import AppContainer from "./layout-components/AppContainer";
import AppRouter from "./Routers";

function App() {
  return (
    <>
      <AppContainer>
        <AppRouter />
      </AppContainer>
    </>
  );
}

export default App;
