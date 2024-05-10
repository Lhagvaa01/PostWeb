//App.js

import { Routes, Route } from "react-router-dom";
import Basic from "./pages/post";
import StickyNavbar from "./pages/header";
import Login from "./pages/login";
import Register from "./pages/registr";
import Profile from "./pages/profile";



import { UserProvider } from './context/UserContext';
const App = () => {
  return (
    <UserProvider>
      <StickyNavbar/>
      <Routes>
          {/* <Route path="/" element={<StickyNavbar />} /> */}
          <Route path="/" element={<Basic />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/Profile" element={<Profile />} />
      </Routes>
    </UserProvider>
  );
};

export default App;
