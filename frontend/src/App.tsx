import Create from "./components/Create";
import Header from "./components/Header";
import Hero from "./components/Hero";
import { BrowserRouter, Routes, Route } from "react-router-dom"; 
import Profile from "./components/Profile";

const App = () => {
  return (
    <div className="">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/create" element={<Create />} />
          <Route path="/profile" element={<Profile />} />


        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
