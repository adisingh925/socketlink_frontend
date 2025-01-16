"use client";

import React, { useEffect, useState } from "react";
import { auth } from "../components/firebase"; // Adjust the path as necessary
import { sendPasswordResetEmail } from 'firebase/auth';
import Toast from "../components/toast";
import { useRouter } from "next/navigation";
import NavigationBar from "../components/navbar";

function ForgotPassword() {
  const router = useRouter();
  const [email, setEmail] = useState({ email: "" });
  const [snackbarState, setSnackbarState] = useState(false);
  const [snackbarText, setSnackbarText] = useState("");
  const [severity, setSeverity] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        router.push("/");
      } else {
        setLoading(false);
      }
    });
  }, [router]);

  useEffect(() => {
    document.title = "Forget Password | Socketlink";
  });

  const onChange = (event) => {
    setEmail({ ...email, [event.target.name]: event.target.value });
  };

  const handleResetPasswordClicked = async (e) => {
    e.preventDefault();
    sendPasswordResetEmail(auth, email.email).then(() => {
      setSeverity("success");
      setSnackbarText("Password reset link sent to your email!");
      setSnackbarState(true);
    }).catch((error) => {
      setSeverity("error");
      setSnackbarText(error.message);
      setSnackbarState(true);
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[100dvh] text-white dark:bg-gray-900">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-12 h-12 border-4 border-t-transparent border-blue-500 rounded-full animate-spin" />
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col h-[100dvh] dark:bg-gray-900">
        <NavigationBar />
        <div className="flex flex-col items-center justify-center flex-grow px-6 py-8 lg:py-0">
          <div className="p-6 bg-white rounded-2xl shadow md:mt-0 sm:max-w-md dark:bg-gray-800 sm:p-8 w-full max-w-md border-2 border-white/20">
            <h1 className="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Forgot your password?
            </h1>
            <p className="font-light text-gray-500 dark:text-gray-400">
              Don&apos;t fret! Just type in your email and we will send you a link to
              reset your password!
            </p>
            <form
              className="mt-4 space-y-4 lg:mt-5 md:space-y-5"
              onSubmit={handleResetPasswordClicked}
              action="#"
            >
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  onChange={onChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@company.com"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full text-white bg-primary-600 hover:bg-primary-700 active:scale-95 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 transition-transform duration-150"
              >
                Send Password Reset Link
              </button>
            </form>
          </div>
        </div>
      </div>

      <Toast message={snackbarText} severity={severity} setSnackbarState={setSnackbarState} snackbarState={snackbarState} />
    </>
  );
}

export default ForgotPassword;
