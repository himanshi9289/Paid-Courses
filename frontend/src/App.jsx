import {BrowserRouter as Router,Routes,Route } from "react-router-dom";
import Home from "./components/Home/Home";

function App() {

  return (
    <Router>
      <Routes>
        <Route index element={<Home/>}/>
        <Route path="/login" element={<Home/>}/>
      </Routes>
    </Router>
  )
}

export default App
