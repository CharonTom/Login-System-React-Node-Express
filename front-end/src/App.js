import React from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
  Navigate,
  Outlet,
} from "react-router-dom";

import "./sass/main.scss";
import Login from "./pages/log-in/Login";
import Signup from "./pages/sign-up/Signup";
import Home from "./pages/home/Home";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";

const connected = false;

const Layout = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

const PrivateRoute = ({ children }) => {
  if (!connected) {
    return <Navigate to="/login" />;
  }
  return children;
};

const rooter = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route
        path="/"
        element={
          <PrivateRoute>
            <Layout />
          </PrivateRoute>
        }
      >
        <Route path="/" element={<Home />} />
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
    </>
  )
);

function App() {
  return <RouterProvider router={rooter} />;
}

export default App;
