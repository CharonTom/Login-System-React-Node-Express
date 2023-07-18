import React from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Login from "./pages/log-in/Login";
import Signin from "./pages/sign-up/Signup";
import "./style/main.scss";

const rooter = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signin />} />
    </>
  )
);

function App() {
  return <RouterProvider router={rooter} />;
}

export default App;
