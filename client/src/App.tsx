import { Route, Routes, BrowserRouter } from "react-router-dom";
import Home from "./routes/Home";
import Reviews from "./routes/Reviews";
import reset from "styled-reset";
import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300&display=swap');
${reset}

body {
  font-family: 'Noto Sans KR', sans-serif;}`;

function App() {
  return (
    <>
      <GlobalStyles />
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/reviews/:id" element={<Reviews />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
