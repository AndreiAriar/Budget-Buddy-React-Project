import React, { useState, useEffect } from "react"; // Added useEffect import
import "./styles.css";
import { FaUserCircle, FaCog } from "react-icons/fa";
import { auth } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { signOut } from "firebase/auth";
import ColorSwitcher from "../ColorSwitcher"; // Assuming ColorSwitcher is correctly implemented

const UserProfileFeature = () => {
  const [user, loading] = useAuthState(auth); // 'loading' is used here for loading state handling
  const navigate = useNavigate();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [profileInfo, setProfileInfo] = useState({
    displayName: "",
    email: "",
  });

  useEffect(() => {
    if (user) {
      setProfileInfo({
        displayName: user.displayName || "User Name",
        email: user.email || "user@example.com",
      });
    }
  }, [user]); // Effect only runs when 'user' changes

  const logout = () => {
    signOut(auth)
      .then(() => {
        toast.success("Logged out successfully");
        navigate("/");
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  const handleProfileUpdate = (e) => {
    e.preventDefault();
    toast.success("Profile updated successfully!");
    setIsProfileOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  // The handleColorChange function is now properly defined and passed to ColorSwitcher
  const handleColorChange = (colors) => {
    Object.entries(colors).forEach(([variable, color]) => {
      document.documentElement.style.setProperty(variable, color);
    });
    toast.success("Theme color updated!");
  };

  return (
    <div className="profile-feature">
      <div className="user-profile">
        {user?.photoURL ? (
          <img src={user.photoURL} alt="user-profile" className="img" />
        ) : (
          <FaUserCircle className="no-photo" />
        )}
        <FaCog
          className="settings-icon"
          onClick={() => setIsProfileOpen(!isProfileOpen)}
        />
      </div>
      {user && (
        <div className="buttons">
          <h4 onClick={() => setIsProfileOpen(true)}>
            {user.displayName || user.email}
          </h4>
          <p onClick={logout} className="logout-btn">
            Logout
          </p>
        </div>
      )}
      {isProfileOpen && (
        <div className="profile-modal">
          <h3>Edit Profile</h3>
          <form onSubmit={handleProfileUpdate} className="profile-form">
            <label>
              Name:
              <input
                type="text"
                name="displayName"
                value={profileInfo.displayName}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Email:
              <input
                type="email"
                name="email"
                value={profileInfo.email}
                disabled
              />
            </label>
            <button type="submit" className="btn">
              Save Changes
            </button>
            <button
              type="button"
              className="btn cancel-btn"
              onClick={() => setIsProfileOpen(false)}
            >
              Cancel
            </button>
          </form>
        </div>
      )}
      {/* Make sure the handleColorChange function is passed to ColorSwitcher */}
      <ColorSwitcher handleColorChange={handleColorChange} />
    </div>
  );
};

export default UserProfileFeature;
