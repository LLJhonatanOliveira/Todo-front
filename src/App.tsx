import { BrowserRouter, Routes, Route } from "react-router-dom"
import {
  RecoilRoot,
} from 'recoil';
import MainPage from "./pages/MainPage"
import axios from "axios";

axios.defaults.baseURL = import.meta.env.VITE_API_URL;
function App() {

  return (
    <>
      <RecoilRoot>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<MainPage />}/>
          </Routes>
        </BrowserRouter>
      </RecoilRoot>
    </>
  )
}

export default App
