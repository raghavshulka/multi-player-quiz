import { BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router-dom";
import Create from "./components/Create";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Profile from "./components/Profile";
import Createquiz from "./components/Cratequiz";
import Enter from "./components/Enter";
import JoinRoom from './components/Joinroom'

const ProtectedLayout = () => {
  const isAuthenticated = !!localStorage.getItem("auth");
  
  if (!isAuthenticated) {
    return <Navigate to="/enter" replace />;
  }
  
  return <Outlet />;
};

const App = () => {
  const isAuthenticated = !!localStorage.getItem("auth");

  return (
    <div className="">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route 
            path="/" 
            element={<Hero />} 
          />

          {/* Login/Enter route */}
          <Route 
            path="/enter" 
            element={isAuthenticated ? <Navigate to="/profile" replace /> : <Enter />} 
          />
          
          {/* Protected routes */}
          <Route element={<ProtectedLayout />}>
            <Route path="/quiz" element={<Createquiz />} />
            <Route path="/create" element={<Create />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/join" element={<JoinRoom />} />

          </Route>
          
          {/* Catch-all route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
