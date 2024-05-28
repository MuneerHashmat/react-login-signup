import CredentialContext from "../Context/CredentialContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const states = useContext(CredentialContext);
  const userCredentials = states.credentials;
  const navigate = useNavigate();

  const logoutHandler = () => {
    states.setCredentials({ name: "", email: "", password: "" });
    navigate("/signin");
  };
  return (
    <div className="flex flex-col gap-3 items-center bg-customColor shadow-customShadow py-5 px-8">
      <h1 className="text-2xl font-bold ">
        Congratulations{" "}
        <span className="text-red-600">
          {localStorage.getItem(userCredentials.email)}
        </span>{" "}
        you have successfully logged in!
      </h1>
      <button
        onClick={logoutHandler}
        className="px-3 py-1 bg-blue-500 rounded-lg font-bold text-white text-lg hover:scale-105 transition-all"
      >
        Sign out
      </button>
    </div>
  );
};

export default Home;
