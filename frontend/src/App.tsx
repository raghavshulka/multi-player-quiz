import React, { lazy, Suspense, useMemo } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
import Profile from "./components/Profile";
//authentication
const useAuth = () => {
  const auth = useMemo(() => !!localStorage.getItem("auth"), []);
  return { isAuthenticated: auth };
};
import Store from "./Context/CreateStore";

const Header = lazy(() => import("./components/Header"));
const Hero = lazy(() => import("./components/Hero"));
const Enter = lazy(() => import("./components/Enter"));
// const Profile = lazy(() => import("./components/Profile"));
const Create = lazy(() => import("./components/Create"));
const Createquiz = lazy(() => import("./components/Quizpage"));
const JoinRoom = lazy(() => import("./components/Joinroom"));
const Quizpage = lazy(() => import("./components/Quizpage"));
const Startquiz = lazy(() => import("./components/Startquiz"));




const LoadingFallback = () => <div>Loading...</div>;

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <>{children}</> : <Navigate to="/enter" replace />;
};

const App: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Store>
    <BrowserRouter>
      <Suspense fallback={<LoadingFallback />}>
        <Header />
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route
            path="/enter"
            element={
              isAuthenticated ? <Navigate to="/profile" replace /> : <Enter />
            }
          />
          <Route
            element={
              <ProtectedRoute>
                <Outlet />
              </ProtectedRoute>
            }
          >
            <Route path="/quiz" element={<Createquiz />} />
            <Route path="/create" element={<Create />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/join" element={<JoinRoom />} />
            <Route path="/question" element={<Quizpage />} />
            <Route path="/start" element={<Startquiz />} />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
    </Store>
  );
};

export default React.memo(App);
