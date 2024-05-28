import { Link, useNavigate } from "react-router-dom";
import app from "./../Firebase/firebaseConfig";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { useContext } from "react";
import CredentialContext from "../Context/CredentialContext";

const Signup = () => {
  const states = useContext(CredentialContext);
  const userCredentials = states.credentials;
  const navigate = useNavigate();

  const signUpHandler = async (e) => {
    e.preventDefault();
    if (
      !userCredentials.name ||
      !userCredentials.email ||
      !userCredentials.password
    ) {
      alert("please fill all fields!");
      return;
    }
    if (userCredentials.password && userCredentials.password.length < 8) {
      alert("password should be min 8 characters");
      return;
    }
    const auth = getAuth(app);
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        userCredentials.email,
        userCredentials.password
      );
      const user = response.user;
      console.log(user);
      alert("user registered successfully");
      localStorage.setItem(userCredentials.email, userCredentials.name);
      navigate("/home");
    } catch (e) {
      console.log(e);
      if (e.code === "auth/email-already-in-use") {
        alert("Email already in use!");
      }
    }
  };
  return (
    <div className=" bg-customColor shadow-customShadow py-5 px-8">
      <form className="flex flex-col gap-3">
        <div className="flex gap-3 items-center">
          <label className="text-xl w-[87px] text-right">Name:</label>
          <input
            type="text"
            required
            onChange={(e) =>
              states.setCredentials({
                ...userCredentials,
                name: e.target.value,
              })
            }
            className="text-lg p-2 rounded-lg outline-none border-2 border-gray-300"
          />
        </div>
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
            placeholder="example@gmail.com"
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
            placeholder="min 8 characters"
            className="text-lg p-2 rounded-lg outline-none border-2 border-gray-300"
          />
        </div>

        <button
          onClick={signUpHandler}
          className="px-3 py-1 bg-blue-500 rounded-lg font-bold text-white hover:scale-105 transition-all"
        >
          Sign up
        </button>

        <p className="text-lg text-center">
          Already have an account?{" "}
          <Link to={"/signin"}>
            {" "}
            <span className="text-blue-600">Sign In</span>{" "}
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;
