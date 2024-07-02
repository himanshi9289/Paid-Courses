import {BrowserRouter as Router,Routes,Route } from "react-router-dom";
import Home from "./components/Home/Home";
import Header from './components/Layout/Header'
import Footer from './components/Layout/Footer'
import Login from './components/Auth/Login'
import Dashboard from "./components/Admin/Dashboard";
import CreateCourse from "./components/Admin/CreateCourse";
import AdminCourses from "./components/Admin/AdminCourses";
import Users from "./components/Admin/Users";

function App() {

  return (
    <Router>
      <Header/>
      <div className="min-h-screen -mb-5">
      <Routes>
        <Route index element={<Home/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/admin/dashboard" element={<Dashboard/>}/>
        <Route path="/admin/createcourse" element={<CreateCourse/>}/>
        <Route path="/admin/courses" element={<AdminCourses/>}/>
        <Route path="/admin/users" element={<Users/>}/>
      </Routes>
      </div>
      <Footer/>
    </Router>
  )
}

export default App
