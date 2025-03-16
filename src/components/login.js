import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "./firebase";
import { toast } from "react-toastify";
import SignInwithGoogle from "./signInWIthGoogle";
import { motion } from "framer-motion";
import "./login.css"; // Ensure this CSS file exists

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordStrength, setPasswordStrength] = useState("");

  // Password strength checker function
  const checkPasswordStrength = (password) => {
    let strength = "";
    const regexWeak = /^.{1,7}$/;
    const regexMedium = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    const regexStrong =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (regexStrong.test(password)) {
      strength = "Strong 🔥";
    } else if (regexMedium.test(password)) {
      strength = "Medium ⚠️";
    } else if (regexWeak.test(password)) {
      strength = "Weak ❌";
    } else {
      strength = "Enter a valid password";
    }
    setPasswordStrength(strength);
  };

  // Password Validation Rules
  const validatePassword = (password) => {
    return (
      password.length >= 8 &&
      /[A-Z]/.test(password) &&
      /[a-z]/.test(password) &&
      /\d/.test(password) &&
      /[@$!%*?&]/.test(password)
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validatePassword(password)) {
      toast.error("Password must meet all security requirements!", {
        position: "bottom-center",
      });
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("User logged in Successfully");
      window.location.href = "/profile";
      toast.success("User logged in Successfully", {
        position: "top-center",
      });
    } catch (error) {
      console.log(error.message);
      toast.error(error.message, {
        position: "bottom-center",
      });
    }
  };

  return (
    <motion.div
      className="login-container"
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <motion.form
        onSubmit={handleSubmit}
        className="login-form"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h3>Login</h3>

        <motion.div
          className="mb-3 input-field"
          whileFocus={{ scale: 1.1 }}
          transition={{ duration: 0.3 }}
        >
          <label>Email address</label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </motion.div>

        <motion.div
          className="mb-3 input-field"
          whileFocus={{ scale: 1.1 }}
          transition={{ duration: 0.3 }}
        >
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              checkPasswordStrength(e.target.value);
            }}
          />
          <small className="password-strength">
            Strength: {passwordStrength}
          </small>
          <ul className="password-rules">
            <li>✅ 8 character|At least 1 Uppercase|At least 1 Lowercase</li>
            <li>
              ✅ At least 1 special character |At least 1 numbers(@$!%*?&)
            </li>
          </ul>
        </motion.div>

        <motion.div className="d-grid">
          <motion.button
            type="submit"
            className="btn btn-primary login-btn"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            Submit
          </motion.button>
        </motion.div>

        <motion.p
          className="forgot-password text-right"
          whileHover={{ scale: 1.05 }}
        >
          New user? <a href="/register">Register Here</a>
        </motion.p>

        <SignInwithGoogle />
      </motion.form>
    </motion.div>
  );
}

export default Login;
