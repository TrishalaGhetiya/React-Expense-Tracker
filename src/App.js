import React from "react";
import Header from "./components/Layout/Header";
import SignUp from "./components/pages/SignUp";

function App() {
  return (
    <div style={{
      backgroundImage: "url(background-Image.jpg)",
      height: "100vh",
      backgroundSize: "cover",
    }}>
      <Header />
      <SignUp />
    </div>
  );
}

export default App;
