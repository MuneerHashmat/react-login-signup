import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "../Pages/Signup";
import Signin from "../Pages/Signin";
import CredentialState from "../Context/CredentialState";
import Home from "../Pages/Home";

const Router = () => {
  return (
    <>
      <CredentialState>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Signup />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/home" element={<Home />} />
          </Routes>
        </BrowserRouter>
      </CredentialState>
    </>
  );
};

export default Router;
