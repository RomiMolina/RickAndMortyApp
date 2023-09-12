import {BrowserRouter , Route , Routes } from "react-router-dom";
import Home from "./components/Home";
import LandingPage from "./components/LandingPage";

function App() {
  return (
    <BrowserRouter>
      <div className="app"> 
      <Routes>
        <Route exact path="/" element={<LandingPage/>} ></Route>
        <Route path="/home" element={<Home/>} ></Route>
      </Routes >
      </div>
    </BrowserRouter>
  )
}

export default App;
