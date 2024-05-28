import { Link } from "react-router-dom";
import { useContext } from "react";
import CredentialContext from "../Context/CredentialContext";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import app from "../Firebase/firebaseConfig";
import { useNavigate } from "react-router-dom";

const Signin = () => {
  const states = useContext(CredentialContext);
  const userCredentials = states.credentials;
  const navigate = useNavigate();
  const signinHandler = async (e) => {
    e.preventDefault();
    try {
      const auth = getAuth(app);
      const response = await signInWithEmailAndPassword(
        auth,
        userCredentials.email,
        userCredentials.password
      );
      console.log(response.user);
      navigate("/home");
    } catch (e) {
      console.log(e);
      if (
        e.code === "auth/invalid-credential" ||
        e.code === "auth/invalid-email" ||
        e.code === "auth/missing-email" ||
        e.code === "auth/missing-password"
      ) {
        // Wrong email or password case
        alert("Invalid email or password. Please try again.");
      }
    }
  };
  return (
    <div className=" bg-customColor shadow-customShadow py-5 px-8">
      <form className="flex flex-col gap-3">
        <div className="flex gap-3 items-center">
          <label className="text-xl w-[87px] text-right">Email:</label>
          <input
            type="email"
            required
            onChange={(e) =>
              states.setCredentials({
                ...userCredentials,
                email: e.target.value,
              })
            }
            className="text-lg p-2 rounded-lg outline-none border-2 border-gray-300"
          />
        </div>

        <div className="flex gap-3 items-center">
          <label className="text-xl w-[87px] text-right">Password:</label>
          <input
            type="password"
            required
            onChange={(e) =>
              states.setCredentials({
                ...userCredentials,
                password: e.target.value,
              })
            }
            className="text-lg p-2 rounded-lg outline-none border-2 border-gray-300"
          />
        </div>

        <button
          onClick={signinHandler}
          className="px-3 py-1 bg-blue-500 rounded-lg font-bold text-white hover:scale-105 transition-all"
        >
          Sign In
        </button>

        <p className="text-lg text-center">
          Don`t have an account?{" "}
          <Link to={"/"}>
            {" "}
            <span className="text-blue-600">Sign Up</span>{" "}
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Signin;
