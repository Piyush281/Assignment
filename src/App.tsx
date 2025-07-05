import { BrowserRouter, Routes, Route } from "react-router"

import RepositoryList from "./pages/repositoy_list/RepositoryList"

import "./styles/index.css"
import Home from "./pages/home/home"

const App = () => {


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/repositories" element={<RepositoryList />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
