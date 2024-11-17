import React, { useState } from "react";
import "./styles.css";
import InputComponent from "../common/Input";
import Button from "../common/Button";
import { FcGoogle } from "react-icons/fc";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth, db, provider } from "../../firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const SignupSignin = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cfPassword, setcfPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [loginForm, setLoginForm] = useState(false);
  const [showResetForm, setShowResetForm] = useState(false);
  const navigate = useNavigate();

  // Handle user sign-up
  const signUpHandle = () => {
    if (name && email && password && cfPassword) {
      setLoading(true);
      if (password !== cfPassword) {
        toast.error("Passwords do not match");
        setLoading(false);
        return;
      }
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          console.log("User signed up:", user); // Log the user object
          toast.success("Signed up successfully");
          createDoc(user); // Create user document
          setLoginForm(true);
          setName("");
          setEmail("");
          setPassword("");
          setcfPassword("");
        })
        .catch((error) => toast.error(error.message))
        .finally(() => setLoading(false));
    } else {
      toast.error("All fields are required");
    }
  };

  // Handle user sign-in
  const signInHandle = () => {
    setLoading(true);
    if (email && password) {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          console.log("User logged in:", user); // Log the user object
          toast.success("Logged in successfully");
          setEmail("");
          setPassword("");
          navigate("/dashboard");
        })
        .catch((error) => toast.error(error.message))
        .finally(() => setLoading(false));
    } else {
      toast.error("All fields are required");
      setLoading(false);
    }
  };

  // Google authentication
  const googleAuth = () => {
    setLoading(true);
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        console.log("Google user:", user); // Log the user object
        createDoc(user);
        toast.success("Logged in successfully");
        navigate("/dashboard");
      })
      .catch((error) => toast.error(error.message))
      .finally(() => setLoading(false));
  };

  // Create a user document
  const createDoc = async (user) => {
    if (!user) return;
    const userRef = doc(db, "users", user.uid);
    const userData = await getDoc(userRef);
    if (!userData.exists()) {
      await setDoc(userRef, {
        displayName: user.displayName || name,
        email: user.email,
        photoURL: user.photoURL || "",
        createdAt: new Date(),
      });
    }
  };

  // Handle password reset
  const resetPasswordHandle = () => {
    if (!email) {
      toast.error("Please enter your email to reset password");
      return;
    }
    sendPasswordResetEmail(auth, email)
      .then(() => toast.success("Password reset email sent"))
      .catch((error) => toast.error(error.message));
  };

  return (
    <>
      {showResetForm ? (
        <div className="signup-wrapper">
          <h2 className="title">Reset Password</h2>
          <InputComponent
            type="email"
            state={email}
            setState={setEmail}
            placeholder="Enter your email"
          />
          <Button
            text={loading ? "Loading..." : "Send Reset Email"}
            disabled={loading}
            onClick={resetPasswordHandle}
            purple={true}
          />
          <p className="have-an-account">
            Remembered your details?{" "}
            <span
              onClick={() => setShowResetForm(false)}
              style={{ cursor: "pointer" }}
            >
              Go back
            </span>
          </p>
        </div>
      ) : loginForm ? (
        <div className="signup-wrapper">
          <h2 className="title">Log In</h2>
          <InputComponent
            type="email"
            state={email}
            setState={setEmail}
            placeholder="Enter your email"
          />
          <InputComponent
            type="password"
            state={password}
            setState={setPassword}
            placeholder="Password"
          />
          <Button
            text={loading ? "Loading..." : "Log In"}
            disabled={loading}
            onClick={signInHandle}
            purple={true}
          />
          <p className="or-name">or</p>
          <Button
            text={loading ? "Loading..." : "Log in with Google"}
            onClick={googleAuth}
            purple={false}
            icon={<FcGoogle className="FcGoogle" />}
          />
          <p className="have-an-account">
            Forgot your password?{" "}
            <span
              onClick={() => setShowResetForm(true)}
              style={{ cursor: "pointer" }}
            >
              Reset here
            </span>
          </p>
          <p className="have-an-account">
            Don't have an account?{" "}
            <span
              onClick={() => setLoginForm(false)}
              style={{ cursor: "pointer" }}
            >
              Sign up
            </span>
          </p>
        </div>
      ) : (
        <div className="signup-wrapper">
          <h2 className="title">Sign Up</h2>
          <InputComponent
            type="text"
            state={name}
            setState={setName}
            placeholder="Enter your name"
          />
          <InputComponent
            type="email"
            state={email}
            setState={setEmail}
            placeholder="Enter your email"
          />
          <InputComponent
            type="password"
            state={password}
            setState={setPassword}
            placeholder="Password"
          />
          <InputComponent
            type="password"
            state={cfPassword}
            setState={setcfPassword}
            placeholder="Confirm password"
          />
          <Button
            text={loading ? "Loading..." : "Sign Up"}
            disabled={loading}
            onClick={signUpHandle}
            purple={true}
          />
          <p className="or-name">or</p>
          <Button
            text={loading ? "Loading..." : "Sign up with Google"}
            purple={false}
            icon={<FcGoogle className="FcGoogle" />}
            onClick={googleAuth}
          />
          <p className="have-an-account">
            Already have an account?{" "}
            <span
              onClick={() => setLoginForm(true)}
              style={{ cursor: "pointer" }}
            >
              Log in
            </span>
          </p>
        </div>
      )}
    </>
  );
};

export default SignupSignin;
