import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { auth, db } from "./firebase";
import { doc, getDoc } from "firebase/firestore";
import "./profile.css";
import { FiMail, FiUser, FiClock } from "react-icons/fi"; // Icons for better UI

function Profile() {
  const [userDetails, setUserDetails] = useState(null);
  const [lastLogin, setLastLogin] = useState("");

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        try {
          const docRef = doc(db, "Users", user.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            setUserDetails(docSnap.data());
            setLastLogin(user.metadata.lastSignInTime);
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className="profile-container">
      {userDetails ? (
        <motion.div
          className="profile-card"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.img
            src={userDetails.photo || "https://via.placeholder.com/150"}
            alt="User Profile"
            className="profile-img"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          />
          <h3>Welcome, {userDetails.firstName} 🙌</h3>
          <p className="profile-item">
            <FiMail /> <span>{userDetails.email}</span>
          </p>
          <p className="profile-item">
            <FiUser />{" "}
            <span>
              Name: {userDetails.firstName} {userDetails.lastName || ""}
            </span>
          </p>
          <p className="profile-item">
            <FiClock />{" "}
            <span>Last Login: {new Date(lastLogin).toLocaleString()}</span>
          </p>
        </motion.div>
      ) : (
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          Loading...
        </motion.p>
      )}
    </div>
  );
}

export default Profile;
