import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { auth, db } from "./firebase";
import { setDoc, doc } from "firebase/firestore";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "./register.css"; // Ensure this file exists

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [passwordStrength, setPasswordStrength] = useState("");
  const navigate = useNavigate(); // Initialize navigate

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

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!validatePassword(password)) {
      toast.error("Password must meet security requirements!", {
        position: "bottom-center",
      });
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      const user = auth.currentUser;
      console.log(user);
      if (user) {
        await setDoc(doc(db, "Users", user.uid), {
          email: user.email,
          firstName: fname,
          lastName: lname,
          photo: "",
        });
      }
      console.log("User Registered Successfully!!");
      toast.success("User Registered Successfully!!", {
        position: "top-center",
      });

      // Redirect to profile page after registration
      navigate("/profile");
    } catch (error) {
      console.log(error.message);
      toast.error(error.message, {
        position: "bottom-center",
      });
    }
  };

  return (
    <motion.div
      className="register-container"
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <motion.form
        onSubmit={handleRegister}
        className="register-form"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h3>Sign Up</h3>

        <motion.div
          className="mb-3 input-field"
          whileFocus={{ scale: 1.1 }}
          transition={{ duration: 0.3 }}
        >
          <label>First name</label>
          <input
            type="text"
            className="form-control"
            placeholder="First name"
            onChange={(e) => setFname(e.target.value)}
            required
          />
        </motion.div>

        <motion.div
          className="mb-3 input-field"
          whileFocus={{ scale: 1.1 }}
          transition={{ duration: 0.3 }}
        >
          <label>Last name</label>
          <input
            type="text"
            className="form-control"
            placeholder="Last name"
            onChange={(e) => setLname(e.target.value)}
          />
        </motion.div>

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
            onChange={(e) => setEmail(e.target.value)}
            required
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
            onChange={(e) => {
              setPassword(e.target.value);
              checkPasswordStrength(e.target.value);
            }}
            required
          />
          <small className="password-strength">
            Strength: {passwordStrength}
          </small>
        </motion.div>

        <motion.div className="d-grid">
          <motion.button
            type="submit"
            className="btn btn-primary register-btn"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            Sign Up
          </motion.button>
        </motion.div>

        <motion.p
          className="forgot-password text-right"
          whileHover={{ scale: 1.05 }}
        >
          Already registered? <a href="/login">Login Here</a>
        </motion.p>
      </motion.form>
    </motion.div>
  );
}

export default Register;
