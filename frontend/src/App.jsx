import {BrowserRouter as Router,Routes,Route } from "react-router-dom";
import Home from "./components/Home/Home";
import Header from './components/Layout/Header'
import Footer from './components/Layout/Footer'
import Login from './components/Auth/Login'

function App() {

  return (
    <Router>
      <Header/>
      <Routes>
        <Route index element={<Home/>}/>
        <Route path="/login" element={<Login/>}/>
      </Routes>
      <Footer/>
    </Router>
  )
}

export default App
